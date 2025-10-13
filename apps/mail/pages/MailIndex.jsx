import { MailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"



const { useState, useEffect, Fragment } = React
const { Link , useSearchParams } = ReactRouterDOM

export function MailIndex() {
        const [mails, setMails] = useState([])

        useEffect(() => {
            loadMails()
        }, [])

    function loadMails() {
        MailService.query()
            .then((mails)=>{setMails(mails)} )
            .catch(err => console.log('err:', err))
    }
    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <MailList 
            mails = {mails}
            />
        </section>
    ) 
}
