import { MailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { utilService } from "../../../services/util.service.js"
import { MailFolderList } from "../cmps/MailFolderList.jsx"




const { useState, useEffect, Fragment } = React
const { Link , useSearchParams , Outlet, useNavigate } = ReactRouterDOM



export function MailIndex() {



    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mailToDelete, setMailToDelete] = useState(null)
    const navigate = useNavigate()
    const status = searchParams.get('status') || 'inbox'
    const [filterBy, setFilterBy] = useState({ status })

        useEffect(() => {
        const updatedFilter = { status }
        setFilterBy(updatedFilter)
        loadMails(updatedFilter)
        }, [status])
    
    

    
    function onSendMail(newMail) {
        const mailToSave = { ...newMail, status: 'sent' }

        MailService.send(mailToSave)
            .then(() => {
                loadMails()
                navigate('/mail')
            })
            .catch(err => console.log('Error sending mail:', err))
    }


    function loadMails(filter = filterBy) {
    MailService.query(filter)
        .then(mails => {
            setMails(mails)
            setMailToDelete(null)
            setSelectedMailId(null)
        })
        .catch(err => console.log('Error loading mails:', err))
    }



    function onRemoveMail(mailId) {
    MailService.get(mailId)
        .then(mail => {
            if (!mail) throw new Error('Mail not found')
            mail.status = 'trash'
            return MailService.save(mail)
        })
        .then(() => {
            setMailToDelete(null)
            setSelectedMailId(null)
            loadMails(filterBy)
        })
        .catch(err => console.log('Error moving mail to trash:', err))
    }


    
    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }


    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }
    


    if (!mails) return <div>Loading...</div>

   
    return (
        <section className="mail-index-layout">
            <MailFolderList />
            <section className="mail-index">
                <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />


                {selectedMailId ? (
                    <MailDetails mailId={selectedMailId}  />
                ) : (
                    <Fragment>
                        <MailList mails={mails} onSelectMailId={onSelectMailId}  onRemoveMail={onRemoveMail}/>
                    </Fragment>
                )}

                <Outlet context={{ onSendMail }} />
            </section>
        </section>
        )

    }


