import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js';

const NOTE_KEY = 'noteDB';
var gFilterBy = { title: '' };
_createNotes();

export const noteService = {
	query,
	remove,
	save,
	put,
	createNote,
};

function query() {
	return storageService.query(NOTE_KEY).then((notes) => {
		//Todo: remove in future
		if (!notes.length) return fakeNotes;

		return notes;
	});
}
function save(note) {
	if (!note.id) {
		return storageService.put(NOTE_KEY, note);
	} else {
		return storageService.post(NOTE_KEY, note);
	}
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId);
}

function put(note) {
	return storageService.put(NOTE_KEY, note);
}

function createNote(type, info, isPinned, style) {
	if (!info) throw new Error('Info not provided, failed to add note');

	const note = {
		type,
		id: utilService.makeId(),
		createdAt: Date.now(),
		isPinned,
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
