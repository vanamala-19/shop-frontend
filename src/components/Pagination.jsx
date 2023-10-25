import React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Pagination = ({ setPage, page, isLast, totalPages }) => {
  const previous = () => setPage((prev) => prev - 1);
  const next = () => setPage((prev) => prev + 1);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4">
        <button
          onClick={() => setPage(0)}
          disabled={page === 0}
          className={`disabled:invisible flex items-center justify-center px-2 sm:px-4 h-8 text-xs sm:text-sm font-medium  border btn-${theme}`}>
          First Page
        </button>
        <button
          onClick={previous}
          disabled={page === 0}
          className={`disabled:invisible flex items-center justify-center px-2 sm:px-4 h-8 text-xs sm:text-sm font-medium  border btn-${theme}`}>
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
          className={`disabled:invisible  flex items-center justify-center px-2 sm:px-4 h-8 text-xs sm:text-sm font-medium  border btn-${theme}`}>
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
          onClick={() => setPage(totalPages - 1)}
          disabled={isLast}
          className={`disabled:invisible flex items-center justify-center px-2 sm:px-4 h-8 text-xs sm:text-sm font-medium  border btn-${theme}`}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
