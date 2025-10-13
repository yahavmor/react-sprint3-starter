import { AddTxtValueNote } from './AddTxtValueNote.jsx';
import { AddListValueNote } from './AddListValueNote.jsx';
import { noteService } from '../services/note.service.js';

const cmpMap = {
	NoteTxt: AddTxtValueNote,
	NoteImg: AddTxtValueNote,
	NoteTodos: AddListValueNote,
};

const { useState, useEffect } = React;

export function AddNote({ onAddNote }) {
	const [noteType, setNoteType] = useState('NoteTxt');

	let AddNoteComponent = cmpMap[noteType];

	if (!AddNoteComponent) AddNoteComponent = AddTxtValueNote;

	function addNewNote(value) {
		const info = { txt: value };
		noteService.addNote(noteType, info, false).then((note) => onAddNote(note));
	}

	return (
		<div>
			<AddNoteComponent onSubmit={addNewNote} />
			<button onClick={() => setNoteType('NoteText')}>txt</button>
			<button onClick={() => setNoteType('NoteImg')}>img</button>
			<button onClick={() => setNoteType('NoteTodos')}>list</button>
		</div>
	);
}
