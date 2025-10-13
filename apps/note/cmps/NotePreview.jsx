import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';

//import { noteService } from '../services/note.service.js';

const cmpMap = { NoteTxt: NoteTxt, NoteImg: NoteImg, NoteTodos: NoteTodos };

export function NotePreview({ note, onRemoveNote }) {
	let NoteComponent = cmpMap[note.type];

	if (!NoteComponent)
		NoteComponent = (
			<div>Oh no! something failed rendering note (Note type not found)</div>
		);

	return (
		<div className="note-preview">
			<NoteComponent note={note} />
			<button className="delete-btn" onClick={() => onRemoveNote(note.id)}>
				x
			</button>
		</div>
	);
}
