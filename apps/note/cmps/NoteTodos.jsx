export function NoteTodos({ note }) {
	return (
		<div className="todos">
			<h2>{note.info.title}</h2>
			<ul className="clean-list">
				{note.info.todos.map((todo) => (
					<li key={todo.id}>
						{todo.txt}
						<button
							className="remove-task-btn "
							onClick={() => onRemoveTodo(todo.id)}
						>
							✖️
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
