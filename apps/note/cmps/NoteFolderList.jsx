const { useOutletContext, useNavigate } = ReactRouterDOM;
const { Link, useSearchParams } = ReactRouterDOM;

export function NoteFolderList({ isOpen }) {
	const navigate = ReactRouterDOM.useNavigate();
	const [searchParams] = ReactRouterDOM.useSearchParams();
	const currentStatus = searchParams.get('status') || 'board';

	function getLinkClass(statusName) {
		return statusName === currentStatus ? 'active-status' : '';
	}

	return (
		<section className={`folders-list ${isOpen ? 'open' : 'closed'}`}>
			{isOpen && (
				<div className="folder-content">
					{/* <button
						onClick={() => navigate(`/mail/compose?status=${currentStatus}`)}
					>
						New Email
					</button> */}
					<nav>
						<Link to="/note?status=board" className={getLinkClass('board')}>
							<i className="material-symbols-outlined"> emoji_objects</i>
							Board
						</Link>

						<Link to="/note?status=archive" className={getLinkClass('archive')}>
							<i className="material-symbols-outlined"> archive</i>
							Archive
						</Link>
						<Link to="/note?status=trash" className={getLinkClass('trash')}>
							<i className="material-symbols-outlined"> delete</i>
							Trash
						</Link>
					</nav>
				</div>
			)}
		</section>
	);
}
