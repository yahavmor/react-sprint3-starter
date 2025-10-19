import { MailService } from '../services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { AppHeader } from '../../../cmps/AppHeader.jsx';
import { showSuccessMsg , showErrorMsg } from '../../../services/event-bus.service.js'



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
				showSuccessMsg('Mail sent!')
			})
			.catch((err) => {
				console.log('Error sending mail:', err);
				showErrorMsg('Mail did not sent')
			})
	}
	function loadMails(filter = filterBy) {
	MailService.query(filter)
		.then((mails) => {
			const filteredMails = MailService.filter(mails, filter)
			const sortedMails =  MailService.sort(filteredMails)
			setMails(sortedMails)
			setMailToDelete(null)
		})
		.catch((err) => {
			console.log('Error loading mails:', err)
			showErrorMsg('Mails did not load')
		})
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
	function onToggleStar(mailId) {
	MailService.get(mailId)
		.then(mail => {
			mail.isStarred = !mail.isStarred
			return MailService.save(mail).then(() => {
			showSuccessMsg(mail.isStarred ? 'Mail has been starred!' : 'Mail has been unstarred successfully!')
			})
		})
		.then(() => loadMails(filterBy))
		.catch(err => {
			console.log('Error toggling star:', err)
			showErrorMsg('Could not update starred status')
		})
	}

	function onRemoveMail(mailId) {
		MailService.get(mailId)
			.then((mail) => {
				mail.status = 'trash';
				showSuccessMsg('Mail removed to trash!')
				return MailService.save(mail);
			})
			.then(() => {
				setMailToDelete(null);
				loadMails(filterBy);
			})
			.catch((err) => {
				console.log('Error removing mail:', err);
				showErrorMsg('Mail did not removed!')
			})	}

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
				onToggleStar={onToggleStar}
			/>
				<Outlet context={{ onSendMail }} />
			</section>
		</section>
	);
}

