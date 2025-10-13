export function MailPreview({mail}){

    const { subject, body , isRead , from , to } = mail
    return (
        <article className="mail-preview">
            <h2 className="mail-subject">{subject}</h2>
            <p className="mail-body">{body}</p>
            <h5 className="mail-from">{from}</h5>
            <h5 className="mail-to">{to}</h5>
        </article>
    )
}