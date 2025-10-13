import { MailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"




const { useState, useEffect, Fragment } = React
const { Link , useSearchParams } = ReactRouterDOM


export function MailIndex() {

  const defaultFilter = {
    txt: '',
    status: '',
    isRead: false
    }

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(defaultFilter)
    const [searchParams, setSearchParams] = useSearchParams()



    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        MailService.query(filterBy)
            .then((mails)=>{setMails(mails)} )
            .catch(err => console.log('err:', err))
    }
    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }
    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy}/>
            <MailList 
            mails = {mails}
            />
        </section>
    ) 
}
