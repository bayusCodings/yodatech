"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var welcomeRoute = (0, _express.Router)();
welcomeRoute.get('/', function (req, res) {
  return res.status(200).json({
    success: true,
    message: 'Welcome to Yodatech api services'
  });
});
var _default = welcomeRoute;
exports["default"] = _default;