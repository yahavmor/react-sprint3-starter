export function Modal({ isOpen, onClose, noteStyle = {}, children }) {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close-button" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
}
