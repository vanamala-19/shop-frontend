import React from "react";

const Pagination = ({ setPage, page, isLast, totalPages }) => {
  const previous = () => setPage((prev) => prev - 1);
  const next = () => setPage((prev) => prev + 1);
  const current = (n) => setPage(n);
  return (
    <div className="flex items-center justify-center">
      {/* <!-- Previous Button --> */}
      <button
        onClick={() => current(0)}
        disabled={page === 0}
        className="flex disabled:invisible items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        First Page
      </button>
      <button
        onClick={previous}
        disabled={page === 0}
        className="flex disabled:invisible items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <svg
          className="w-3.5 h-3.5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </button>
      <button
        onClick={next}
        disabled={isLast}
        className="flex disabled:invisible items-center justify-center px-3 h-8 text-sm font-medium text-gray-500  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      <button
        onClick={() => current(totalPages - 1)}
        disabled={isLast}
        className="mx-2 flex disabled:invisible items-center justify-center px-3 h-8 text-sm font-medium text-gray-500  border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
