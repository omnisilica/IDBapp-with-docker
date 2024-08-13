import "../styles/Pagination.css"


interface Props<T> {
    elements: T[];
    setPage: (pageNumber: number) => void;
    maxPagination: number;
    currPage: number;
}

function CustomPagination<T>({ elements, setPage, maxPagination, currPage }: Props<T>) {

    const paginatedElements: T[][] = []
    let tempContainer: T[] = [];
    for (let i = 0; i < elements.length; i++) {
        tempContainer.push(elements[i]);
        if (tempContainer.length === maxPagination || i === elements.length - 1) {
            paginatedElements.push(tempContainer);
            tempContainer = [];
        }
    }

    return (
        <>
            {elements.length > 0 && (
                <div className="paginationBar my-3">
                    <div>
                        Showing {(currPage * maxPagination) + 1}-{Math.min((currPage * maxPagination) + maxPagination, elements.length)} of {elements.length} entries
                    </div>
                    <div>
                        {paginatedElements.length > 1 && (
                            <nav>
                                <ul className="pagination mb-0">

                                    <li className={`page-item ${currPage === 0 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => setPage(0)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-left" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className={`page-item ${currPage === 0 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => setPage(currPage - 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                                            </svg>
                                        </a>
                                    </li>

                                    {paginatedElements.map(e => {
                                        let index: number = paginatedElements.indexOf(e) + 1;
                                        let upperModifier: number = currPage === 0 ? 1 : 0;
                                        let lowerModifier: number = currPage === paginatedElements.length - 1 ? 1 : 0;
                                        if (index >= currPage - lowerModifier && index <= currPage + 2 + upperModifier) {
                                            return (
                                                <li key={index} className={`page-item ${index - 1 === currPage ? 'active' : ''}`} aria-current="page">
                                                    <a className="page-link" onClick={() => setPage(index - 1)}>{index}</a>
                                                </li>
                                            )
                                        }
                                    })}

                                    <li className={`page-item ${currPage === paginatedElements.length - 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => setPage(currPage + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li className={`page-item ${currPage === paginatedElements.length - 1 ? 'disabled' : ''}`}>
                                        <a className="page-link" onClick={() => setPage(paginatedElements.length - 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-bar-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0M11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
                                            </svg>
                                        </a>
                                    </li>

                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CustomPagination;