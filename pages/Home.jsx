const { useParams, useNavigate } = ReactRouterDOM;

export function Home() {
	const navigate = useNavigate();

	return (
		<section className="home">
			<div className="home-content">
				<div className="hero">
					<img
						src="https://cdn-icons-png.flaticon.com/512/5965/5965756.png"
						alt="Productivity Icon"
					/>
					<h1>KeepMail</h1>
					<p>Mail. Notes. Flow.</p>
				</div>

				<div className="feature-grid">
					<div className="feature-card" onClick={() => navigate('/mail')}>
						<i className="fa-solid fa-envelope"></i>
						<h2>Gmail</h2>
					</div>
					<div className="feature-card" onClick={() => navigate('/note')}>
						<i className="fa-solid fa-note-sticky"></i>
						<h2>Keep</h2>
					</div>
				</div>

				<footer className="home-footer">
					<p>© 2025 KeepMail</p>
				</footer>
			</div>
		</section>
	);
}
