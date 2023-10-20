import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const ProductService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllProducts = (page, size) => {
    return axiosPrivate.get(
      "/product/",
      { params: { pageNo: page, pageSize: size } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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
    return axiosPrivate.get("/product/categories", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  const getBrands = () => {
    return axiosPrivate.get("/product/brands", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  };

  const getAllProductsByName = (page, size, query) => {
    return axiosPrivate.get(
      "/product/searchByName",
      { params: { pageNo: page, pageSize: size, name: query } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };

  const getAllProductsByCategory = (page, size, category) => {
    return axiosPrivate.get(
      "/product/searchBybrand",
      { params: { pageNo: page, pageSize: size, category: category } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  };

  const getAllProductsByBrand = (page, size, brand) => {
    return axiosPrivate.get(
      "/product/searchByCategory",
      { params: { pageNo: page, pageSize: size, brand: brand } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
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
