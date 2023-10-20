import React, { useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({ toggle, options, selectedOption, onSelectOption }) => {
  if (!toggle) {
    return null;
  }
  return (
    <div
      className="origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => onSelectOption(option)}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
            role="menuitem">
            {option} {selectedOption === option && <BiCheck />}
          </div>
        ))}
      </div>
    </div>
  );
};

const Search2 = ({
  query,
  onQueryChange,
  searchType,
  onSearchTypeChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  let [toggleSort, setToggleSort] = useState(false);
  let [toggleFilter, setToggleFilter] = useState(false);

  const searchOptions = ["Name", "Brand", "Category"];
  const filterOptions = [
    "Brand1",
    "Brand2",
    "Category1",
    "Category2",
    "Price Range1",
    "Price Range2",
  ];
  const sortOptions = [
    "Price Asc",
    "Price Desc",
    "custName",
    "custEmail",
    "custAddress",
  ];

  return (
    <div className="py-5">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex h-6 items-center pointer-events-none">
          <BiSearch />
          <label htmlFor="query" className="sr-only" />
        </div>
        <input
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder={`Search by ${searchType}`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="mr-2">
            <button
              type="button"
              onClick={() => {
                setToggleFilter(!toggleFilter);
              }}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="filter-menu"
              aria-haspopup="true"
              aria-expanded="true">
              Filter <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleFilter}
              options={filterOptions}
              selectedOption={searchType}
              onSelectOption={onSearchTypeChange}
            />
          </div>
          <div className="">
            <button
              type="button"
              onClick={() => {
                setToggleSort(!toggleSort);
              }}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true">
              Sort By <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              toggle={toggleSort}
              options={sortOptions}
              selectedOption={sortBy}
              onSelectOption={onSortByChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search2;
