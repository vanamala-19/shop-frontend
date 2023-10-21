import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const ProductService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllProducts = (page, size) => {
    return axiosPrivate
      .get(
        "/product/",
        { params: { pageNo: page, pageSize: size } },
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

  const getAllProductsByName = (page, size, query) => {
    return axiosPrivate
      .get(
        "/product/searchByName",
        { params: { pageNo: page, pageSize: size, name: query } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => res.data);
  };

  const getAllProductsByCategory = async (page = 0, size = 8, category) => {
    const res = await axiosPrivate.get(
      "/product/searchByCategory",
      { params: { pageNo: page, pageSize: size, category: category } },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return res.data;
  };

  const getAllProductsByBrand = (page, size, brand) => {
    return axiosPrivate
      .get(
        "/product/searchByBrand",
        { params: { pageNo: page, pageSize: size, brand: brand } },
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
