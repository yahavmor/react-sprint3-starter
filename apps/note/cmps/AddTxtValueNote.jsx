export function AddTxtValueNote({ onSubmit, noteType }) {
	console.log(onSubmit);
	function add() {
		const element = document.getElementById('txtValueForNote');
		onSubmit(element.value);
	}

	return (
		<div>
			<button onClick={add}>Add Note</button>
			<input
				id="txtValueForNote"
				placeholder={
					noteType === 'NoteTxt' ? 'What is on your mind...' : 'Place URL'
				}
				type="text"
			/>
		</div>
	);
}
