import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


const MAIL_KEY = 'mailDB'

const mails_DB = [
  {
    id: 'e102',
    createdAt: 1551134930500,
    subject: 'Meeting Reminder',
    body: 'Don’t forget our meeting tomorrow at 10am.',
    isRead: true,
    sentAt: 1551134930594,
    removedAt: null,
    from: 'alice@work.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e103',
    createdAt: 1551135930500,
    subject: 'Party Invitation',
    body: 'You’re invited to my birthday party this Saturday!',
    isRead: false,
    sentAt: 1551135930594,
    removedAt: null,
    from: 'bob@friends.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e104',
    createdAt: 1551136930500,
    subject: 'Newsletter - March',
    body: 'Check out our latest updates and offers.',
    isRead: true,
    sentAt: 1551136930594,
    removedAt: null,
    from: 'news@company.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e105',
    createdAt: 1551137930500,
    subject: 'Flight Confirmation',
    body: 'Your flight to Paris has been confirmed.',
    isRead: false,
    sentAt: 1551137930594,
    removedAt: null,
    from: 'travel@agency.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e106',
    createdAt: 1551138930500,
    subject: 'Job Opportunity',
    body: 'We have a new position that matches your profile.',
    isRead: false,
    sentAt: 1551138930594,
    removedAt: null,
    from: 'hr@company.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e107',
    createdAt: 1551139930500,
    subject: 'Recipe of the Week',
    body: 'Try this delicious lasagna recipe!',
    isRead: true,
    sentAt: 1551139930594,
    removedAt: null,
    from: 'chef@cooking.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e108',
    createdAt: 1551140930500,
    subject: 'Security Alert',
    body: 'New login detected from unknown device.',
    isRead: true,
    sentAt: 1551140930594,
    removedAt: null,
    from: 'security@service.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e109',
    createdAt: 1551141930500,
    subject: 'Weekend Plans?',
    body: 'Want to go hiking this weekend?',
    isRead: false,
    sentAt: 1551141930594,
    removedAt: null,
    from: 'tom@friends.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e110',
    createdAt: 1551142930500,
    subject: 'Invoice #4567',
    body: 'Your invoice for March is attached.',
    isRead: true,
    sentAt: 1551142930594,
    removedAt: null,
    from: 'billing@service.com',
    to: 'user@appsus.com'
  },
  {
    id: 'e111',
    createdAt: 1551143930500,
    subject: 'Let’s catch up!',
    body: 'Been a while—coffee next week?',
    isRead: false,
    sentAt: 1551143930594,
    removedAt: null,
    from: 'lisa@oldfriends.com',
    to: 'user@appsus.com'
  }
]

_createMails()

function _createMails(){
        let mails = utilService.loadFromStorage(MAIL_KEY)
        if (!mails || !mails.length) utilService.saveToStorage(MAIL_KEY,mails_DB)
}





function query(filterBy = {}) {
    // return storageService.query(MAIL_DB)
    //     .then(mails => {
    //         if (filterBy.title) {
    //             const regex = new RegExp(filterBy.title, 'i')
    //             books = books.filter(book => regex.test(book.title))
    //         }
    //         if (filterBy.listPrice) {
    //              books = books.filter(book => book.listPrice.amount >= filterBy.listPrice)
    //         }
    //         if (filterBy.pageCount) {
    //              books = books.filter(book => book.pageCount >= filterBy.pageCount)
    //         }
    //         if (filterBy.isOnSale) {
    //              books = books.filter(book => book.listPrice.isOnSale === true)
    //         }
    //         return books
    //     })
        return storageService.query(MAIL_KEY)
}
export const MailService = {
    mails_DB ,
    query
}
