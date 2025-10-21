import '@fortawesome/fontawesome-free/css/all.min.css'

const { useNavigate } = ReactRouterDOM
const { Link, useSearchParams } = ReactRouterDOM

export function MailLabelFilter({ isOpen, mails }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const currentLabel = searchParams.get('label') 

    function getLinkLabel(label) {
        return label === currentLabel ? 'active-label' : ''
    }


    return (
        <section className='labels-list'>
                <nav>
                    <Link to="/mail?label=primary" className={getLinkLabel('primary')}>
                        <div className="label-wrapper">
                            <span className="label-txt">Primary</span>
                        </div>
                    </Link>
                    <Link to="/mail?label=promotions" className={getLinkLabel('promotions')}>
                        <div className="label-wrapper">
                            <span className="label-txt">Promotions</span>
                        </div>
                    </Link>
                    <Link to="/mail?label=social" className={getLinkLabel('social')}>
                        <div className="label-wrapper">
                            <span className="label-txt">Social</span>
                        </div>
                    </Link> 
                </nav>
        </section>
    )
}
