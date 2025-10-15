export function AddTxtValueNote({ onSubmit, noteType }) {
	//console.log(onSubmit);
	const { useRef } = React;
	const inputTxtValueNote = useRef(null);

	function add() {
		const value = inputTxtValueNote.current.value;
		if (!value) return;
		onSubmit(value);
		inputTxtValueNote.current.value = '';
	}

	return (
		<div>
			<button onClick={add}>Add Note</button>
			<input
				ref={inputTxtValueNote}
				placeholder={
					noteType === 'NoteTxt' ? 'What is on your mind...' : 'Place URL'
				}
				type="text"
			/>
		</div>
	);
}
