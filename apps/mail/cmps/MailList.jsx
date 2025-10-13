import { MailPreview } from "./MailPreview.jsx"
const { Link } = ReactRouterDOM


export function MailList({mails}) {
    return(
        <ul className="mail-list container">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    {/* <section>
                        <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section> */}
                </li>
            )}
        </ul>
    )  
}
