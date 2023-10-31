import React, { useEffect, useState } from "react";
import ProductService from "../api/ProductService";
import Search from "./Search";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import LoadingPage from "./Loading";
import Pagination from "./Pagination";
import ThemeContext from "../context/ThemeContext";
import { useContext } from "react";
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [trigger, setTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const {
    getAllProducts,
    getAllProductsByName,
    getAllProductsByBrand,
    getAllProductsByCategory,
    getCategories,
    getBrands,
  } = ProductService();
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 0);
  const [isLast, setIsLast] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [searchType, setSearchType] = useState("");
  const [query, setQuery] = useState("");
  const [choice, setChoice] = useState("");
  const [allCategories, setAllCategories] = useState();
  const [allBrands, setAllBrands] = useState();
  const [sortBy, setSortBy] = useState();
  const [sortDir, setSortDir] = useState();

  document.title = "SHOP | HOME";
  useEffect(() => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    const getAllProduct = async () => {
      const size = 8;
      try {
        setLoading(true);
        console.log("Loading starting...");
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
        if (err?.response?.status === 401) {
          navigate("/login", { state: { from: location }, replace: true });
        }
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
        console.log("Loading stopped...");
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
    // eslint-disable-next-line
  }, [page, trigger, searchType]);

  const handleSearchTypeChange = (newSearchType) => {
    setSearchType(newSearchType);
  };
  if (loading) {
    return <LoadingPage />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      className={`${theme}-theme text-${theme} mx-auto max-w-screen-lg px-5 py-5`}>
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
        {product?.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
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
