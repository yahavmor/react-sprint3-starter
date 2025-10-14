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
    sentAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    isRead: true,
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
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 1, // 1 day ago
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
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    isRead: false,
    isStared: true,
    status: 'draft',
    txt: 'puki',
    labels: ['marketing', 'draft']
  },
  {
    id: 'e204',
    subject: 'Invoice Payment',
    body: 'Your invoice has been paid.',
    from: 'billing@service.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    isRead: true,
    isStared: false,
    status: 'sent',
    txt: 'puki',
    labels: ['finance']
  },
  {
    id: 'e205',
    subject: 'Deleted Message',
    body: 'This message was removed.',
    from: 'noreply@system.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 1 week ago
    isRead: true,
    isStared: false,
    status: 'trash',
    txt: 'puki',
    labels: ['system']
  },
  {
    id: 'e206',
    subject: 'Birthday Wishes',
    body: 'Happy birthday! 🎉',
    from: 'friend@social.com',
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
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
    sentAt: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    isRead: true,
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
    sentAt: Date.now() - 1000 * 60 * 60 * 36, // 1.5 days ago
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
    sentAt: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    isRead: true,
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
    sentAt: Date.now() - 1000 * 60 * 10, // 10 minutes ago
    isRead: false,
    isStared: false,
    status: 'draft',
    txt: 'puki',
    labels: ['personal', 'shopping']
  }
]

_createMails()

function _createMails(){
        let mails = utilService.loadFromStorage(MAIL_KEY)
        if (!mails || !mails.length) utilService.saveToStorage(MAIL_KEY,mails_DB)
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.status) {
                mails = mails.filter(mail => mail.status === filterBy.status)
            }
            return mails
        })
}

export const MailService = {
    mails_DB ,
    query,
    getNextPrevMailId,
    get,
    getFilterFromSearchParams,
    remove
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