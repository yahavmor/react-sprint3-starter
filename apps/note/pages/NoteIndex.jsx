import { NotePreview } from '../cmps/NotePreview.jsx';
import { noteService } from '../services/note.service.js';
import { AddNote } from '../cmps/AddNote.jsx';

const { useState, useEffect } = React;

export function NoteIndex() {
	const [notes, setNotes] = useState(null);

	useEffect(() => {
		loadNotes();
	}, []);

	function loadNotes() {
		noteService
			.query()
			.then(setNotes)
			.catch((err) => console.log('err:', err));
	}

	function onAddNote(note) {
		setNotes([...notes, note]);
	}

	// console.log('render')
	if (!notes) return <div>Loading...</div>;

	return (
		<section className="notes-index">
			<AddNote onAddNote={onAddNote} />
			{notes.map((note) => (
				<NotePreview key={note.id} note={note} />
			))}
		</section>
	);
}
