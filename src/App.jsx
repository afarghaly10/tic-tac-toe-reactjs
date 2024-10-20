import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from '../winning-combinations';
import GameOver from './components/GameOver';

const PLAYERS = {
	X: 'player 1',
	O: 'player 2',
};
const INITIAL_BOARD_GAME = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
	let currentPlayer = 'X';
	if (gameTurns.length) currentPlayer = gameTurns[0].player === 'X' ? 'O' : 'X';
	return currentPlayer;
};

const winCalculation = (gameBoard, playerName) => {
	let winner = null;

	WINNING_COMBINATIONS.forEach((combination) => {
		const a = gameBoard[combination[0].row][combination[0].column];
		const b = gameBoard[combination[1].row][combination[1].column];
		const c = gameBoard[combination[2].row][combination[2].column];

		if (a && a === b && a === c) {
			winner = playerName[a];
		}
	});
	return winner;
};

const deriveGameBoard = (gameTurns) => {
	const gameBoard = [...INITIAL_BOARD_GAME.map((row) => [...row])];

	gameTurns.forEach((turn) => {
		const { rowIndex, cellIndex } = turn.square;
		gameBoard[rowIndex][cellIndex] = turn.player;
	});

	return gameBoard;
};

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [playerName, setPlayerName] = useState(PLAYERS);
	const activePlayer = deriveActivePlayer(gameTurns);
	const gameBoard = deriveGameBoard(gameTurns);
	const winner = winCalculation(gameBoard, playerName);
	const isDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, cellIndex) => {
		setGameTurns((prevGameTurns) => {
			let currentPlayer = deriveActivePlayer(prevGameTurns);
			const nextGameTurns = [
				{
					square: {
						rowIndex,
						cellIndex,
					},
					player: currentPlayer,
				},
				...prevGameTurns,
			];
			return nextGameTurns;
		});
	};

	const handleRestartGame = () => setGameTurns([]);

	const handlePlayerNameChange = (symbol, name) => {
		setPlayerName((prevPlayerName) => ({
			...prevPlayerName,
			[symbol]: name,
		}));
	};

	return (
		<main>
			<div id="game-container">
				<ol id="players" className="highlight-player">
					<Player
						initialName={PLAYERS.X}
						symbol="X"
						isActive={activePlayer === 'X'}
						onNameChange={handlePlayerNameChange}
					/>
					<Player
						initialName={PLAYERS.O}
						symbol="O"
						isActive={activePlayer === 'O'}
						onNameChange={handlePlayerNameChange}
					/>
				</ol>
				{(winner || isDraw) && (
					<GameOver winner={winner} onRestart={handleRestartGame} />
				)}
				<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
			</div>
			<Log gameTurn={gameTurns} />
		</main>
	);
}

export default App;
