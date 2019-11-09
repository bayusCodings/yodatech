"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _welcome = _interopRequireDefault(require("./welcome.route"));

var _movie = _interopRequireDefault(require("./movie.route"));

var _comment = _interopRequireDefault(require("./comment.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express.Router)();
routes.use('/', _welcome["default"]);
routes.use('/', _movie["default"]);
routes.use('/', _comment["default"]);
var _default = routes;
exports["default"] = _default;