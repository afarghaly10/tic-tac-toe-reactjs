export default function GameOver({ winner, onRestart }) {
	return (
		<div id="game-over">
			<h2>Game Over</h2>
			<p>{winner ? `${winner.toUpperCase()} has won!` : "It's a draw!"}</p>
			<p>
				<button onClick={onRestart}>Play Again</button>
			</p>
		</div>
	);
}
