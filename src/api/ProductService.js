import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const ProductService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllProducts = (page, size, sortBy, sortDir) => {
    return axiosPrivate
      .get(
        "/product/",
        {
          params: {
            pageNo: page,
            pageSize: size,
            sortBy: sortBy,
            sortDir: sortDir,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => res.data);
  };

  const getProductById = (id) => {
    return axiosPrivate
      .get(`/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getReviewsofProduct = (id) => {
    return axiosPrivate
      .get(`/review/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const addReviewsToProduct = (review) => {
    return axiosPrivate
      .get(`/review/add/`, review, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getCategories = () => {
    return axiosPrivate
      .get("/product/categories", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getBrands = () => {
    return axiosPrivate
      .get("/product/brands", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => res.data);
  };

  const getAllProductsByName = (page, size, sortBy, sortDir, query) => {
    return axiosPrivate
      .get(
        "/product/searchByName",
        {
          params: {
            pageNo: page,
            pageSize: size,
            name: query,
            sortBy: sortBy,
            sortDir: sortDir,
          },
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => res.data);
  };

  const getAllProductsByCategory = async (
    page,
    size,
    sortBy,
    sortDir,
    category
  ) => {
    const res = await axiosPrivate.get(
      "/product/searchByCategory",
      {
        params: {
          pageNo: page,
          pageSize: size,
          category: category,
          sortBy: sortBy,
          sortDir: sortDir,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const getAllProductsByBrand = async (page, size, sortBy, sortDir, brand) => {
    const res = await axiosPrivate.get(
      "/product/searchByBrand",
      {
        params: {
          pageNo: page,
          pageSize: size,
          brand: brand,
          sortBy: sortBy,
          sortDir: sortDir,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
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
  };
};

export default ProductService;
