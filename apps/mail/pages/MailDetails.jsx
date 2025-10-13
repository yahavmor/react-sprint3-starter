import { MailService } from "../services/mail.service"

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()

    useEffect(() => {
        loadMail(mailId)
    }, [mailId])

    function loadMail(mailId) {
        MailService.getById(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log('Error loading mail:', err))
    }

    if (!mail) return <div className="mail-details-loading">Loading mail...</div>

    const { subject, body, from, to, sentAt } = mail

    const formattedDate = new Date(sentAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    })

    return (
        <section className="mail-details-modal">
            <h2>{subject}</h2>
            <div className="mail-meta">
                <p><strong>From:</strong> {from}</p>
                <p><strong>To:</strong> {to}</p>
                <p><strong>Sent:</strong> {formattedDate}</p>
            </div>
            <div className="mail-body">
                <p>{body}</p>
            </div>

            <div className="mail-details-actions">
                <Link to="/mail">← Back to inbox</Link>
            </div>
        </section>
    )
}
