export function AddTxtValueNote({ onSubmit }) {
	function add() {
		const element = document.getElementById('txtValueForNote');
		onSubmit(element.value);
	}

	return (
		<div>
			<input id="txtValueForNote" type="text" />
			<button onClick={add}>add</button>
		</div>
	);
}
