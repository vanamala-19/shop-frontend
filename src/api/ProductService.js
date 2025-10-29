import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import useAuth from "../Hooks/useAuth"; // custom hook to get/set auth tokens
const ProductService = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const getAllProducts = (page, size, sortBy, sortDir) => {
    return axiosPrivate.get("/product/", {
        params: { pageNo: page, pageSize: size, sortBy, sortDir },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getProductById = (id) => {
    console.log("product by id "+id+" and lets check"); 
    return axiosPrivate.get(`/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getReviewsofProduct = (id) => {
    return axiosPrivate.get(`/review/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const addReviewsToProduct = (review) => {
    return axiosPrivate.post(`/review/add/`, review, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getCategories = () => {
    return axiosPrivate.get("/product/categories", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getBrands = () => {
    return axiosPrivate.get("/product/brands", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getAllProductsByName = (page, size, sortBy, sortDir, query) => {
    return axiosPrivate.get("/product/searchByName", {
        params: { pageNo: page, pageSize: size, name: query, sortBy, sortDir },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getAllProductsByCategory = (page, size, sortBy, sortDir, category) => {
    return axiosPrivate.get("/product/searchByCategory", {
        params: { pageNo: page, pageSize: size, category, sortBy, sortDir },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getAllProductsByBrand = (page, size, sortBy, sortDir, brand) => {
    return axiosPrivate.get("/product/searchByBrand", {
        params: { pageNo: page, pageSize: size, brand, sortBy, sortDir },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  return {
    getBrands,
    getAllProductsByName,
    getAllProductsByCategory,
    getAllProductsByBrand,
    getCategories,
    getAllProducts,
    getProductById,
    getReviewsofProduct,
    addReviewsToProduct,
  };
};

export default ProductService;
