const { useOutletContext, useNavigate } = ReactRouterDOM


export function MailCompose() {
    const { onSendMail } = useOutletContext()
    const navigate = useNavigate()

    const [mail, setMail] = React.useState({
        from: 'yahavmor77@gmail.com',
        to: '',
        subject: '',
        body: '',
        status:'sent'
    })

    function handleChange({ target }) {
        const { name, value } = target
        setMail(prev => ({ ...prev, [name]: value }))
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
                <button onClick={() => navigate('/mail')}>✖</button>
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
