export function About() {
    return (
        <section className="about">
            <div className="about-content">
                <h1>Welcome to Your Productivity Hub</h1>

                <div className="about-intro">
                    <p>
                        This application seamlessly integrates two essential tools — <strong>Gmail</strong> and <strong>Keep</strong> — into one unified experience.
                        Whether you're managing emails or capturing ideas, our platform helps you stay organized, focused, and efficient.
                    </p>
                </div>

                <div className="about-features">
                    <h2><i className="fa-solid fa-envelope"></i> Gmail Features</h2>
                    <ul>
                        <li>Compose, send, and organize emails with intuitive controls</li>
                        <li>Draft saving and smart status filtering (Inbox, Sent, Draft)</li>
                        <li>Quick navigation and responsive design for smooth communication</li>
                    </ul>

                    <h2><i className="fa-solid fa-note-sticky"></i> Keep Features</h2>
                    <ul>
                        <li>Create and manage notes, reminders, and ideas</li>
                        <li>Pin important thoughts and organize by color or category</li>
                        <li>Lightweight interface for fast note-taking and easy access</li>
                    </ul>
                </div>

                <div className="about-vision">
                    <h2><i className="fa-solid fa-lightbulb"></i> Our Vision</h2>
                    <p>
                        We believe productivity should be simple and enjoyable. By combining communication and creativity in one place,
                        we empower users to focus on what matters most — without switching between apps or losing momentum.
                    </p>
                </div>

                <footer className="about-footer">
                    <p>© 2025 KeepMail . All rights reserved.</p>
                </footer>
            </div>
        </section>
    )
}
