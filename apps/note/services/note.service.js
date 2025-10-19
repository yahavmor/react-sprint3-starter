import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTE_KEY = 'noteDB';

_createNotes();

export const noteService = {
	query,
	remove,
	save,
	put,
	get,
	createNote,
	getFilterFromSearchParams,
};

function query(filterBy = {}) {
	return storageService.query(NOTE_KEY).then((notes) => {
		let filteredNotes = notes;

		if (filterBy.status) {
			filteredNotes = filteredNotes.filter(
				(note) => note.status === filterBy.status
			);
		}

		if (filterBy.txt) {
			const txt = filterBy.txt.toLowerCase();
			filteredNotes = filteredNotes.filter((note) => {
				const title = note.title || '';
				const infoTitle = (note.info && note.info.title) || '';
				const infoTxt = (note.info && note.info.txt) || '';
				const todos = (note.info && note.info.todos) || [];

				const todosMatch = Array.isArray(todos)
					? todos.some((todo) => (todo.txt || '').toLowerCase().includes(txt))
					: false;

				return (
					title.toLowerCase().includes(txt) ||
					infoTitle.toLowerCase().includes(txt) ||
					infoTxt.toLowerCase().includes(txt) ||
					todosMatch
				);
			});
		}

		return filteredNotes;
	});
}

function save(note) {
	if (!note.id) {
		return storageService.post(NOTE_KEY, note);
	} else {
		return storageService.put(NOTE_KEY, note);
	}
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId);
}

function get(noteId) {
	return storageService.get(NOTE_KEY, noteId);
}

function put(note) {
	return storageService.put(NOTE_KEY, note);
}

function getFilterFromSearchParams(searchParams) {
	const status = searchParams.get('status') || '';
	const text = searchParams.get('text') || '';
	//const isRead = searchParams.get('isRead') || ''
	return {
		status,
		text,
		//isRead
	};
}

function createNote(type, info, style) {
	if (!info) throw new Error('Info not provided, failed to add note');

	const note = {
		type,
		id: utilService.makeId(),
		createdAt: Date.now(),
		status: 'board',
		info,
	};

	if (style) note.style = style;

	return storageService.post(NOTE_KEY, note);
}

function _createNotes() {
	const notes = utilService.loadFromStorage(NOTE_KEY) || [];
	if (notes && notes.length) return;
	const fakeNotes = [
		{
			id: utilService.makeId(),
			createdAt: 1112222,
			type: 'NoteTxt',
			status: 'board',
			isPinned: true,
			style: {
				backgroundColor: '#00d',
			},
			info: {
				txt: 'Fullstack Me Baby!',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: 1112223,
			type: 'NoteImg',
			status: 'board',
			isPinned: false,
			style: { backgroundColor: '#1503d9ff' },
			info: {
				url: 'https://www.news-medical.net/images/news/ImageForNews_790452_1726475801734923.jpg',
				title: 'Bobi and Me',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: 1112224,
			type: 'NoteTodos',
			status: 'board',
			isPinned: false,
			info: {
				title: 'Get my stuff together',
				todos: [
					{
						txt: 'Driving license',
						id: utilService.makeId(),
						doneAt: null,
					},
					{
						txt: 'Coding power',
						id: utilService.makeId(),
						doneAt: 187111111,
					},
				],
			},
		},

		{
			id: utilService.makeId(),
			createdAt: Date.now() - 86400000,
			type: 'NoteTxt',
			status: 'board',
			isPinned: true,
			style: { backgroundColor: '#fef6c3' },
			info: {
				txt: 'Buy birthday gift for Maya 🎁 — maybe that lavender candle she loved.',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 43200000,
			type: 'NoteTxt',
			status: 'board',
			isPinned: false,
			style: { backgroundColor: '#e3f2fd' },
			info: {
				txt: 'Ideas for blog post: productivity rituals, morning routines, and focus playlists.',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 10000000,
			type: 'NoteTodos',
			status: 'board',
			isPinned: false,
			style: { backgroundColor: '#f1f8e9' },
			info: {
				title: 'Weekend prep list',
				todos: [
					{ txt: 'Grocery shopping', id: utilService.makeId(), doneAt: null },
					{
						txt: 'Laundry',
						id: utilService.makeId(),
						doneAt: Date.now() - 5000000,
					},
					{ txt: 'Clean balcony', id: utilService.makeId(), doneAt: null },
					{
						txt: 'Meal prep for Monday',
						id: utilService.makeId(),
						doneAt: null,
					},
				],
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 20000000,
			type: 'NoteImg',
			status: 'board',
			isPinned: false,
			style: { backgroundColor: '#fff3e0' },
			info: {
				url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
				title: 'Dream vacation spot ✨',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 10000000,
			type: 'NoteTodos',
			status: 'board',
			isPinned: false,
			style: { backgroundColor: '#a1cd6fff' },
			info: {
				title: 'Exercise',
				todos: [
					{ txt: 'Hams crul', id: utilService.makeId(), doneAt: null },
					{
						txt: 'Pull ups',
						id: utilService.makeId(),
						doneAt: null,
					},
					{ txt: 'Sit-ups', id: utilService.makeId(), doneAt: null },
					{
						txt: 'Jumping Jack',
						id: utilService.makeId(),
						doneAt: null,
					},
				],
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 30000000,
			type: 'NoteImg',
			status: 'board',
			isPinned: true,
			style: { backgroundColor: '#fce4ec' },
			info: {
				url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
				title: 'Workspace inspiration',
			},
		},
		{
			id: utilService.makeId(),
			createdAt: Date.now() - 30000000,
			type: 'NoteImg',
			status: 'pinned',
			isPinned: true,
			style: { backgroundColor: '#dd688fff' },
			info: {
				url: 'https://cdn.shopify.com/s/files/1/0042/6727/8408/files/easter-bunny_600x600.png?v=1710605624',
				title: 'Easter Card',
			},
		},
	];

	utilService.saveToStorage(NOTE_KEY, fakeNotes);
}
