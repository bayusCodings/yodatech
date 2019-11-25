"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _models = require("../database/models");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 *
 * @class CommentService
 */
var CommentService =
/*#__PURE__*/
function () {
  function CommentService() {
    _classCallCheck(this, CommentService);
  }

  _createClass(CommentService, null, [{
    key: "create",

    /**
     * create new comment
     *
     * @static
     * @param {object} comment comment data(movieId, comment, ipAddress)
     * @returns {object} newly created comment
     * @memberof CommentService
     */
    value: function create(comment) {
      return _models.Comment.create(comment);
    }
    /**
     * get all comments by movie id
     *
     * @static
     * @param {number} movieId movie id
     * @returns {Array} list of movie comments
     * @memberof CommentService
     */

  }, {
    key: "getCommentsByMovie",
    value: function getCommentsByMovie(movieId) {
      return _models.Comment.findAll({
        where: {
          movieId: movieId
        },
        order: [['id', 'DESC']]
      });
    }
    /**
     * counts all comments by movie id
     *
     * @static
     * @param {number} movieId movie id
     * @returns {number} total count of comment for a movie
     * @memberof CommentService
     */

  }, {
    key: "getMovieCommentCount",
    value: function getMovieCommentCount(movieId) {
      return _models.Comment.count({
        where: {
          movieId: movieId
        }
      });
    }
  }]);

  return CommentService;
}();

var _default = CommentService;
exports["default"] = _default;