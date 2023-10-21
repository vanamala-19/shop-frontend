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

  const getAllProductsByCategory = (page, size, sortBy, sortDir, category) => {
    console.log(page);
    const res = axiosPrivate.get(
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

  const getAllProductsByBrand = (page, size, sortBy, sortDir, brand) => {
    return axiosPrivate
      .get(
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
      )
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
  };
};

export default ProductService;
