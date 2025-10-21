import '@fortawesome/fontawesome-free/css/all.min.css'
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
                <div className='right-section-mail'>
                    <div className="envelope-wrapper">
                        <img className="envelope-img" src="apps/mail/imgs/envelop.png" alt="Envelope" />
                    </div>
                    <div className="from-to-mail">
                        <p> {from}</p>
                        <p> {to}</p> 
                    </div>
                </div>
            
                <p>{formattedDate}</p>
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
