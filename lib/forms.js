"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashFields = exports.ArrayFields = exports.FieldsFor = exports.FormFor = exports.FormTag = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tags = require("./tags");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var FormTag = exports.FormTag = _react2.default.createClass({
  displayName: "FormTag",

  propTypes: {
    url: _react.PropTypes.string.isRequired,
    method: _react.PropTypes.oneOf(["get", "post", "put", "patch", "delete"]),
    children: _react.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      method: "post"
    };
  },
  render: function render() {
    var browserHTTPMethod = "post";
    var fakedHTTPMethod = null;

    if (this.props.method === "get") {
      browserHTTPMethod = "get";
    } else if (this.props.method !== "post") {
      fakedHTTPMethod = this.props.method;
    }

    var csrfToken = document.querySelector("head meta[name='csrf-token']");

    return _react2.default.createElement(
      "form",
      _extends({}, (0, _utils.whitelistProps)(this.props, "url", "children"), {
        acceptCharset: "UTF-8",
        action: this.props.url,
        method: browserHTTPMethod
      }),
      fakedHTTPMethod && _react2.default.createElement(_tags.HiddenFieldTag, {
        name: "_method",
        value: fakedHTTPMethod
      }),
      csrfToken && _react2.default.createElement(_tags.HiddenFieldTag, {
        name: "authenticity_token",
        value: csrfToken.content
      }),
      _react2.default.createElement(_tags.HiddenFieldTag, {
        name: "utf8",
        value: "✓"
      }),
      this.props.children
    );
  }
});

var FormFor = exports.FormFor = _react2.default.createClass({
  displayName: "FormFor",

  propTypes: {
    name: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      name: ""
    };
  },


  childContextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  getChildContext: function getChildContext() {
    return {
      railsFormNamespaces: [this.props.name]
    };
  },
  render: function render() {
    return _react2.default.createElement(
      FormTag,
      this.props,
      this.props.children
    );
  }
});

var FieldsFor = exports.FieldsFor = _react2.default.createClass({
  displayName: "FieldsFor",

  propTypes: {
    name: _react.PropTypes.string.isRequired
  },

  contextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  childContextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  getChildContext: function getChildContext() {
    return {
      railsFormNamespaces: [].concat(_toConsumableArray(this.context.railsFormNamespaces), [this.props.name])
    };
  },
  render: function render() {
    return _react2.default.createElement(
      "span",
      null,
      this.props.children
    );
  }
});

var ArrayFields = exports.ArrayFields = FieldsFor;
var HashFields = exports.HashFields = FieldsFor;