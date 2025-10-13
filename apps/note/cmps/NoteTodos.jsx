export function NoteTodos({ note, onRemoveTodo }) {
	return (
		<div>
			<h2>{note.info.title}</h2>
			<ul>
				{note.info.todos.map((todo) => (
					<li key={todo.id}>
						{todo.txt}
						<button onClick={() => onRemoveTodo(todo.id)}> x </button>
					</li>
				))}
			</ul>
		</div>
	);
}
