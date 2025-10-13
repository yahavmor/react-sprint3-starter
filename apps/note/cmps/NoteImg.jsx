export function NoteImg({ note }) {
	return (
		<div style={note.style}>
			<h2>{note.info.title}</h2>
			<img
				style={{ height: 150, width: 150 }}
				src={note.info.url}
				title={note.info.title}
			/>
		</div>
	);
}
