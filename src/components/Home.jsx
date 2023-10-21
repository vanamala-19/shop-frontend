import React, { useEffect, useState } from "react";
import ProductService from "../api/ProductService";
import Search from "./Search";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingPage from "./Loading";
import Pagination from "./Pagination";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noProductsFound, setNoProductsFound] = useState(false);
  const {
    getAllProducts,
    getAllProductsByName,
    getAllProductsByBrand,
    getAllProductsByCategory,
    getCategories,
    getBrands,
  } = ProductService();
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 0);
  const [product, setProduct] = useState([]);
  const [isLast, setIsLast] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [searchType, setSearchType] = useState("");
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState("");
  const [allCategories, setAllCategories] = useState();
  const [allBrands, setAllBrands] = useState();
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState();

  useEffect(() => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    const getAllProduct = async () => {
      const size = 8;
      try {
        let response;

        if (searchType === "Name" && query) {
          response = await getAllProductsByName(
            page,
            size,
            sortBy,
            sortDir,
            query
          );
        } else if (searchType === "Category" && query) {
          response = await getAllProductsByCategory(
            page,
            size,
            sortBy,
            sortDir,
            query
          );
        } else if (searchType === "Brand" && query) {
          response = await getAllProductsByBrand(
            page,
            size,
            sortBy,
            sortDir,
            query
          );
        } else {
          response = await getAllProducts(page, size, sortBy, sortDir);
        }

        setProduct(response?.products);
        setIsLast(response?.lastPage);
        setTotalPages(response?.totalPages);
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getBrand = async () => {
      const response = await getBrands();
      setAllBrands(response);
    };

    const getCategory = async () => {
      const response = await getCategories();
      setAllCategories(response);
    };
    getBrand();
    getCategory();
    getAllProduct();
    // Set loading to false and display "No products found" message after a delay
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
      setNoProductsFound(product.length === 0);
    }, 500); // 5 seconds delay

    return () => clearTimeout(loadingTimeout);
    // eslint-disable-next-line
  }, [page, searchType, trigger, product.length]);

  const handleSearchTypeChange = (newSearchType) => {
    setSearchType(newSearchType);
  };

  return (
    <div className="mx-auto max-w-screen-lg px-5 py-5">
      <Search
        choice={choice}
        setChoice={setChoice}
        onChangeAction={() => {
          setPage(0);
          setTrigger(trigger + 1); // increment trigger to force useEffect to re-run
        }}
        setSearchType={setSearchType}
        searchType={searchType}
        setSortBy={setSortBy}
        setSortDir={setSortDir}
        query={query}
        setQuery={setQuery}
        onSearchTypeChange={handleSearchTypeChange}
        categories={allCategories}
        brands={allBrands}
        onSearch={() => {
          setPage(0);
          setSearchType("Name");
          setTrigger(trigger + 1); // increment trigger to force useEffect to re-run
        }}
      />
      <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
        {loading ? (
          <LoadingPage />
        ) : noProductsFound ? (
          <div>No products found</div>
        ) : (
          product?.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))
        )}
      </main>
      <Pagination
        setPage={setPage}
        page={page}
        isLast={isLast}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Home;
