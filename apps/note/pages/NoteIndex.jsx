import { NotePreview } from '../cmps/NotePreview.jsx';
import { noteService } from '../services/note.service.js';
import { showSuccessMsg } from '../../../services/event-bus.service.js';
import { NoteFolderList } from '../cmps/NoteFolderList.jsx';
import { Modal } from '../cmps/NoteModal.jsx';
import { AddNote } from '../cmps/AddNote.jsx';
import { NoteImg } from '../cmps/NoteImg.jsx';
import { NoteTxt } from '../cmps/NoteTxt.jsx';
import { NoteTodos } from '../cmps/NoteTodos.jsx';
import { MailService } from '../../mail/services/mail.service.js';

const { useState, useEffect, Fragment } = React;
const { Link, useSearchParams, Outlet, useNavigate } = ReactRouterDOM;

export function NoteIndex() {
	const [notes, setNotes] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const status = searchParams.get('status') || 'board';
	const txt = searchParams.get('txt') || '';
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [filterBy, setFilterBy] = useState({ status, txt });

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedNote, setSelectedNote] = useState(null); // State to hold the content of the currently selected note

	useEffect(() => {
		const status = searchParams.get('status') || 'board';
		const txt = searchParams.get('txt') || '';
		const updatedFilter = { status, txt };
		setFilterBy(updatedFilter);
		loadNotes(updatedFilter);
	}, [searchParams]);

	useEffect(() => {
		function handleToggleMenu() {
			setIsMenuOpen((prev) => !prev);
		}

		window.addEventListener('toggleMenu', handleToggleMenu);
		return () => window.removeEventListener('toggleMenu', handleToggleMenu);
	}, []);

	function loadNotes(filter = filterBy) {
		noteService
			.query(filter)
			.then(setNotes)
			.catch((err) => console.log('err:', err));
	}

	function onAddNote(noteType, info) {
		noteService
			.createNote(noteType, info, false)
			.then((newNote) => {
				setNotes((prevNotes) => [...prevNotes, newNote]);
				showSuccessMsg('Note added!');
			})
			.catch((err) => {
				console.error('Error adding Note:', err);
			});
	}

	function onArchiveNote(noteId) {
		noteService.get(noteId).then((note) => {
			note.status = 'archive';
			noteService
				.save(note)
				.then(() => {
					loadNotes(filterBy); // refresh after update
					showSuccessMsg('Note moved to archive.');
				})
				.catch((err) => {
					console.log('Error moving note to archive:', err);
				});
		});
	}

	function onCopyNote(noteId) {
		noteService.get(noteId).then((note) => {
			if (!note) throw new Error('Note not found');
			const copiedNote = {
				...note,
				id: null,
				createdAt: Date.now(),
				status: 'board',
			};

			noteService
				.save(copiedNote)
				.then((newNote) => {
					setNotes((notes) => [...notes, newNote]);
					showSuccessMsg('Note copied to board.');
				})
				.catch((err) => {
					console.error('Error copying note:', err);
				});
		});
	}

	function onRemoveNote(noteId) {
		console.log('Removing note with id:', noteId);

		noteService.get(noteId).then((note) => {
			if (!note) throw new Error('Note not found');

			if (note.status === 'trash') {
				noteService
					.remove(noteId)
					.then(() => {
						loadNotes(); // assumes filterBy excludes trash
						showSuccessMsg('Note has been successfully removed!');
					})
					.catch((err) => {
						console.error('Error removing Note:', err);
					});
			} else {
				note.status = 'trash';
				noteService
					.save(note)
					.then(() => {
						loadNotes(); // refresh after update
						showSuccessMsg('Note moved to trash.');
					})
					.catch((err) => {
						console.log('Error moving note to trash:', err);
					});
			}
		});
	}
	function onSetNoteStyle(updatedNote) {
		noteService
			.put(updatedNote)
			.then((savedNote) => {
				setNotes((prevNotes) =>
					prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
				);
			})
			.catch((err) => console.error('Error updating note color:', err));
	}

	function Gmail(note) {
		console.log('here');
		let subject = 'Note';
		let body = '';

		switch (note.type) {
			case 'NoteTxt':
				subject = 'Text Note';
				body = note.info.txt;
				break;

			case 'NoteTodos':
				subject = note.info.title || 'Todo List';
				body = note.info.todos
					.map((todo) => {
						const status = todo.doneAt ? '✔️' : '❌';
						return `${status} ${todo.txt}`;
					})
					.join('\n');
				break;

			case 'NoteImg':
				subject = note.info.title || 'Image Note';
				body = body = `Image URL: ${note.info.url}`;
				break;

			default:
				body = 'Unsupported note type.';
		}

		const mail = {
			from: 'me@notes.com',
			to: ' ',
			subject,
			body,
			status: 'draft',
		};

		MailService.send(mail)
			.then(() => {
				showSuccessMsg('Mail created from note!');
				navigate('/mail');
			})
			.catch((err) => {
				console.error('Error creating mail from note:', err);
				showErrorMsg('Failed to create mail');
			});
	}
	function onSetFilterBy(newFilterBy) {
		setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }));
	}

	function toggleMenu() {
		setIsMenuOpen((prev) => !prev);
	}

	function onUpdateNote(noteToUpdate) {}

	// Function passed to NotePreview
	const handleOpenModal = (note) => {
		setSelectedNote(note);
		setIsModalOpen(true); // Open the modal
	};

	// Function to close the modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedNote(null); // Clear the note data when closed
	};

	// console.log('render')
	if (!notes) return <div className="no-notes-msg">Loading...</div>;
	console.log(notes);
	return (
		<section className="note-index-layout">
			<NoteFolderList
				className={`folders-list ${isMenuOpen ? '' : 'closed'}`}
				isOpen={isMenuOpen}
			/>

			<main className="main">
				<AddNote onAddNote={onAddNote} />
				<div className="notes-index">
					{notes.map((note) => (
						<NotePreview
							key={note.id}
							note={note}
							onNoteClick={handleOpenModal}
							onRemoveNote={onRemoveNote}
							onArchiveNote={onArchiveNote}
							Gmail={Gmail}
							onCopyNote={onCopyNote}
							onSetNoteStyle={onSetNoteStyle}
						/>
					))}
				</div>
			</main>

			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				{selectedNote && (
					<div className="modal-content-wrapper" style={selectedNote.style}>
						{selectedNote.type === 'NoteImg' && (
							<NoteImg note={selectedNote} onRemoveNote={onRemoveNote} />
						)}

						{selectedNote.type === 'NoteTxt' && (
							<NoteTxt note={selectedNote} onRemoveNote={onRemoveNote} />
						)}

						{selectedNote.type === 'NoteTodos' && (
							<NoteTodos note={selectedNote} onRemoveNote={onRemoveNote} />
						)}
					</div>
				)}
			</Modal>
		</section>
	);
}
