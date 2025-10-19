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
                navigate(`/mail?status=draft`)
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
                <h2>New Message</h2>
                <button onClick={handleClose}>✖</button>
            </header>
            <form onSubmit={handleSubmit}>
                <input type="email" name="to" placeholder="To" value={mail.to} onChange={handleChange} required />
                <input type="text" name="subject" placeholder="Subject" value={mail.subject} onChange={handleChange} />
                <textarea name="body" placeholder="Write your message..." value={mail.body} onChange={handleChange} />
                <button type="submit">Send</button>
            </form>
        </section>
    )
}


