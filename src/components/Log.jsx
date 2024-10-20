export default function Log({ gameTurn }) {
	return (
		<ol id="log">
			{gameTurn.map((turn, index) => {
				const { player, square } = turn;
				const { rowIndex, cellIndex } = square;
				return (
					<li key={`${rowIndex}${cellIndex}`}>
						{`${player} placed on row ${rowIndex}, cell ${cellIndex}`}
					</li>
				);
			})}
		</ol>
	);
}
