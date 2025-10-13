import { utilService } from '../../../services/util.service.jsx';
import { NoteTodos } from './NoteTodos.jsx';

const { useState, useEffect } = React;
let taskCount = 0;

export function AddListValueNote({ onSubmit }) {
	const [toDo, setToDo] = useState([]);

	function handleAddTasktoTodos() {
		const taskTxt = document.getElementById('listValueForNote').value;

		if (taskTxt) {
			const newTask = {
				txt: taskTxt,
				doneAt: Date.now(),
				id: 'task_' + taskCount++,
			};
			//console.log(newTask);
			setToDo((prevTasks) => [...prevTasks, newTask]);
			document.getElementById('listValueForNote').value = '';
		}
	}
	//console.log(toDo);

	// dont know how to transfer it to the NoteTodos
	function onRemoveTodo(toDoId) {
		console.log('Removing note with id:', toDoId);
		noteService.remove(toDoId).then(() => {
			setToDo((toDo) => toDo.filter((toDo) => toDo.id !== toDoId));
			showSuccessMsg('Note has been successfully removed!');
		});
	}

	function add() {
		onSubmit(toDo, onRemoveTodo);
	}

	return (
		<div>
			<input id="listValueForNote" type="text" placeholder="Add your task..." />
			<button onClick={handleAddTasktoTodos}> + </button>
			<button onClick={add}>add</button>
		</div>
	);
}
