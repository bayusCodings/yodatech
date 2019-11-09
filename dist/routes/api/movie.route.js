"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _movie = _interopRequireDefault(require("../../controllers/movie.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/movies', _movie["default"].getAllMovies);
router.get('/movie/:id/characters', _movie["default"].getMovieCharacters);
var _default = router;
exports["default"] = _default;