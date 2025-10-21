import '@fortawesome/fontawesome-free/css/all.min.css'
import { noteService } from '../../note/services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'


const { useOutletContext, useNavigate, useSearchParams } = ReactRouterDOM

export function MailCompose() {
    const { onSendMail } = useOutletContext()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const originStatus = searchParams.get('status') || 'inbox'
    

    const [mail, setMail] = React.useState({
        from: 'yahavmor77@gmail.com',
        to: '',
        subject: '',
        body: '',
        status: 'sent',
        isRead: true,
        isStared:false,
    })
    function keepNote() {
        const noteType = 'NoteTxt'
        const info = { txt: `${mail.subject}\n${mail.body}` }

        noteService.createNote(noteType, info, false)
            .then(() => {
                showSuccessMsg('Note created from mail!')
                navigate('/note') 
            })
            .catch(err => {
                console.error('Error creating note from mail:', err)
                showErrorMsg('Failed to create note')
            })
    }


    function handleChange({ target }) {
        const { name, value } = target
        setMail(prev => ({ ...prev, [name]: value }))
    }

    function isMailDirty(mail) {
        return mail.to || mail.subject || mail.body
    }

    function handleClose() {
    if (isMailDirty(mail)) {
        const answer = window.confirm('You have unsaved changes. Save as draft?')
        if (answer) {
            const draftMail = { ...mail, status: 'draft' }
            onSendMail(draftMail)
            return
        }
    }
    navigate(`/mail?status=${originStatus}`)
}
    function handleSubmit(ev) {
        ev.preventDefault()
        onSendMail(mail)
        navigate('/mail')
    }


    return (
        <section className="mail-compose">
            <header>
                    <div className="mail-compose-actions">
                        <button onClick={keepNote} title="Send as note">
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                        <button onClick={handleClose} title="Close">
                            <i className="fa-solid fa-xmark"></i>
                        </button>                        
                    </div>
                    <h2>New Message</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <input type="email" name="to" placeholder="To" value={mail.to} onChange={handleChange} required />
                <input type="text" name="subject" placeholder="Subject" value={mail.subject} onChange={handleChange} />
                <textarea name="body" value={mail.body} onChange={handleChange} />
                <button className='send'>Send</button>
            </form>
        </section>
    )
}

