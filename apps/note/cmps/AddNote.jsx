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
		//TODO this currently supports only single text,
		// we need to ask, if the type was NoteImg or NoteTxt, we knwo it is single value, if the type is NoteTodos we know it is different
		// figure out how to build it, and send correct strucutre of data to noteService.addNote
		let info;

		// this if esle is bothering me but not sure how to change it to switch
		if (noteType === 'NoteTodos') {
			info = { todos: value };
			noteService
				.addNote(noteType, info, false)
				.then((note) => onAddNote(note))
				.catch((err) => console.error('Error adding NoteTodos:', err));
		} else {
			switch (noteType) {
				case 'NoteTxt':
					info = { txt: value };
					break;

				case 'NoteImg':
					info = { url: value };
					break;
				default:
					console.error('Unknown noteType');
					return;
			}
			noteService
				.addNote(noteType, info, false)
				.then((note) => onAddNote(note))
				.catch((err) => console.error('Error adding Note:', err));
		}
	}

	console.log(noteType);

	return (
		<div className="input-conteiner">
			<AddNoteComponent onSubmit={addNewNote} />
			<button onClick={() => setNoteType('NoteTxt')}>txt</button>
			<button onClick={() => setNoteType('NoteImg')}>img</button>
			<button onClick={() => setNoteType('NoteTodos')}>list</button>
		</div>
	);
}
