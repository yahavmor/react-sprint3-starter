const { Link } = ReactRouterDOM

export function MailFolderList() {
    return (
        <section className="folders-list">
            <h3>Folders</h3>
            <nav>
                <Link to="/mail/inbox">📥 Inbox</Link>
                <Link to="/mail/draft">📝 Draft</Link>
                <Link to="/mail/sent">📤 Sent</Link>
                <Link to="/mail/trash">🗑 Trash</Link>
            </nav>
        </section>
    )
}
