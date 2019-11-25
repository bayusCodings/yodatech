"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _movie = _interopRequireDefault(require("../services/movie.service"));

var _comment = _interopRequireDefault(require("../services/comment.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 *
 * @class MovieController
 */
var MovieController =
/*#__PURE__*/
function () {
  function MovieController() {
    _classCallCheck(this, MovieController);
  }

  _createClass(MovieController, null, [{
    key: "getAllMovies",

    /**
     * Get list of all movies
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status, list of movies
     * @memberof MovieController
     */
    value: function () {
      var _getAllMovies = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var movieList, movies;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _movie["default"].getAllMovies();

              case 3:
                movieList = _context.sent;
                movies = _movie["default"].sortByReleseDate(movieList.results);
                return _context.abrupt("return", res.status(200).json({
                  success: true,
                  message: "ok",
                  data: movies
                }));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAllMovies(_x, _x2, _x3) {
        return _getAllMovies.apply(this, arguments);
      }

      return getAllMovies;
    }()
    /**
     * Get list of characters for a movie
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status, list of characters for a movie
     * @memberof MovieController
     */

  }, {
    key: "getMovieCharacters",
    value: function () {
      var _getMovieCharacters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var id, _req$query, sort, order, gender, idExist, data, movieCharacters, characters, sortedCharacters, characterList, filteredCharacters;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _req$query = req.query, sort = _req$query.sort, order = _req$query.order, gender = _req$query.gender;
                _context2.next = 4;
                return _movie["default"].getMoviebyId(id);

              case 4:
                idExist = _context2.sent;

                if (idExist) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", res.status(422).json({
                  success: false,
                  message: "parameter id is non-existent"
                }));

              case 7:
                _context2.prev = 7;
                data = {};
                _context2.next = 11;
                return _movie["default"].getMovieCharacters(id);

              case 11:
                movieCharacters = _context2.sent;
                data.result = movieCharacters;

                if (typeof sort !== 'undefined') {
                  characters = _movie["default"].sortCharacters(movieCharacters, sort, order);
                  sortedCharacters = _movie["default"].addMetaData(characters);
                  data.count = sortedCharacters.length;
                  data.result = sortedCharacters;
                }

                if (typeof gender !== 'undefined') {
                  characterList = _movie["default"].filterByGender(movieCharacters, gender);
                  filteredCharacters = _movie["default"].addMetaData(characterList);
                  data.count = filteredCharacters.length;
                  data.result = filteredCharacters;
                }

                return _context2.abrupt("return", res.status(200).json({
                  success: true,
                  message: "ok",
                  data: data.result,
                  count: data.count
                }));

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](7);
                next(_context2.t0);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[7, 18]]);
      }));

      function getMovieCharacters(_x4, _x5, _x6) {
        return _getMovieCharacters.apply(this, arguments);
      }

      return getMovieCharacters;
    }()
    /**
     * Get list of all comments for a movie
     *
     * @static
     * @param {object} req express request object
     * @param {object} res express response object
     * @param {object} next next middleware
     * @returns {json} json object with status, list of movie comments
     * @memberof MovieController
     */

  }, {
    key: "getMovieComments",
    value: function () {
      var _getMovieComments = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var id, idExist, movieComments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = req.params.id;
                _context3.prev = 1;
                _context3.next = 4;
                return _movie["default"].getMoviebyId(id);

              case 4:
                idExist = _context3.sent;

                if (idExist) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(422).json({
                  success: false,
                  message: "parameter id is non-existent"
                }));

              case 7:
                _context3.next = 9;
                return _comment["default"].getCommentsByMovie(id);

              case 9:
                movieComments = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  success: true,
                  message: "ok",
                  data: movieComments
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](1);
                next(_context3.t0);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 13]]);
      }));

      function getMovieComments(_x7, _x8, _x9) {
        return _getMovieComments.apply(this, arguments);
      }

      return getMovieComments;
    }()
  }]);

  return MovieController;
}();

var _default = MovieController;
exports["default"] = _default;