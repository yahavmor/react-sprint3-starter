import { utilService } from '../../../services/util.service.js';
import { NoteTodos } from './NoteTodos.jsx';

const { useState, useEffect, useRef } = React;
let taskCount = 0;

export function AddListValueNote({ onSubmit, onRemoveTodo }) {
	const [toDo, setToDo] = useState([]);
	const inputListValueNote = useRef(null);

	function handleAddTasktoTodos() {
		const taskTxt = inputListValueNote.current.value;

		if (taskTxt) {
			const newTask = {
				txt: taskTxt,
				doneAt: Date.now(),
				id: 'task_' + taskCount++,
			};
			//console.log(newTask);
			setToDo((prevTasks) => [...prevTasks, newTask]);
			inputListValueNote.current.value = '';
		}
	}

	// dont know how to transfer it to the NoteTodos
	function onRemoveTodo(toDoId) {
		console.log('Removing note with id:', toDoId);
		noteService.remove(toDoId).then(() => {
			setToDo((toDo) => toDo.filter((toDo) => toDo.id !== toDoId));
			showSuccessMsg('Note has been successfully removed!');
		});
	}

	function add() {
		onSubmit(toDo);
	}

	return (
		<div>
			<button className="add-note-btn" onClick={add}>
				Add Note
			</button>
			<input
				ref={inputListValueNote}
				type="text"
				placeholder="Add your task..."
			/>
			{/* <button className="plus-btn" onClick={handleAddTasktoTodos}>
				{' '}
				+{' '}
			</button> */}

			<span class=" plus-btn " onClick={handleAddTasktoTodos}>
				add_circle
			</span>
		</div>
	);
}
