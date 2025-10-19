import { MailService } from "../services/mail.service.js"
import { showSuccessMsg , showErrorMsg } from '../../../services/event-bus.service.js'

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

    function permanentlyRemoveMail() {
    MailService.remove(mailId)
        .then(() => {
            showSuccessMsg('Mail removed permanently!')
            navigate('/mail')
        })
        .catch((err) => {
            console.log('Error removing mail:', err)
            showErrorMsg('Mail did not remove permanently!')
        })
}


    if (!mail) return <div>Loading mail...</div>

    const { subject, body, from, to, sentAt, status } = mail
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
                <button onClick={() => navigate(`/mail/?status=${status}`)}>←Go Back</button>
                <button onClick={permanentlyRemoveMail}>🗑 Remove</button>
            </div>
        </section>
    )
}
