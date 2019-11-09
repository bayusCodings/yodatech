"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _movie = _interopRequireDefault(require("../services/movie.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovieController =
/*#__PURE__*/
function () {
  function MovieController() {
    _classCallCheck(this, MovieController);
  }

  _createClass(MovieController, null, [{
    key: "getAllMovies",
    value: function () {
      var _getAllMovies = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var movieList;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _movie["default"].getAllMovies();

              case 3:
                movieList = _context.sent;
                return _context.abrupt("return", res.status(200).json({
                  success: true,
                  data: movieList.results
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getAllMovies(_x, _x2, _x3) {
        return _getAllMovies.apply(this, arguments);
      }

      return getAllMovies;
    }()
  }, {
    key: "getMovieCharacters",
    value: function () {
      var _getMovieCharacters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var data, id, _req$query, sort, filter, movieCharacters, sortedCharacters, totalHeight, filteredCharacters, _totalHeight;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = {};
                id = req.params.id;
                _req$query = req.query, sort = _req$query.sort, filter = _req$query.filter;
                _context2.prev = 3;
                _context2.next = 6;
                return _movie["default"].getMovieCharacters(id);

              case 6:
                movieCharacters = _context2.sent;
                data.result = movieCharacters;

                if (typeof sort !== 'undefined') {
                  sortedCharacters = _movie["default"].sortCharacters(movieCharacters, sort);
                  totalHeight = _movie["default"].getTotalHeight(sortedCharacters);
                  data.result = sortedCharacters;
                  data.metadata = {
                    count: sortedCharacters.length,
                    height: {
                      cm: totalHeight,
                      feet: _movie["default"].centimeterToFoot(totalHeight),
                      inches: _movie["default"].centimeterToInch(totalHeight)
                    }
                  };
                }

                if (typeof filter !== 'undefined') {
                  filteredCharacters = _movie["default"].filterByGender(movieCharacters, filter);
                  _totalHeight = _movie["default"].getTotalHeight(filteredCharacters);
                  data.result = filteredCharacters;
                  data.metadata = {
                    count: filteredCharacters.length,
                    height: {
                      cm: _totalHeight,
                      feet: _movie["default"].centimeterToFoot(_totalHeight),
                      inches: _movie["default"].centimeterToInch(_totalHeight)
                    }
                  };
                }

                return _context2.abrupt("return", res.status(200).json({
                  success: true,
                  data: data
                }));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](3);
                next(_context2.t0);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 13]]);
      }));

      function getMovieCharacters(_x4, _x5, _x6) {
        return _getMovieCharacters.apply(this, arguments);
      }

      return getMovieCharacters;
    }()
  }]);

  return MovieController;
}();

var _default = MovieController;
exports["default"] = _default;