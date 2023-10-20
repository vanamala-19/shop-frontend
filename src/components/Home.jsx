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
  const [searchType, setSearchType] = useState();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [allCategories, setAllCategories] = useState();
  const [allBrands, setAllBrands] = useState();

  useEffect(() => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    const getAllProduct = async () => {
      const size = 8;
      try {
        let response;

        if (searchType === "Name" && query) {
          response = await getAllProductsByName(page, size, query);
        } else if (searchType === "Category" && category) {
          response = await getAllProductsByCategory(page, size, category);
        } else if (searchType === "Brand" && brand) {
          response = await getAllProductsByBrand(page, size, brand);
        } else {
          response = await getAllProducts(page, size);
        }

        setProduct(response.data.products);
        setIsLast(response.data.lastPage);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const getBrands = async () => {
      const response = await getBrands();
      console.log("brands are : " + response);
    };

    const getCategories = async () => {
      const response = await getCategories();
      console.log("categories are : " + response);
    };
    getAllProduct();
    // eslint-disable-next-line
  }, [page, searchType]);

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
        category={category}
        onCategoryChange={setCategory}
        brand={brand}
        onBrandChange={setBrand}
      />
      <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
        {product.length > 0 ? (
          product.map((product, i) => <ProductCard key={i} product={product} />)
        ) : (
          <LoadingPage />
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
