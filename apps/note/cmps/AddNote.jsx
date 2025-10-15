import { AddTxtValueNote } from './AddTxtValueNote.jsx';
import { AddListValueNote } from './AddListValueNote.jsx';

const cmpMap = {
	NoteTxt: AddTxtValueNote,
	NoteImg: AddTxtValueNote,
	NoteTodos: AddListValueNote,
};

const { useState } = React;

export function AddNote({ onAddNote }) {
	const [noteType, setNoteType] = useState('NoteTxt');

	let AddNoteComponent = cmpMap[noteType];
	if (!AddNoteComponent) AddNoteComponent = AddTxtValueNote;

	function handleSubmit(value) {
		let info;
		switch (noteType) {
			case 'NoteTodos':
				info = { todos: value };
				break;
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
		onAddNote(noteType, info);
	}

	return (
		<div className="input-container">
			<AddNoteComponent onSubmit={handleSubmit} noteType={noteType} />
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
