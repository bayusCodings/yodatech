"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _keys = require("../config/keys");

var _comment = _interopRequireDefault(require("./comment.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovieService =
/*#__PURE__*/
function () {
  function MovieService() {
    _classCallCheck(this, MovieService);
  }

  _createClass(MovieService, null, [{
    key: "getAllMovies",
    value: function getAllMovies() {
      var options = {
        method: 'GET',
        json: true,
        uri: _keys.BASE_URL + '/films',
        transform: function () {
          var _transform = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(body, response, resolveWithFullResponse) {
            var list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, url, extractedId, commentCount;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    list = [];
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 4;
                    _iterator = body.results[Symbol.iterator]();

                  case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context.next = 17;
                      break;
                    }

                    item = _step.value;
                    url = item.url;
                    extractedId = url[url.length - 2];
                    _context.next = 12;
                    return _comment["default"].getMovieCommentCount(extractedId);

                  case 12:
                    commentCount = _context.sent;
                    list.push({
                      id: extractedId,
                      title: item.title,
                      opening_crawl: item.opening_crawl,
                      commentCount: commentCount
                    });

                  case 14:
                    _iteratorNormalCompletion = true;
                    _context.next = 6;
                    break;

                  case 17:
                    _context.next = 23;
                    break;

                  case 19:
                    _context.prev = 19;
                    _context.t0 = _context["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                  case 23:
                    _context.prev = 23;
                    _context.prev = 24;

                    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                      _iterator["return"]();
                    }

                  case 26:
                    _context.prev = 26;

                    if (!_didIteratorError) {
                      _context.next = 29;
                      break;
                    }

                    throw _iteratorError;

                  case 29:
                    return _context.finish(26);

                  case 30:
                    return _context.finish(23);

                  case 31:
                    return _context.abrupt("return", {
                      results: list
                    });

                  case 32:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[4, 19, 23, 31], [24,, 26, 30]]);
          }));

          function transform(_x, _x2, _x3) {
            return _transform.apply(this, arguments);
          }

          return transform;
        }()
      };
      return (0, _requestPromiseNative["default"])(options);
    }
  }, {
    key: "getMovieCharacters",
    value: function getMovieCharacters(id) {
      var options = {
        method: 'GET',
        json: true,
        uri: _keys.BASE_URL + '/films/' + id,
        transform: function transform(body, response, resolveWithFullResponse) {
          var allRequests = body.characters.map(function (uri) {
            return (0, _requestPromiseNative["default"])({
              method: 'GET',
              json: true,
              uri: uri
            }).then();
          });
          return Promise.all(allRequests);
        }
      };
      return (0, _requestPromiseNative["default"])(options);
    }
  }, {
    key: "sortCharacters",
    value: function sortCharacters(data, sort) {
      var _sort$split = sort.split(' '),
          _sort$split2 = _slicedToArray(_sort$split, 2),
          sortBy = _sort$split2[0],
          order = _sort$split2[1];

      if (sortBy != 'height') {
        if (order == 'asc') return data.sort(function (a, b) {
          return a[sortBy] < b[sortBy] ? -1 : b[sortBy] < a[sortBy] ? 1 : 0;
        });
        return data.sort(function (a, b) {
          return a[sortBy] < b[sortBy] ? 1 : b[sortBy] < a[sortBy] ? -1 : 0;
        });
      } else {
        if (order == 'asc') return data.sort(function (a, b) {
          return parseInt(a[sortBy]) < parseInt(b[sortBy]) ? -1 : parseInt(b[sortBy]) < parseInt(a[sortBy]) ? 1 : 0;
        });
        return data.sort(function (a, b) {
          return parseInt(a[sortBy]) < parseInt(b[sortBy]) ? 1 : parseInt(b[sortBy]) < parseInt(a[sortBy]) ? -1 : 0;
        });
      }
    }
  }, {
    key: "filterByGender",
    value: function filterByGender(data, filter) {
      return data.filter(function (datum) {
        return datum.gender == filter;
      });
    }
  }, {
    key: "getTotalHeight",
    value: function getTotalHeight(data) {
      var total = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var datum = _step2.value;
          total = total + parseInt(datum.height);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return total;
    }
  }, {
    key: "centimeterToFoot",
    value: function centimeterToFoot(heightIncm) {
      return heightIncm / 30.48;
    }
  }, {
    key: "centimeterToInch",
    value: function centimeterToInch(heightIncm) {
      return heightIncm / 2.54;
    }
  }]);

  return MovieService;
}();

var _default = MovieService;
exports["default"] = _default;