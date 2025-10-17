import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const MAIL_KEY = 'mailDB'

const mails_DB = Array.from({ length: 30 }, (_, idx) => {
  const id = `e${300 + idx + 1}`
  const subjects = [
    'Meeting Summary', 'Invoice Reminder', 'Draft: Blog Post', 'Team Outing', 'Security Notice',
    'Birthday Invitation', 'Weekly Report', 'Flight Confirmation', 'System Update', 'Shopping Reminder',
    'New Feature Launch', 'Draft: Resume', 'Holiday Schedule', 'Password Reset', 'Marketing Strategy',
    'Draft: Budget Plan', 'Event RSVP', 'Newsletter Subscription', 'Draft: Menu Ideas', 'Performance Review',
    'Draft: App Design', 'Travel Itinerary', 'Draft: Email Template', 'Project Kickoff', 'Draft: Survey Questions',
    'Maintenance Alert', 'Draft: Presentation Slides', 'Feedback Request', 'Draft: Contract Terms', 'Welcome Message'
  ]
  const bodies = [
    'Please find the summary attached.', 'Your invoice is due tomorrow.', 'Ideas for the upcoming blog post.',
    'Let’s plan a team outing next week.', 'Suspicious activity detected on your account.',
    'Join us for a birthday celebration!', 'Here’s the weekly performance report.', 'Your flight is confirmed.',
    'System will be updated tonight.', 'Don’t forget to buy groceries.',
    'We’re launching a new feature!', 'Attached is my updated resume.', 'Holiday schedule is finalized.',
    'Click here to reset your password.', 'Strategy for Q4 marketing.', 'Budget plan draft attached.',
    'Please RSVP to the event.', 'You’re subscribed to our newsletter.', 'Menu ideas for the party.',
    'Your performance review is ready.', 'Initial design draft attached.', 'Your travel itinerary is below.',
    'Template for outreach emails.', 'Kickoff meeting scheduled.', 'Survey draft attached.',
    'Scheduled maintenance this weekend.', 'Presentation slides draft.', 'We’d love your feedback.',
    'Contract terms draft enclosed.', 'Welcome to our platform!'
  ]
  const senders = [
    'manager@company.com', 'billing@service.com', 'marketing@company.com', 'hr@company.com',
    'security@system.com', 'friend@social.com', 'teamlead@company.com', 'travel@agency.com',
    'noreply@system.com', 'user@appsus.com'
  ]
  const labelsPool = [
    ['work'], ['urgent'], ['personal'], ['marketing'], ['draft'], ['finance'], ['hr'],
    ['system'], ['travel'], ['security'], ['shopping'], ['news'], ['event']
  ]

  return {
    id,
    subject: subjects[idx],
    body: bodies[idx],
    from: senders[idx % senders.length],
    to: 'user@appsus.com',
    sentAt: Date.now() - 1000 * 60 * 60 * (idx + 1),
    isRead: idx % 3 === 0,
    isStared: idx % 2 === 0,
    status: 'inbox',
    txt: 'puki',
    labels: labelsPool[idx % labelsPool.length]
  }
})

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

