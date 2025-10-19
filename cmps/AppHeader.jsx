const { useNavigate, NavLink, useLocation, useSearchParams } = ReactRouterDOM

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const isMailRoute = location.pathname.startsWith('/mail')
    const isNoteRoute = location.pathname.startsWith('/note')


    function goHome() {
        navigate('/mail')
    }

    function toggleMenu() {
        const toggleEvent = new CustomEvent('toggleMenu')
        window.dispatchEvent(toggleEvent)
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
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                )}
                <button className="logo" onClick={goHome}>
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail Logo" />
                    <span className="logo-text">Gmail</span>
                </button>

                {isMailRoute && (
                    <section className="mail-filter-container">
                        <form onSubmit={ev => ev.preventDefault()}>
                            <input
                                type="text"
                                name="txt"
                                placeholder="Search mail"
                                onChange={ev => onFilterChange(ev.target.value)}
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
    )
}
