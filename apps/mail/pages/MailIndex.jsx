import { MailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { utilService } from "../../../services/util.service.js"




const { useState, useEffect, Fragment } = React
const { Link , useSearchParams } = ReactRouterDOM


export function MailIndex() {



    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(MailService.getFilterFromSearchParams(searchParams))
    const [selectedMailId, setSelectedMailId] = useState(null)
    const [mailToDelete, setMailToDelete] = useState(null)





    const { folder } = searchParams

    useEffect(() => {
        const updatedFilter = { ...filterBy, folder }
        setSearchParams(utilService.cleanObject(updatedFilter))
        loadMails(updatedFilter)
    }, [filterBy, folder])


    function loadMails() {
        MailService.query(filterBy)
            .then((mails)=>{setMails(mails)} )
            .catch(err => console.log('err:', err))
    }
    function onRemoveMail(mailId) {
        MailService.remove(mailId)
            .then(() => {
                setMailToDelete(null)
                setSelectedMailId(null)
                loadMails()
            })
            .catch(err => console.log('Error removing mail:', err))
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }


    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }
    if (!mails) return <div>Loading...</div>

    return (
        <section className="mail-index">
            {selectedMailId ? (
            <MailDetails mailId={selectedMailId} onRemoveMail={onRemoveMail} />) : 
            (
            <Fragment>
                <MailFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
                <MailList mails={mails} onSelectMailId={onSelectMailId} />
            </Fragment>
            )
            }

        </section>
    ) 
}
