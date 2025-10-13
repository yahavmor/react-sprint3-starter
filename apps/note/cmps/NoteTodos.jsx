export function NoteTodos({ note }) {
	return (
		<div>
			<h2>{note.info.title}</h2>
			<ul>
				{note.info.todos.map((todo) => (
					<li key={`${todo.id}`}>{todo.txt}</li>
				))}
			</ul>
		</div>
	);
}
