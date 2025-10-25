export function NoteTodos({ note, onRemoveTodo }) {
	return (
		<div className="todos">
			<h2>{note.info.title}</h2>
			<ul className="clean-list">
				{note.info.todos.map((todo) => (
					<li key={todo.id}>
						{todo.txt}
						<button
							className="remove-task-btn "
							onClick={(event) => {
								event.stopPropagation();
								onRemoveTodo(note.id, todo.id);
							}}
						>
							✖️
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
