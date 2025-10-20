import '@fortawesome/fontawesome-free/css/all.min.css'

const { useNavigate } = ReactRouterDOM
const { Link, useSearchParams } = ReactRouterDOM

export function MailFolderList({ isOpen, mails }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const currentStatus = searchParams.get('status') || 'inbox'

    function getLinkClass(statusName) {
        return statusName === currentStatus ? 'active-status' : ''
    }

    function onComposeClick() {
        navigate(`/mail/compose?status=${currentStatus}`)
    }

    function countByStatus(status) {
        if (status === 'starred') {
            return mails.filter(mail => mail.isStarred).length
        }
        return mails.filter(mail => mail.status === status).length
    }


    return (
        <section className={`folders-list ${isOpen ? 'open' : 'closed'}`}>
            <div className="folder-content">
                <button className="compose-btn" onClick={onComposeClick}>
                    <i className="fa-solid fa-pencil"></i>
                    <span className="folder-label">Compose</span>
                </button>
                <nav>
                    <Link to="/mail?status=inbox" className={getLinkClass('inbox')}>
                        <i className="fa-solid fa-inbox"></i>
                        <div className="folder-label-wrapper">
                            <span className="folder-label">Inbox</span>
                            <span className="mail-count">{countByStatus('inbox')}</span>
                        </div>
                    </Link>

                    <Link to="/mail?status=starred" className={getLinkClass('starred')}>
                        <i className="fa-regular fa-star"></i>
                        <div className="folder-label-wrapper">
                            <span className="folder-label">Starred</span>
                            <span className="mail-count">{countByStatus('starred')}</span>
                        </div>
                    </Link>

                    <Link to="/mail?status=sent" className={getLinkClass('sent')}>
                        <i className="fa-regular fa-paper-plane"></i>
                        <div className="folder-label-wrapper">
                            <span className="folder-label">Sent</span>
                            <span className="mail-count">{countByStatus('sent')}</span>
                        </div>
                    </Link>

                    <Link to="/mail?status=draft" className={getLinkClass('draft')}>
                        <i className="fa-regular fa-file"></i>
                        <div className="folder-label-wrapper">
                            <span className="folder-label">Drafts</span>
                            <span className="mail-count">{countByStatus('draft')}</span>
                        </div>
                    </Link>

                    <Link to="/mail?status=trash" className={getLinkClass('trash')}>
                        <i className="fa-regular fa-trash-can"></i>
                        <div className="folder-label-wrapper">
                            <span className="folder-label">Trash</span>
                            <span className="mail-count">{countByStatus('trash')}</span>
                        </div>
                    </Link>
                </nav>
            </div>
        </section>
    )
}
