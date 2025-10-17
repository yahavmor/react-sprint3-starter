
const { useOutletContext, useNavigate } = ReactRouterDOM
const { Link, useSearchParams } = ReactRouterDOM

export function MailFolderList({ isOpen }) {
    const navigate = ReactRouterDOM.useNavigate()
    const [searchParams] = ReactRouterDOM.useSearchParams()
    const currentStatus = searchParams.get('status') || 'inbox'

    function getLinkClass(statusName) {
        return statusName === currentStatus ? 'active-status' : ''
    }

    return (
        <section className={`folders-list ${isOpen ? 'open' : 'closed'}`}>
            {isOpen && (
                <div className="folder-content">
                    <button onClick={() => navigate('/mail/compose')}>New Email</button>
                    <nav>
                        <Link to="/mail?status=inbox" className={getLinkClass('inbox')}>📥 Inbox</Link>
                        <Link to="/mail?status=sent" className={getLinkClass('sent')}>📤 Sent</Link>
                        <Link to="/mail?status=draft" className={getLinkClass('draft')}>📝 Draft</Link>
                        <Link to="/mail?status=trash" className={getLinkClass('trash')}>🗑 Trash</Link>
                    </nav>
                </div>
            )}
        </section>
    )
}


