import { MailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail(mailId)
    }, [mailId])

    function loadMail(mailId) {
        MailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log('Error loading mail:', err))
    }

    function onRemoveMail() {
        MailService.remove(mailId)
            .then(() => {
                navigate('/mail') // חזרה לרשימה אחרי מחיקה
            })
            .catch(err => console.log('Error removing mail:', err))
    }

    if (!mail) return <div>Loading mail...</div>

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
                <button onClick={() => navigate('/mail')}>← Back to inbox</button>
                <button onClick={onRemoveMail}>🗑 Remove</button>
            </div>
        </section>
    )
}
