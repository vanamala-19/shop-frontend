import React, { useEffect, useState } from "react";
import ProductService from "../api/ProductService";
import Search1 from "./Search1";
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
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [allCategories, setAllCategories] = useState();
  const [allBrands, setAllBrands] = useState();
  const [sortBy, setSortBy] = useState();

  useEffect(() => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    const getAllProduct = async () => {
      const size = 8;
      try {
        let response;

        if (searchType === "Name" && query) {
          console.log(query);
          response = await getAllProductsByName(page, size, query);
        } else if (searchType === "Category" && category) {
          response = await getAllProductsByCategory(page, size, category);
        } else if (searchType === "Brand" && brand) {
          response = await getAllProductsByBrand(page, size, brand);
        } else {
          response = await getAllProducts(page, size);
        }

        setProduct(response?.products);
        console.log(response?.products);
        setIsLast(response?.data?.lastPage);
        setTotalPages(response?.data?.totalPages);
      } catch (err) {
        console.error(err);
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
      <Search1
        query={query}
        onQueryChange={setQuery}
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
        selectedCategory={category}
        categories={allCategories}
        onSelectCategory={setCategory} // updated prop name
        selectedBrand={brand}
        brands={allBrands}
        onSelectBrand={setBrand} // updated prop name
        sortBy={sortBy}
        onSortByChange={setSortBy}
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
