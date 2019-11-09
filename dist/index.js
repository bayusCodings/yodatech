"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.server = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _expressWinston = _interopRequireDefault(require("express-winston"));

var _winston = _interopRequireDefault(require("winston"));

var _morgan = _interopRequireDefault(require("morgan"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

var isProduction = process.env.NODE_ENV === 'production';
var app = (0, _express["default"])();
var corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
app.use((0, _cors["default"])(corsOptions)); // compression and header security middleware

app.use((0, _compression["default"])());
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _expressValidator["default"])());
app.use(_expressWinston["default"].logger({
  transports: [new _winston["default"].transports.Console()],
  meta: false,
  expressFormat: true,
  colorize: true,
  format: _winston["default"].format.combine(_winston["default"].format.colorize(), _winston["default"].format.simple())
})); // Swagger UI Configuration

app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); // application routes

app.use(_routes["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new Error('Resource does not exist');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use(function (err, req, res, next) {
    (0, _fancyLog["default"])(err.stack);
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        error: err
      },
      status: false
    });
  });
} // eslint-disable-next-line no-unused-vars


app.use(function (err, req, res, next) {
  // eslint-disable-line no-unused-vars
  return res.status(err.status || 500).json({
    error: {
      message: err.message,
      error: {}
    },
    status: false
  });
}); // configure port and listen for requests

var port = parseInt(process.env.NODE_ENV === 'test' ? 8378 : process.env.PORT, 10) || 80;
var server = app.listen(port, function () {
  (0, _fancyLog["default"])("Server is running on http://localhost:".concat(port, " "));
});
exports.server = server;
var _default = app;
exports["default"] = _default;