const { useState, useEffect } = React
const { Link } = ReactRouterDOM


export function MailFilter({defaultFilter , onSetFilterBy}){
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

        useEffect(() => {
            onSetFilterBy(filterByToEdit)
        }, [filterByToEdit])

        function handleChange({ target }) {
            const field = target.name
            let value = target.value

            switch (target.type) {
                case 'number':
                case 'range':
                    value = +value
                    break;

                case 'checkbox':
                    value = target.checked
                break
            }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    const { status, txt , isRead } = filterByToEdit

return (
        <section className="mail-filter-container">
            <form onSubmit={onSubmitFilter}>
                    <input onChange={handleChange} value={txt} name="txt" type="text" placeholder="Search in Email" />
            </form>
        </section>
    )
}
