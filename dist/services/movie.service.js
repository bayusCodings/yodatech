"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _keys = require("../config/keys");

var _comment = _interopRequireDefault(require("./comment.service"));

var _http = _interopRequireDefault(require("./http.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 *
 *
 * @class MovieService
 */
var MovieService =
/*#__PURE__*/
function () {
  function MovieService() {
    _classCallCheck(this, MovieService);
  }

  _createClass(MovieService, null, [{
    key: "getAllMovies",

    /**
     * Get list of all movies
     *
     * @static
     * @returns {Array} list of all movies
     * @memberof MovieService
     */
    value: function getAllMovies() {
      var payload = {};

      var transform =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
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
                    var _ref2 = _asyncToGenerator(
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
                                openingCrawl: item.opening_crawl,
                                releaseDate: item.release_date,
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
                      return _ref2.apply(this, arguments);
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

        return function transform(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }();

      payload.uri = _keys.BASE_URL + '/films';
      payload.transform = transform;
      return _http["default"].get(payload);
    }
    /**
     * Get movie by id
     *
     * @static
     * @param {number} id movie id
     * @returns {object} movie data
     * @memberof MovieService
     */

  }, {
    key: "getMoviebyId",
    value: function () {
      var _getMoviebyId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var payload;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                payload = {
                  uri: _keys.BASE_URL + '/films/' + id
                };
                _context3.prev = 1;
                _context3.next = 4;
                return _http["default"].get(payload);

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
    /**
     * Get character list for a movie
     *
     * @static
     * @param {number} id movie id
     * @returns {Array} list of movie characters
     * @memberof MovieService
     */

  }, {
    key: "getMovieCharacters",
    value: function () {
      var _getMovieCharacters = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var payload, transform, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                payload = {};

                transform = function transform(body, response, resolveWithFullResponse) {
                  var allRequests = body.characters.map(function (uri) {
                    return (// call endpoint to get character
                      _http["default"].get({
                        uri: uri
                      }).then()
                    );
                  });
                  return Promise.all(allRequests);
                };

                payload.uri = _keys.BASE_URL + '/films/' + id;
                payload.transform = transform;
                _context4.next = 6;
                return _http["default"].get(payload);

              case 6:
                data = _context4.sent;
                return _context4.abrupt("return", this.toCamelCase(data));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMovieCharacters(_x6) {
        return _getMovieCharacters.apply(this, arguments);
      }

      return getMovieCharacters;
    }()
    /**
     * sort character list
     *
     * @static
     * @param {Array} data list of un-sorted characters
     * @param {string} sortBy field to sort by
     * @param {string} order chronological order
     * @returns {Array} list of sorted characters
     * @memberof MovieService
     */

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
    /**
     * sort movies by release date
     *
     * @static
     * @param {Array} data list of un-sorted movies
     * @returns {Array} list of sorted movies
     * @memberof MovieService
     */

  }, {
    key: "sortByReleseDate",
    value: function sortByReleseDate(data) {
      return data.sort(function (a, b) {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
    }
    /**
     * filter characters by gender
     *
     * @static
     * @param {Array} data list of un-filtered characters
     * @param {string} gender gender to filter by
     * @returns {Array} list of sorted movies
     * @memberof MovieService
     */

  }, {
    key: "filterByGender",
    value: function filterByGender(data, gender) {
      return data.filter(function (datum) {
        return datum.gender == gender;
      });
    }
    /**
     * add meta data to character list
     *
     * @static
     * @param {Array} data list of characters
     * @returns {Array} list of characters with meta data
     * @memberof MovieService
     */

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
    /**
     * convert centimeter to foot
     *
     * @static
     * @param {number} heightIncm centimeter height
     * @returns {string} converted value
     * @memberof MovieService
     */

  }, {
    key: "centimeterToFoot",
    value: function centimeterToFoot(heightIncm) {
      var result = heightIncm / 30.48;
      return result.toFixed(2);
    }
    /**
     * convert centimeter to inch
     *
     * @static
     * @param {number} heightIncm centimeter height
     * @returns {string} converted value
     * @memberof MovieService
     */

  }, {
    key: "centimeterToInch",
    value: function centimeterToInch(heightIncm) {
      var result = heightIncm / 2.54;
      return result.toFixed(2);
    }
    /**
     * parse to camel case
     *
     * @static
     * @param {Array} data parse data fields to camel case
     * @returns {Array} parsed data
     * @memberof MovieService
     */

  }, {
    key: "toCamelCase",
    value: function () {
      var _toCamelCase = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(data) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Promise.all(data.map(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5(item) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            return _context5.abrupt("return", {
                              name: item.name,
                              height: item.height,
                              mass: item.mass,
                              hairColor: item.hair_color,
                              skinColor: item.skin_color,
                              eyeColor: item.eye_color,
                              birthYear: item.birth_year,
                              gender: item.gender,
                              homeWorld: item.homeworld,
                              films: item.films,
                              species: item.species,
                              vehicles: item.vehicles,
                              starships: item.starships,
                              created: item.created,
                              edited: item.edited,
                              ur: item.url
                            });

                          case 1:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x8) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function toCamelCase(_x7) {
        return _toCamelCase.apply(this, arguments);
      }

      return toCamelCase;
    }()
  }]);

  return MovieService;
}();

var _default = MovieService;
exports["default"] = _default;