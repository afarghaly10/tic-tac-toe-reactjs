import { useState } from 'react';

export default function Player({
	initialName,
	symbol,
	isActive,
	onNameChange,
}) {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const buttonName = isEditing ? 'Save' : 'Edit';

	const handleEditClick = () => {
		setIsEditing((editing) => !editing);
		if (isEditing) onNameChange(symbol, playerName);
	};

	const handleChange = (event) => {
		setPlayerName(event.target.value);
	};

	return (
		<li className={isActive ? 'active' : undefined}>
			<span className="player">
				{!isEditing ? (
					<span className="player-name">{playerName}</span>
				) : (
					<input
						type="text"
						required
						placeholder={playerName}
						onChange={handleChange}
					/>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleEditClick}>{buttonName}</button>
		</li>
	);
}
