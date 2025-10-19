const { useNavigate, NavLink, useLocation, useSearchParams } = ReactRouterDOM;
const { Fragment } = React;

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const isMailRoute = location.pathname.startsWith('/mail')

	function goHome() {
		if (isMailRoute) {
			navigate('/mail');
		} else if (isNoteRoute) {
			navigate('/note');
		}
	}

	function toggleMenu() {
		const toggleEvent = new CustomEvent('toggleMenu');
		window.dispatchEvent(toggleEvent);
	}

    function onFilterChange(txt) {
        const updatedParams = new URLSearchParams(searchParams)
        updatedParams.set('txt', txt)
        setSearchParams(updatedParams)

        const filterEvent = new CustomEvent('setMailFilter', {
            detail: { txt }
        })
        window.dispatchEvent(filterEvent)
    }

	return (
		<header className="app-header">
			<div className="left-section">
				{isMailRoute && (
					<Fragment>
						<button className="menu-toggle" onClick={toggleMenu}>
							<i className="fa-solid fa-bars"></i>
						</button>
						<button className="logo" onClick={goHome}>
							<img
								src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
								alt="Gmail Logo"
							/>
							<span className="logo-text">Gmail</span>
						</button>
					</Fragment>
				)}

				{isNoteRoute && (
					<Fragment>
						<button className="menu-toggle" onClick={toggleMenu}>
							<i className="fa-solid fa-bars"></i>
						</button>

						<button className="logo" onClick={goHome}>
							<img
								src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png"
								alt="Keep Logo"
							/>
							<span className="logo-text">KeepNote</span>
						</button>
					</Fragment>
				)}

				{isMailRoute && (
					<section className="mail-filter-container">
						<form onSubmit={(ev) => ev.preventDefault()}>
							<input
								type="text"
								name="txt"
								placeholder="Search mail"
								onChange={(ev) => onFilterChange(ev.target.value)}
							/>
							<i className="fa-solid fa-magnifying-glass search-icon"></i>
						</form>
					</section>
				)}

				{isNoteRoute && (
					<section className="mail-filter-container">
						<form onSubmit={(ev) => ev.preventDefault()}>
							<input
								type="text"
								name="txt"
								placeholder="Search note"
								onChange={(ev) => onFilterChange(ev.target.value)}
							/>
							<i className="fa-solid fa-magnifying-glass search-icon"></i>
						</form>
					</section>
				)}
			</div>

			<nav className="right-section">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/mail">Mail</NavLink>
				<NavLink to="/note">Note</NavLink>
			</nav>
		</header>
	);
}
