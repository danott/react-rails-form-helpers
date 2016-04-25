"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var buildInputName = exports.buildInputName = function buildInputName(namespaces, name) {
  if (!namespaces || namespaces.length === 0) {
    return name;
  }

  var allTheFields = [].concat(_toConsumableArray(namespaces), [name]);
  var finalName = allTheFields.unshift();

  while (allTheFields.length > 0) {
    finalName = finalName + "[" + allTheFields.unshift() + "]";
  }

  return finalName;
};

var nameWithContext = exports.nameWithContext = function nameWithContext(Lower) {
  var prop = arguments.length <= 1 || arguments[1] === undefined ? "name" : arguments[1];

  return function (props, context) {
    var replacedProp = buildInputName(context.railsFormNamespaces, props[prop]);
    var replacedProps = Object.assign({}, props, _defineProperty({}, prop, replacedProp));
    return React.createElement(Lower, replacedProps);
  };
};