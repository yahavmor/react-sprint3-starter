import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { ColorInput } from './ColorInput.jsx';

//import { noteService } from '../services/note.service.js';

const cmpMap = { NoteTxt: NoteTxt, NoteImg: NoteImg, NoteTodos: NoteTodos };

const { useState } = React;

export function NotePreview({
	note,
	onRemoveNote,
	onNoteClick,
	onArchiveNote,
	onSetNoteStyle,
	onCopyNote,
	Gmail,
}) {
	const [isColorOpen, setIsColorOpen] = useState(false);
	let NoteComponent = cmpMap[note.type];
	//console.log(note.type);

	if (!NoteComponent)
		NoteComponent = (
			<div>Oh no! something failed rendering note (Note type not found)</div>
		);

	const handleClick = () => {
		onNoteClick(note);
	};

	return (
		<div
			className={`note-preview ${note.type}`}
			style={note.style}
			onClick={handleClick}
		>
			<NoteComponent note={note} onRemoveNote={onRemoveNote} />

			<section className="action-icons flex">
				<div
					className="material-symbols-outlined"
					onClick={(event) => {
						event.stopPropagation();
						setIsColorOpen(!isColorOpen);
					}}
				>
					{' '}
					palette{' '}
					{isColorOpen && (
						<ColorInput
							note={note}
							onSetNoteStyle={onSetNoteStyle}
							onClose={() => setIsColorOpen(false)}
						/>
					)}
				</div>

				<div className="material-symbols-outlined">edit_square</div>
				<div
					className="material-symbols-outlined"
					onClick={(event) => {
						event.stopPropagation();
						Gmail(note);
					}}
				>
					{' '}
					mail
				</div>
				<div
					className="material-symbols-outlined"
					onClick={(event) => {
						event.stopPropagation();
						onArchiveNote(note.id);
					}}
				>
					archive
				</div>

				<div
					className="material-symbols-outlined"
					onClick={(event) => {
						event.stopPropagation();
						onCopyNote(note.id);
					}}
				>
					content_copy
				</div>

				<div
					className="material-symbols-outlined"
					onClick={(event) => {
						event.stopPropagation();
						onRemoveNote(note.id);
					}}
				>
					delete
				</div>
			</section>
		</div>
	);
}
