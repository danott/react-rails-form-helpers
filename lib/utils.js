"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whitelistProps = exports.nameWithContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nameWithContext = exports.nameWithContext = function nameWithContext(Lower) {
  var prop = arguments.length <= 1 || arguments[1] === undefined ? "name" : arguments[1];

  var getDisplayName = function getDisplayName(Lower) {
    return (Lower.displayName || Lower.name).replace(/Tag$/, "");
  };

  var buildInputName = function buildInputName(namespaces) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
    return [].concat(_toConsumableArray(namespaces), [name]).map(function (field, index) {
      return index === 0 ? field : "[" + field + "]";
    }).join("");
  };

  var higher = function higher(props, context) {
    var replacedProp = buildInputName(context.railsFormNamespaces, props[prop]);
    var replacedProps = Object.assign({}, props, _defineProperty({}, prop, replacedProp));
    return _react2.default.createElement(Lower, replacedProps);
  };

  higher.displayName = getDisplayName(Lower);
  higher.contextTypes = { railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string) };

  return higher;
};

var whitelistProps = exports.whitelistProps = function whitelistProps(props) {
  for (var _len = arguments.length, omit = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    omit[_key - 1] = arguments[_key];
  }

  var alwaysOmit = ["key", "ref"].concat(omit);
  var cloned = _extends({}, props);
  alwaysOmit.forEach(function (key) {
    return delete cloned[key];
  });
  return cloned;
};