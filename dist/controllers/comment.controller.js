"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _comment = _interopRequireDefault(require("../services/comment.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommentController =
/*#__PURE__*/
function () {
  function CommentController() {
    _classCallCheck(this, CommentController);
  }

  _createClass(CommentController, null, [{
    key: "addNewComment",
    value: function () {
      var _addNewComment = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _req$body, movieId, comment, newComment, createdComment;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, movieId = _req$body.movieId, comment = _req$body.comment;
                _context.prev = 1;
                newComment = {
                  movieId: movieId,
                  comment: comment,
                  ipAddress: req.connection.remoteAddress
                };
                _context.next = 5;
                return _comment["default"].create(newComment);

              case 5:
                createdComment = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  success: true,
                  data: createdComment
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                next(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function addNewComment(_x, _x2, _x3) {
        return _addNewComment.apply(this, arguments);
      }

      return addNewComment;
    }()
  }, {
    key: "getMovieComments",
    value: function () {
      var _getMovieComments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var movieId, movieComments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                movieId = req.params.movieId;
                _context2.prev = 1;
                _context2.next = 4;
                return _comment["default"].getCommentsByMovie(movieId);

              case 4:
                movieComments = _context2.sent;
                return _context2.abrupt("return", res.status(200).json({
                  success: true,
                  data: movieComments
                }));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                next(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getMovieComments(_x4, _x5, _x6) {
        return _getMovieComments.apply(this, arguments);
      }

      return getMovieComments;
    }()
  }]);

  return CommentController;
}();

var _default = CommentController;
exports["default"] = _default;