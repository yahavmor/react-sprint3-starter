export function NoteTodos({ note }) {
	return (
		<div>
			<h2>{note.info.title}</h2>
			<ul>
				{note.info.todos.map((todo) => (
					<li>{todo.txt}</li>
				))}
			</ul>
		</div>
	);
}
// {
// 	id: 'n103',
// 	createdAt: 1112224,
// 	type: 'NoteTodos',
// 	isPinned: false,
// 	info: {
// 		title: 'Get my stuff together',
// 		todos: [
// 			{
// 				txt: 'Drivinglicense',
// 				doneAt: null,
// 			},
// 			{
// 				txt: 'Coding power',
// 				doneAt: 187111111,
// 			},
// 		],
// 	},
// },
