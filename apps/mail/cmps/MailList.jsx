import { MailPreview } from "./MailPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {
    const navigate = useNavigate()

    if (!mails.length) {
        return (
            <div className="no-mails-msg">
                No mails were found...
            </div>
        )
    }

    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id} className="mail-list-item">
                    <Link to={`/mail/${mail.id}`} className="mail-link">
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}


