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
                <div>
                    <label>Status</label>
                    <input onChange={handleChange} value={status} name="status" type="text" />
                </div>
                <div>
                    <label>Text</label>
                    <input onChange={handleChange} value={txt} name="txt" type="text" />
                </div>
                <div>
                    <label>Read</label>
                    <input onChange={handleChange} checked={isRead} name="isRead" type="checkbox" />
                </div>
                <button>Submit</button>
            </form>
        </section>
    )
}