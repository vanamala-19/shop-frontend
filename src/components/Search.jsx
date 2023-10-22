import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiCaretDown } from "react-icons/bi";

const DropDown = ({
  setSortBy,
  setSortDir,
  searchType,
  setSearchType,
  query,
  choice,
  setQuery,
  toggle,
  options,
  onChangeAction,
  onSelectOption,
  children,
  setToggleMain,
}) => {
  const dropDownRef = useRef();

  useEffect(() => {
    if (toggle && dropDownRef.current) {
      dropDownRef.current.scrollTop = dropDownRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, [toggle, query, searchType]);

  if (!toggle) {
    return null;
  }
  return (
    <div
      className="z-50 origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      style={{
        height: "300px",
        overflowY: "auto",
        maxHeight: "450px",
        minHeight: "200px",
      }} // Add these styles
    >
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu">
        {options?.map((option) => (
          <div
            ref={dropDownRef}
            key={option}
            onClick={() => {
              if (choice === "sortBy") {
                if (options.indexOf(option) === 0) {
                  setSortBy("price");
                  setSortDir("asc");
                } else if (options.indexOf(option) === 1) {
                  setSortBy("price");
                  setSortDir("desc");
                } else if (options.indexOf(option) === 2) {
                  setSortBy("rating");
                  setSortDir("asc");
                } else {
                  setSortBy("rating");
                  setSortDir("desc");
                }
              } else if (choice === "Brand") {
                setQuery(option);
                setSearchType(choice);
                setToggleMain(!toggle);
              } else if (choice === "Category") {
                setQuery(option);
                setSearchType(choice);
                setToggleMain(!toggle);
              }

              onChangeAction();
              onSelectOption(option);
              setToggleMain(true);
            }}
            className="mx-0 px-0 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-center cursor-pointer "
            role="menuitem">
            {option}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

const Search = ({
  query,
  setSearchType,
  searchType,
  setQuery,
  onSearch,
  brands,
  categories,
  setChoice,
  onChangeAction,
  setSortBy,
  setSortDir,
}) => {
  let [toggleMain, setToggleMain] = useState(false);
  let [toggleBrand, setToggleBrand] = useState(false);
  let [toggleCategory, setToggleCategory] = useState(false);
  let [toggleSort, setToggleSort] = useState(false);

  const mainOptions = ["Brand", "Category", "Sort By"];

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: Low to High",
    "Rating: High to Low",
  ];

  const handleMainOptionSelect = (option) => {
    if (option === "Brand") {
      setToggleBrand(true);
      setToggleCategory(false);
      setToggleSort(false);
    } else if (option === "Category") {
      setToggleBrand(false);
      setToggleCategory(true);
      setToggleSort(false);
    } else if (option === "Sort By") {
      setToggleBrand(false);
      setToggleCategory(false);
      setToggleSort(true);
    }
  };

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
          // value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          className="my-4 pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
          placeholder="Search Products"
        />
        <button
          onClick={() => {
            onSearch();
          }}
          className="px-4 py-2 bg-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
          Search
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center my-4">
          <div className="mr-2">
            <button
              type="button"
              onClick={() => setToggleMain(!toggleMain)}
              className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center"
              id="main-menu"
              aria-haspopup="true"
              aria-expanded="true">
              Options <BiCaretDown className="ml-2" />
            </button>
            <DropDown
              setQuery={setQuery}
              setChoice={setChoice}
              setSortBy={setSortBy}
              setSortDir={setSortDir}
              setSearchType={setSearchType}
              searchType={searchType}
              choice={""}
              onChangeAction={onChangeAction}
              query={query}
              toggle={toggleMain}
              options={mainOptions}
              onSelectOption={handleMainOptionSelect}
              setToggleMain={setToggleMain}>
              <DropDown
                setQuery={setQuery}
                setChoice={setChoice}
                setSortBy={setSortBy}
                setSortDir={setSortDir}
                setSearchType={setSearchType}
                searchType={searchType}
                choice={"Brand"}
                onChangeAction={onChangeAction}
                query={query}
                toggle={toggleBrand}
                options={brands}
                onSelectOption={(brand) => {
                  setToggleBrand(false);
                }}
                setToggleMain={setToggleMain}
              />
              <DropDown
                setChoice={setChoice}
                setSortBy={setSortBy}
                setSortDir={setSortDir}
                onChangeAction={onChangeAction}
                query={query}
                setSearchType={setSearchType}
                searchType={searchType}
                toggle={toggleCategory}
                options={categories}
                choice={"Category"}
                setQuery={setQuery}
                onSelectOption={(category) => {
                  setToggleCategory(false);
                }}
                setToggleMain={setToggleMain}
              />
              <DropDown
                query={query}
                setQuery={setQuery}
                toggle={toggleSort}
                options={sortOptions}
                choice={"sortBy"}
                setSearchType={setSearchType}
                searchType={searchType}
                onChangeAction={onChangeAction}
                setSortBy={setSortBy}
                setSortDir={setSortDir}
                onSelectOption={(sortBy) => {
                  setToggleSort(false);
                }}
                setToggleMain={setToggleMain}
              />
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
