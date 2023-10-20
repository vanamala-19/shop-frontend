"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useAxiosPrivate = _interopRequireDefault(require("../Hooks/useAxiosPrivate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ProductService = function ProductService() {
  var axiosPrivate = (0, _useAxiosPrivate["default"])();

  var getAllProducts = function getAllProducts(page, size) {
    return axiosPrivate.get("/product/", {
      params: {
        pageNo: page,
        pageSize: size
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  var getProductById = function getProductById(id) {
    return axiosPrivate.get("/product/".concat(id), {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }).then(function (res) {
      return res.data;
    });
  };

  var getCategories = function getCategories() {
    return axiosPrivate.get("/product/categories", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  var getBrands = function getBrands() {
    return axiosPrivate.get("/product/brands", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  var getAllProductsByName = function getAllProductsByName(page, size, query) {
    return axiosPrivate.get("/product/searchByName", {
      params: {
        pageNo: page,
        pageSize: size,
        name: query
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  var getAllProductsByCategory = function getAllProductsByCategory(page, size, category) {
    return axiosPrivate.get("/product/searchBybrand", {
      params: {
        pageNo: page,
        pageSize: size,
        category: category
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  var getAllProductsByBrand = function getAllProductsByBrand(page, size, brand) {
    return axiosPrivate.get("/product/searchByCategory", {
      params: {
        pageNo: page,
        pageSize: size,
        brand: brand
      }
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  };

  return {
    getBrands: getBrands,
    getAllProductsByName: getAllProductsByName,
    getAllProductsByCategory: getAllProductsByCategory,
    getAllProductsByBrand: getAllProductsByBrand,
    getCategories: getCategories,
    getAllProducts: getAllProducts,
    getProductById: getProductById
  };
};

var _default = ProductService;
exports["default"] = _default;