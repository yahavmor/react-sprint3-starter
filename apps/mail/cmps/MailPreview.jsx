export function MailPreview({ mail }) {
    const { subject, from, sentAt ,isRead} = mail

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
    const readStyle = isRead ? { backgroundColor: '#f0f0f0', color: '#888' } : { backgroundColor: '#4d3f3fff', color: '#000' }
    return (
        <article className="mail-preview" style={readStyle}>
            <h4 className="mail-from">{from}</h4>
            <h4 className="mail-subject">{subject}</h4>
            <h4 className="mail-time">Sent {timeAgo}</h4>
        </article>
    )
}
