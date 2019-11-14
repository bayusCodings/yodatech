"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _keys = require("../config/keys");

var _comment = _interopRequireDefault(require("./comment.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          regeneratorRuntime.mark(function _callee2(body, response, resolveWithFullResponse) {
            var list;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return Promise.all(body.results.map(
                    /*#__PURE__*/
                    function () {
                      var _ref = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee(item) {
                        var url, extractedId, commentCount;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                url = item.url;
                                extractedId = url[url.length - 2];
                                _context.next = 4;
                                return _comment["default"].getMovieCommentCount(extractedId);

                              case 4:
                                commentCount = _context.sent;
                                return _context.abrupt("return", {
                                  id: extractedId,
                                  title: item.title,
                                  opening_crawl: item.opening_crawl,
                                  release_date: item.release_date,
                                  commentCount: commentCount
                                });

                              case 6:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      return function (_x4) {
                        return _ref.apply(this, arguments);
                      };
                    }()));

                  case 2:
                    list = _context2.sent;
                    return _context2.abrupt("return", {
                      results: list
                    });

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
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
    key: "getMoviebyId",
    value: function () {
      var _getMoviebyId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var options;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = {
                  method: 'GET',
                  json: true,
                  uri: _keys.BASE_URL + '/films/' + id
                };
                _context3.prev = 1;
                _context3.next = 4;
                return (0, _requestPromiseNative["default"])(options);

              case 4:
                return _context3.abrupt("return", true);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", false);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 7]]);
      }));

      function getMoviebyId(_x5) {
        return _getMoviebyId.apply(this, arguments);
      }

      return getMoviebyId;
    }()
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
    value: function sortCharacters(data, sortBy, order) {
      if (typeof order === 'undefined') order = 'asc';

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
    key: "sortByReleseDate",
    value: function sortByReleseDate(data) {
      return data.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }
  }, {
    key: "filterByGender",
    value: function filterByGender(data, filter) {
      return data.filter(function (datum) {
        return datum.gender == filter;
      });
    }
  }, {
    key: "addMetaData",
    value: function addMetaData(data) {
      var _this = this;

      var characters = data.map(function (item) {
        return _objectSpread({}, item, {
          metadata: {
            totalHeight: {
              cm: item.height,
              feet: _this.centimeterToFoot(item.height),
              inches: _this.centimeterToInch(item.height)
            }
          }
        });
      });
      return characters;
    }
  }, {
    key: "centimeterToFoot",
    value: function centimeterToFoot(heightIncm) {
      var result = heightIncm / 30.48;
      return result.toFixed(2);
    }
  }, {
    key: "centimeterToInch",
    value: function centimeterToInch(heightIncm) {
      var result = heightIncm / 2.54;
      return result.toFixed(2);
    }
  }]);

  return MovieService;
}();

var _default = MovieService;
exports["default"] = _default;