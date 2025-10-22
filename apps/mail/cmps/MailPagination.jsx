export function MailPagination({ mailsPerPage, totalMails, paginate, currentPage }) {
    const totalPages = Math.max(1, Math.ceil(totalMails / mailsPerPage))
    function goPrevJump() {
        const target = Math.max(1, currentPage - 1)
        if (target !== currentPage) paginate(target)
    }
    function goNextJump() {
        const target = Math.min(totalPages, currentPage + 1)
        if (target !== currentPage) paginate(target)
    }
    return (
        <nav>
            <ul className="pagination">
            <li className={currentPage === 1 ? 'disabled' : ''}>
                <button onClick={goPrevJump} title="Newer" className="arrow-left" disabled={currentPage === 1}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                </li>

                <li className={currentPage === totalPages ? 'disabled' : ''}>
                <button onClick={goNextJump} title="Older" className="arrow-right" disabled={currentPage === totalPages}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </li>

            </ul>
        </nav>
    )
}