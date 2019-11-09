"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validate = _interopRequireDefault(require("validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolveValidation = function resolveValidation(res, next, body, constraint) {
  _validate["default"].async(body, constraint).then(function () {
    next();
  }, function (errors) {
    if (errors instanceof Error) next(errors);else {
      if (!res.headersSent) {
        res.status(400).json({
          status: false,
          message: 'Validation Error',
          data: errors
        });
      }
    }
  });
};

var _default = {
  resolveValidation: resolveValidation
};
exports["default"] = _default;