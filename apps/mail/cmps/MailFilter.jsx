const { useState, useEffect } = React

export function MailFilter({ defaultFilter, onSetFilterBy }) {
const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter || { txt: '', status: 'inbox' })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt = '' } = filterByToEdit

    return (
        <section className="mail-filter-container">
            <form onSubmit={onSubmitFilter}>
                <input
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={handleChange}
                    placeholder="Search in Email"
                />
            </form>
        </section>
    )
}
