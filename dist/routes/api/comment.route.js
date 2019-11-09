"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _comment = _interopRequireDefault(require("../../controllers/comment.controller"));

var _comment2 = _interopRequireDefault(require("../../validators/comment.validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/comment/new', _comment2["default"].validateComment, _comment["default"].addNewComment);
router.get('/comments/:movieId', _comment["default"].getMovieComments);
var _default = router;
exports["default"] = _default;