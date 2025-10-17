import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';

//import { noteService } from '../services/note.service.js';

const cmpMap = { NoteTxt: NoteTxt, NoteImg: NoteImg, NoteTodos: NoteTodos };

export function NotePreview({ note, onRemoveNote, onSetNoteStyle }) {
	let NoteComponent = cmpMap[note.type];
	//console.log(note.type);

	if (!NoteComponent)
		NoteComponent = (
			<div>Oh no! something failed rendering note (Note type not found)</div>
		);

	function handleColorChange(ev) {
		const newColor = ev.target.value;
		const updatedNote = {
			...note,
			style: {
				...note.style,
				backgroundColor: newColor,
			},
		};
		onSetNoteStyle(updatedNote);
	}

	return (
		<div className={`note-preview ${note.type}`} style={note.style}>
			<NoteComponent note={note} onRemoveNote={onRemoveNote} />

			<section className="action-icons flex">
				<div>
					<label
						htmlFor={`clr-${note.id}`}
						className="material-symbols-outlined"
					>
						palette
					</label>
					<input
						type="color"
						name="clr"
						id={`clr-${note.id}`}
						onInput={handleColorChange}
					/>
				</div>

				<div className="material-symbols-outlined">edit_square</div>
				<div className="material-symbols-outlined">mail</div>
				<div className="material-symbols-outlined">content_copy</div>

				<div
					className="material-symbols-outlined"
					onClick={() => onRemoveNote(note.id)}
				>
					delete
				</div>
			</section>
		</div>
	);
}
