import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';

const cmpMap = { NoteTxt: NoteTxt, NoteImg: NoteImg, NoteTodos: NoteTodos };

export function NotePreview({ note }) {
	let NoteComponent = cmpMap[note.type];

	if (!NoteComponent)
		NoteComponent = (
			<div>Oh no! something failed rendering note (Note type not found)</div>
		);

	return (
		<div className="note-preview">
			<NoteComponent note={note} />
		</div>
	);
}
