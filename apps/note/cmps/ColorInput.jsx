const { useState } = React;

export function ColorInput({ note, onSetNoteStyle, onClose }) {
	const colors = [
		'#faafa9',
		'#f39f76',
		'#fff8b8',
		'#e2f7d3',
		'#b4ddd3',
		'#d4e5ed',
		'#aeccdc',
		'#d3bfdb',
		'#f6e2dd',
		'#e9e3d5',
		'#efeff1',
		'#ffffff',
	];
	const [selectedColor, setSelectedColor] = useState(
		(note && note.style && note.style.backgroundColor) || ''
	);

	function handleColorChange(color) {
		const updatedNote = {
			...note,
			style: {
				...note.style,
				backgroundColor: color,
			},
		};
		onSetNoteStyle(updatedNote);
		if (onClose) onClose();
	}

	return (
		<section>
			<div className="color-pallete">
				{colors.map((color) => (
					<div
						className={`color-input ${
							selectedColor === color ? 'selected' : ''
						}`}
						style={{ backgroundColor: color }}
						key={color}
						onClick={() => handleColorChange(color)}
					></div>
				))}
			</div>
		</section>
	);
}
