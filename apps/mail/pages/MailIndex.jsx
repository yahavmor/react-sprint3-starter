import { MailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { AppHeader } from '../../../cmps/AppHeader.jsx';

const { useState, useEffect, Fragment } = React;
const { Link, useSearchParams, Outlet, useNavigate } = ReactRouterDOM;

export function MailIndex() {
	const [mails, setMails] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [mailToDelete, setMailToDelete] = useState(null);
	const navigate = useNavigate();
	const status = searchParams.get('status') || 'inbox';
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const txt = searchParams.get('txt') || '';
	const [filterBy, setFilterBy] = useState({ status, txt });

	useEffect(() => {
		const status = searchParams.get('status') || 'inbox';
		const txt = searchParams.get('txt') || '';
		const updatedFilter = { status, txt };
		setFilterBy(updatedFilter);
		loadMails(updatedFilter);
	}, [searchParams]);

	useEffect(() => {
		function handleToggleMenu() {
			setIsMenuOpen((prev) => !prev);
		}

		window.addEventListener('toggleMenu', handleToggleMenu);
		return () => window.removeEventListener('toggleMenu', handleToggleMenu);
	}, []);

	function onSendMail(newMail) {
		const mailToSave = { ...newMail, status: 'sent' };

		MailService.send(mailToSave)
			.then(() => {
				loadMails();
				navigate('/mail');
			})
			.catch((err) => console.log('Error sending mail:', err));
	}

	function loadMails(filter = filterBy) {
		MailService.query(filter)
			.then((mails) => {
				if (filter.txt) {
					const txt = filter.txt.toLowerCase();
					mails = mails.filter(
						(mail) =>
							mail.subject.toLowerCase().includes(txt) ||
							mail.body.toLowerCase().includes(txt) ||
							mail.from.toLowerCase().includes(txt)
					);
				}

            // 👇 מיון לפי תאריך שליחה מהחדש לישן
            mails.sort((a, b) => b.sentAt - a.sentAt)

            setMails(mails)
            setMailToDelete(null)
        })
        .catch(err => console.log('Error loading mails:', err))
    }

	function onIsREAD(mailId) {
		MailService.get(mailId).then((mail) => {
			mail.isRead = 'true';
			return MailService.save(mail);
		});
	}
	function toggleMenu() {
		setIsMenuOpen((prev) => !prev);
	}

	function onRemoveMail(mailId) {
		MailService.get(mailId)
			.then((mail) => {
				if (!mail) throw new Error('Mail not found');
				mail.status = 'trash';
				return MailService.save(mail);
			})

			.then(() => {
				setMailToDelete(null);
				loadMails(filterBy);
			})
			.catch((err) => console.log('Error moving mail to trash:', err));
	}

	function onSetFilterBy(newFilterBy) {
		setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilterBy }));
	}

	if (!mails) return <div>Loading...</div>;

	return (
		<section className="mail-index-layout">
			<MailFolderList isOpen={isMenuOpen} />
			<section className="mail-index">
				<MailList
					mails={mails}
					onRemoveMail={onRemoveMail}
					onIsREAD={onIsREAD}
				/>
				<Outlet context={{ onSendMail }} />
			</section>
		</section>
	);
}
