import { useMemo } from 'react';
import './Pagination.scss';

const DOTS = '...';

const range = (start: number, end: number) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = (props: { onChange: any; totalPageCount: any; siblingCount?: 1 | undefined; currentPage: any; pageSize: any; }) => {
    const {
        currentPage,
        totalPageCount,
        pageSize,
        onChange,
        siblingCount = 1
    } = props;

    const pageList = useMemo(() => {
        // Number at which dots will be shown, siblingCount + (currentPage + firstPage + lastPage + 2*DOTS)
        const totalNumOfItemsShown = siblingCount + 5;

        // Return no dots if total pages is less then totalNumOfItemsShown
        if (totalNumOfItemsShown >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // Determine if dots should be shown
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPageCount - 2;

        if (!showLeftDots && showRightDots) {
            let leftItemCount = (2 * siblingCount) + 3;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, DOTS, totalPageCount];
        } else if (showLeftDots && !showRightDots) {
            let rightItemCount = (2 * siblingCount) + 3;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [1, DOTS, ...rightRange];
        } else if (showLeftDots && showRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [1, DOTS, ...middleRange, DOTS, totalPageCount];
        } else {
            return [1];
        }
    }, [currentPage, totalPageCount, pageSize, siblingCount]);

    console.log("Pagination Range: ", pageList);
    return (
        <ul className='pagination-ul'>
            <li className={(currentPage === 1) ? 'pagination-li disabled' : 'pagination-li'} onClick={() => onChange(currentPage - 1)}>
                &lt;
            </li>
            {pageList.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-li dots">&#8230;</li>;
                }
                return (
                    <li className={(currentPage === pageNumber) ? 'pagination-li selected' : 'pagination-li'} onClick={() => onChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}
            <li className={(currentPage === pageList[pageList.length - 1]) ? 'pagination-li disabled' : 'pagination-li'} onClick={() => onChange(currentPage + 1)}>
                &gt;
            </li>
        </ul>
    );
};

export default Pagination;