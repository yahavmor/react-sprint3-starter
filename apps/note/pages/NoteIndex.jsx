import { NotePreview } from '../cmps/NotePreview.jsx';
import { noteService } from '../services/note.service.js';
import { showSuccessMsg } from '../../../services/event-bus.service.js';
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

	function onRemoveNote(noteId) {
		console.log('Removing note with id:', noteId);
		noteService.remove(noteId).then(() => {
			setNotes((notes) => notes.filter((note) => note.id !== noteId));
			showSuccessMsg('Note has been successfully removed!');
		});
	}

	// console.log('render')
	if (!notes) return <div className="loading-container">Loading...</div>;
	console.log(notes);
	return (
		<section>
			<AddNote onAddNote={onAddNote} />
			<div className="notes-index">
				{notes.map((note) => (
					<NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} />
				))}
			</div>
		</section>
	);
}
