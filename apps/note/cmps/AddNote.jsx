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
		<div className="input-container">
			<AddNoteComponent onSubmit={addNewNote} noteType={noteType} />
			<button
				className="noteType-btn material-symbols-outlined"
				onClick={() => setNoteType('NoteTxt')}
			>
				short_text
			</button>
			<button
				className="noteType-btn material-symbols-outlined"
				onClick={() => setNoteType('NoteImg')}
			>
				image
			</button>
			<button
				className="noteType-btn material-symbols-outlined"
				onClick={() => setNoteType('NoteTodos')}
			>
				format_list_bulleted_add
			</button>
		</div>
	);
}
