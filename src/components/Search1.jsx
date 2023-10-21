import React, { useState } from "react";
import { BiSearch, BiCaretDown, BiCheck } from "react-icons/bi";

const DropDown = ({
  toggle,
  options,
  selectedOption,
  onSelectOption,
  children,
  setToggleMain,
}) => {
  if (!toggle) {
    return null;
  }
  return (
    <div
      className="z-50 origin-top-right absolute right-0 mt-2 w-56
      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      style={{ maxHeight: "200px", overflowY: "auto" }} // Add these styles
    >
      <div
        className="py-1 "
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              onSelectOption(option);
              setToggleMain(true);
            }}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-center cursor-pointer h-14"
            role="menuitem">
            {option} {selectedOption === option && <BiCheck />}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

const Search1 = ({
  query,
  onQueryChange,
  brands,
  selectedBrand,
  onSelectBrand,
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortByChange,
  onSearch,
}) => {
  let [toggleMain, setToggleMain] = useState(false);
  let [toggleBrand, setToggleBrand] = useState(false);
  let [toggleCategory, setToggleCategory] = useState(false);
  let [toggleSort, setToggleSort] = useState(false);

  const mainOptions = ["Brand", "Category", "Sort By"];

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: High to Low",
    "Rating: Low to High",
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
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          placeholder="Search Products"
        />
        <button
          onClick={() => onSearch()}
          className="px-4 py-2 bg-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
          Search
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center">
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
              toggle={toggleMain}
              options={mainOptions}
              selectedOption={""}
              onSelectOption={handleMainOptionSelect}
              setToggleMain={setToggleMain}>
              <DropDown
                toggle={toggleBrand}
                options={brands}
                selectedOption={selectedBrand}
                onSelectOption={(brand) => {
                  onSelectBrand(brand);
                  setToggleBrand(false);
                }}
                setToggleMain={setToggleMain}
              />
              <DropDown
                toggle={toggleCategory}
                options={categories}
                selectedOption={selectedCategory}
                onSelectOption={(category) => {
                  onSelectCategory(category);
                  setToggleCategory(false);
                }}
                setToggleMain={setToggleMain}
              />
              <DropDown
                toggle={toggleSort}
                options={sortOptions}
                selectedOption={sortBy}
                onSelectOption={(sortBy) => {
                  onSortByChange(sortBy);
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

export default Search1;
