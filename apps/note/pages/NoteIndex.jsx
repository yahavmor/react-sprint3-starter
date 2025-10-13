import { NotePreview } from '../cmps/NotePreview.jsx';
import { noteService } from '../services/note.service.js';

const { useState, useEffect } = React;

export function NoteIndex() {
	const [notes, setNotes] = useState(null);

	loadNotes();

	function loadNotes() {
		noteService
			.query()
			.then(setNotes)
			.catch((err) => console.log('err:', err));
	}

	// console.log('render')
	if (!notes) return <div>Loading...</div>;

	return (
		<section className="notes-index">
			{notes.map((note) => (
				<NotePreview key={note.id} note={note} />
			))}
		</section>
	);
}
