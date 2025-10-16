
export function MailPreview({ mail, onRemoveMail }) {
    const { id, subject, from, sentAt, isRead, status } = mail
    function getTimeAgo(sentAt) {
        const now = Date.now()
        const diffMs = now - sentAt
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        const diffHours = Math.floor(diffMinutes / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMinutes < 60) return `${diffMinutes} minutes ago`
        else if (diffHours < 24) return `${diffHours} hours ago`
        else return `${diffDays} days ago`
    }

    const timeAgo = getTimeAgo(sentAt)
    const previewClass = `mail-preview ${isRead ? 'read' : 'unread'}`
    const deleteTxt = status === 'trash' ? 'Delete forever' : 'Delete'

    return (
        <article className={previewClass}>
            <div className="mail-checkbox">
                <input type="checkbox" />
            </div>
            <div className="mail-star">☆</div>
            <div className="mail-from">{from}</div>
            <div className="mail-subject">{subject}</div>
            <div className="mail-time">{timeAgo}</div>
            <button
                className="btn-remove"
                onClick={(ev) => {
                    ev.stopPropagation()
                    onRemoveMail(id)
                }}
            >
                🗑 {deleteTxt}
            </button>
        </article>
    )
}
