import { MailFilter } from "../apps/mail/cmps/MailFilter.jsx"
import '@fortawesome/fontawesome-free/css/all.min.css'

const { NavLink, useNavigate, useLocation } = ReactRouterDOM

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()

    const isMailRoute = location.pathname.startsWith('/mail')

    function goHome() {
        navigate('/mail')
    }

    return (
        <header className="app-header">
            <div className="left-section">
                <button className="logo" onClick={goHome}>
                    <i className="fa-regular fa-envelope"></i>
                </button>

                {isMailRoute && (
                    <button className="menu-toggle" onClick={() => {
                        const toggleEvent = new CustomEvent('toggleMenu')
                        window.dispatchEvent(toggleEvent)
                    }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
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
