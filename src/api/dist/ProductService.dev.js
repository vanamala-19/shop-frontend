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
    }).then(function (res) {
      return res.data;
    });
  };

  var getBrands = function getBrands() {
    return axiosPrivate.get("/product/brands", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }).then(function (res) {
      return res.data;
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
    }).then(function (res) {
      return res.data;
    });
  };

  var getAllProductsByCategory = function getAllProductsByCategory() {
    var page,
        size,
        category,
        res,
        _args = arguments;
    return regeneratorRuntime.async(function getAllProductsByCategory$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 0;
            size = _args.length > 1 && _args[1] !== undefined ? _args[1] : 8;
            category = _args.length > 2 ? _args[2] : undefined;
            _context.next = 5;
            return regeneratorRuntime.awrap(axiosPrivate.get("/product/searchByCategory", {
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
            }));

          case 5:
            res = _context.sent;
            return _context.abrupt("return", res.data);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var getAllProductsByBrand = function getAllProductsByBrand(page, size, brand) {
    return axiosPrivate.get("/product/searchByBrand", {
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
    }).then(function (res) {
      return res.data;
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