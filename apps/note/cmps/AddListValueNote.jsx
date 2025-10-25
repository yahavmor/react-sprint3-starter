import { utilService } from '../../../services/util.service.js';
import { NoteTodos } from './NoteTodos.jsx';

const { useState, useEffect, useRef } = React;
let taskCount = 0;

export function AddListValueNote({ onSubmit }) {
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

	function add() {
		onSubmit(toDo);
	}

	return (
		<div className="flex">
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

			<span className=" plus-btn " onClick={handleAddTasktoTodos}>
				add_circle
			</span>
		</div>
	);
}
