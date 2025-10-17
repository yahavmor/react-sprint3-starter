import '@fortawesome/fontawesome-free/css/all.min.css'
const { useParams, useNavigate } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail, onIsREAD, onSelectMailId }) {
    const { id, subject, from, sentAt, isRead, status } = mail

    function getTimeAgo(sentAt) {
        const now = Date.now()
        const diffMs = now - sentAt
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        const diffHours = Math.floor(diffMinutes / 60)
        const diffDays = Math.floor(diffHours / 24)
        if (diffMinutes < 10) return 'Just now'
        if (diffMinutes < 60) return `${diffMinutes} minutes ago`
        else if (diffHours < 24) return `${diffHours} hours ago`
        else return `${diffDays} days ago`
    }

    const timeAgo = getTimeAgo(sentAt)
    const navigate = useNavigate()

    const previewClass = `mail-preview ${isRead ? 'read' : 'unread'} ${status === 'trash' ? 'in-trash' : ''}`


    function handleClick() {
        onIsREAD(id)
        navigate(`/mail/${id}`)
    }



    return (
        <article className={previewClass} onClick={handleClick}>
            <div className="mail-checkbox">
                <input type="checkbox" />
            </div>
            <div className="mail-star">☆</div>
            <div className="mail-from">{from}</div>
            <div className="mail-subject">{subject}</div>
            <div className="mail-time">{timeAgo}</div>
            {status !== 'trash' && (
                <button
                    className="btn-remove"
                    onClick={(ev) => {
                        ev.stopPropagation()
                        onRemoveMail(id)
                    }}
                >
                    <i className="btn-remove fa-solid fa-trash"></i> 
                </button>
            )}

        </article>
    )
}
