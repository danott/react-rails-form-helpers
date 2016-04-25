"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsFor = exports.FormFor = exports.FormTag = undefined;

var _react = require("react");

var _tags = require("./tags");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var FormTag = exports.FormTag = (0, _react.createClass)({
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

    return React.createElement(
      "form",
      { "accept-charset": "UTF-8", action: this.props.url, method: browserHTTPMethod },
      fakedHTTPMethod && React.createElement(_tags.HiddenFieldTag, { name: "_method", value: fakedHTTPMethod }),
      React.createElement(_tags.HiddenFieldTag, { name: "utf8", value: "✓" }),
      this.props.children
    );
  }
});

var FormFor = exports.FormFor = (0, _react.createClass)({
  propTypes: {
    namespace: _react.PropTypes.string.isRequired
  },

  childContextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  getChildContext: function getChildContext() {
    return {
      railsFormNamespaces: [this.props.namespace]
    };
  },
  render: function render() {
    return React.createElement(
      FormTag,
      this.props,
      this.props.children
    );
  }
});

var FieldsFor = exports.FieldsFor = (0, _react.createClass)({
  propTypes: {
    namespace: _react.PropTypes.string.isRequired,
    index: _react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.number])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      index: ""
    };
  },


  contextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  childContextTypes: {
    railsFormNamespaces: _react.PropTypes.arrayOf(_react.PropTypes.string)
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var namespace = _props.namespace;
    var index = _props.index;


    return {
      railsFormNamespaces: [].concat(_toConsumableArray(this.context.railsFormNamespaces), [namespace, index])
    };
  }
});