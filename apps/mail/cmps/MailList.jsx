import { MailPreview } from "./MailPreview.jsx"
const { Link, useNavigate } = ReactRouterDOM

export function MailList({ mails, onRemoveMail, onIsREAD, onSelectMailId , onToggleStar }) {
    if (!mails.length) {
        return <div className="no-mails-msg">No mails were found...</div>
    }

    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id} className="mail-list-item">
                    <MailPreview
                        mail={mail}
                        onRemoveMail={onRemoveMail}
                        onIsREAD={onIsREAD}
                        onSelectMailId={onSelectMailId}
                        onToggleStar={onToggleStar}
                    />
                </li>
            ))}
        </ul>
    )
}
