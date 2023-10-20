"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosPrivate = exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = "https://shop-backend-9nxw.onrender.com/"; // const BASE_URL = "http://localhost:9000/";

var _default = _axios["default"].create({
  baseURL: BASE_URL,
  withCredentials: true
});

exports["default"] = _default;

var axiosPrivate = _axios["default"].create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

exports.axiosPrivate = axiosPrivate;