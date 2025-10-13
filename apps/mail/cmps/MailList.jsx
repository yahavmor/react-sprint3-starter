import { MailPreview } from "./MailPreview.jsx"
const { Link  , useNavigate } = ReactRouterDOM

export function MailList({mails}) {
    const navigate = useNavigate()


        if (!mails.length) {
            return (
                <div className="no-mails-msg">
                    No mails were found...
                </div>
            )
        }
    return(
    <ul className="mail-list container">
        {mails.map(mail => (
            <li key={mail.id} onClick={() => navigate(`/mail/${mail.id}`)}>
            <MailPreview mail={mail} />
            </li>
        ))}
    </ul>
    )  
}




