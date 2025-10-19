const { useOutletContext, useNavigate } = ReactRouterDOM
const { Link, useSearchParams } = ReactRouterDOM


export function MailFolderList({ isOpen }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const currentStatus = searchParams.get('status') || 'inbox'

    function getLinkClass(statusName) {
        return statusName === currentStatus ? 'active-status' : ''
    }

    function onComposeClick() {
        navigate(`/mail/compose?status=${currentStatus}`)
    }

    return (
        <section className={`folders-list ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <div className="folder-content">
                    <button className="compose-btn" onClick={onComposeClick}>✏️ Compose</button>
                    <nav>
                        <Link to="/mail?status=inbox" className={getLinkClass('inbox')}>📥 Inbox</Link>
                        <Link to="/mail?status=sent" className={getLinkClass('sent')}>📤 Sent</Link>
                        <Link to="/mail?status=draft" className={getLinkClass('draft')}>📝 Draft</Link>
                        <Link to="/mail?status=trash" className={getLinkClass('trash')}>🗑 Trash</Link>
                        <Link to="/mail?status=starred" className={getLinkClass('starred')}>⭐ Starred</Link>
                    </nav>
                </div>
            )}
        </section>
    )
}
