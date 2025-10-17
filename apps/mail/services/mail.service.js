import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = 'mailDB'

const mails_DB = [
  {
    id: 'e201',
    subject: 'Project Update',
    body: 'The project is on track for delivery.',
    from: 'manager@company.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 2, 
    isRead: false,
    isStared: true,
    status: 'inbox',
    txt: 'puki',
    labels: ['work', 'urgent']
  },
  {
    id: 'e202',
    subject: 'Vacation Request',
    body: 'Can I take next Friday off?',
    from: 'employee@company.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 1, 
    isRead: false,
    isStared: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['hr']
  },
  {
    id: 'e203',
    subject: 'Draft: New Campaign',
    body: 'Ideas for the new marketing campaign.',
    from: 'marketing@company.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 3, 
    isRead: false,
    isStared: true,
    status: 'inbox',
    txt: 'puki',
    labels: ['marketing', 'draft']
  },
  {
    id: 'e204',
    subject: 'Invoice Payment',
    body: 'Your invoice has been paid.',
    from: 'billing@service.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 5,
    isRead: false,
    isStared: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['finance']
  },
  {
    id: 'e205',
    subject: 'Deleted Message',
    body: 'This message was removed.',
    from: 'noreply@system.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 7, 
    isStared: false,
    isRead: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['system']
  },
  {
    id: 'e206',
    subject: 'Birthday Wishes',
    body: 'Happy birthday! 🎉',
    from: 'friend@social.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 30, 
    isRead: false,
    isStared: true,
    status: 'inbox',
    txt: 'puki',
    labels: ['personal']
  },
  {
    id: 'e207',
    subject: 'Weekly Newsletter',
    body: 'Here are your weekly updates.',
    from: 'newsletter@updates.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 12, 
    isRead: false,
    isStared: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['news']
  },
  {
    id: 'e208',
    subject: 'Flight Reminder',
    body: 'Your flight to Rome is tomorrow.',
    from: 'travel@agency.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 36, 
    isRead: false,
    isStared: true,
    status: 'inbox',
    txt: 'puki',
    labels: ['travel']
  },
  {
    id: 'e209',
    subject: 'System Alert',
    body: 'Unusual login detected.',
    from: 'security@service.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 72, 
    isRead: false,
    isStared: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['security']
  },
  {
    id: 'e210',
    subject: 'Draft: Shopping List',
    body: 'Milk, eggs, bread...',
    from: 'user@appsus.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 10, 
    isRead: false,
    isStared: false,
    status: 'inbox',
    txt: 'puki',
    labels: ['personal', 'shopping']
  }
]
export const MailService = {
    mails_DB ,
    query,
    getNextPrevMailId,
    get,
    getFilterFromSearchParams,
    remove,
    send,
    save
}
_createMails()

function _createMails(){
        let mails = utilService.loadFromStorage(MAIL_KEY)
        if (!mails || !mails.length) utilService.saveToStorage(MAIL_KEY,mails_DB)
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY).then(mails => {
        if (filterBy.status) {
            return mails.filter(mail => mail.status === filterBy.status)
        }
        return mails
    })
}





function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}


function getNextPrevMailId(mailId) {
    return query()
        .then(mails => {
            const mailIdx = mails.findIndex(mail => mail.id === mailId)
            const prevMail = mails[mailIdx - 1] || mails[mails.length - 1]
            const nextMail = mails[mailIdx + 1] || mails[0]
            return get(mailId).then(mail => {
                mail.prevMail = prevMail
                mail.nextMail = nextMail
                return mail
            })
        })
}
function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}
function getFilterFromSearchParams(searchParams) {
    const status = searchParams.get('status') || ''
    const text = searchParams.get('text') || ''
    const isRead = searchParams.get('isRead') || ''
    return {
        status,
        text,
        isRead
    }
}
function send(mail) {
    const newMail = {
        id: utilService.makeId(),
        from: mail.from,
        to: mail.to,
        subject: mail.subject,
        body: mail.body,
        sentAt: Date.now(),
        isRead: false,
        status: mail.status || 'sent'
    }

    return storageService.post(MAIL_KEY, newMail)
}

function save(mail) {
    return storageService.put(MAIL_KEY, mail)
}

