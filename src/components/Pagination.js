import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Pagination(props) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalBooks / props.limitPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/*for small screens*/}
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={()=>props.onPreviousPageClick()}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={()=>props.onNextPageClick()}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(props.currentPage * props.limitPerPage)- (props.limitPerPage-1)}</span> to <span className="font-medium">{props.currentPage * props.limitPerPage}</span> of{' '}
                        <span className="font-medium">{props.totalBooks}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={()=>props.onPreviousPageClick()}
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {
                            pageNumbers.map((number,i)=>(
                                <button
                                    key={i}
                                    onClick={()=>props.paginate(number)}
                                    className={`relative z-10 inline-flex items-center border ${props.currentPage === number ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white' } hover:border-indigo-500 hover:bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20`}
                                >
                                    {number}
                                </button>
                            ))
                        }
                        <button
                            onClick={()=>props.onNextPageClick()}
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
