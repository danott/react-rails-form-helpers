(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRailsFormHelpers"] = factory(require("react"));
	else
		root["ReactRailsFormHelpers"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _forms = __webpack_require__(1);

	Object.keys(_forms).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _forms[key];
	    }
	  });
	});

	var _fields = __webpack_require__(4);

	Object.keys(_fields).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _fields[key];
	    }
	  });
	});

	var _tags = __webpack_require__(3);

	Object.keys(_tags).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _tags[key];
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FieldsFor = exports.FormFor = exports.FormTag = undefined;

	var _react = __webpack_require__(2);

	var _tags = __webpack_require__(3);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var CheckboxTag = exports.CheckboxTag = function CheckboxTag(props) {
	  return React.createElement("input", _extends({ type: "checkbox" }, props));
	};

	var ColorFieldTag = exports.ColorFieldTag = function ColorFieldTag(props) {
	  return React.createElement("input", _extends({ type: "color" }, props));
	};

	var DateFieldTag = exports.DateFieldTag = function DateFieldTag(props) {
	  return React.createElement("input", _extends({ type: "date" }, props));
	};

	var DatetimeFieldTag = exports.DatetimeFieldTag = function DatetimeFieldTag(props) {
	  return React.createElement("input", _extends({ type: "datetime" }, props));
	};

	var DatetimeLocalFieldTag = exports.DatetimeLocalFieldTag = function DatetimeLocalFieldTag(props) {
	  return React.createElement("input", _extends({ type: "datetime-local" }, props));
	};

	var EmailFieldTag = exports.EmailFieldTag = function EmailFieldTag(props) {
	  return React.createElement("input", _extends({ type: "email" }, props));
	};

	var HiddenFieldTag = exports.HiddenFieldTag = function HiddenFieldTag(props) {
	  return React.createElement("input", _extends({ type: "hidden", readOnly: true }, props));
	};

	var LabelTag = exports.LabelTag = function LabelTag(props) {
	  return React.createElement("label", props);
	};

	var MonthFieldTag = exports.MonthFieldTag = function MonthFieldTag(props) {
	  return React.createElement("input", _extends({ type: "month" }, props));
	};

	var NumberFieldTag = exports.NumberFieldTag = function NumberFieldTag(props) {
	  return React.createElement("input", _extends({ type: "number" }, props));
	};

	var PasswordFieldTag = exports.PasswordFieldTag = function PasswordFieldTag(props) {
	  return React.createElement("input", _extends({ type: "password" }, props));
	};

	var RadioTag = exports.RadioTag = function RadioTag(props) {
	  return React.createElement("input", _extends({ type: "radio" }, props));
	};

	var RangeFieldTag = exports.RangeFieldTag = function RangeFieldTag(props) {
	  return React.createElement("input", _extends({ type: "range" }, props));
	};

	var SearchFieldTag = exports.SearchFieldTag = function SearchFieldTag(props) {
	  return React.createElement("input", _extends({ type: "search" }, props));
	};

	var SelectTag = exports.SelectTag = function SelectTag(props) {
	  return React.createElement(
	    "select",
	    props,
	    props.children
	  );
	};

	var SubmitTag = exports.SubmitTag = function SubmitTag(props) {
	  return React.createElement("input", _extends({ type: "submit" }, props));
	};

	var TelephoneFieldTag = exports.TelephoneFieldTag = function TelephoneFieldTag(props) {
	  return React.createElement("input", _extends({ type: "tel" }, props));
	};

	var TextAreaTag = exports.TextAreaTag = function TextAreaTag(props) {
	  return React.createElement("textarea", props);
	};

	var TextFieldTag = exports.TextFieldTag = function TextFieldTag(props) {
	  return React.createElement("input", _extends({ type: "text" }, props));
	};

	var TimeFieldTag = exports.TimeFieldTag = function TimeFieldTag(props) {
	  return React.createElement("input", _extends({ type: "time" }, props));
	};

	var UrlFieldTag = exports.UrlFieldTag = function UrlFieldTag(props) {
	  return React.createElement("input", _extends({ type: "url" }, props));
	};

	var WeekFieldTag = exports.WeekFieldTag = function WeekFieldTag(props) {
	  return React.createElement("input", _extends({ type: "week" }, props));
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.WeekField = exports.UrlField = exports.TimeField = exports.TextField = exports.TextArea = exports.TelephoneField = exports.Submit = exports.Select = exports.SearchField = exports.RangeField = exports.Radio = exports.PasswordField = exports.NumberField = exports.MonthField = exports.Label = exports.HiddenField = exports.EmailField = exports.DatetimeLocalField = exports.DatetimeField = exports.DateField = exports.ColorField = exports.Checkbox = undefined;

	var _tags = __webpack_require__(3);

	var Tags = _interopRequireWildcard(_tags);

	var _utils = __webpack_require__(5);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var Checkbox = exports.Checkbox = (0, _utils.nameWithContext)(Tags.CheckboxTag);
	var ColorField = exports.ColorField = (0, _utils.nameWithContext)(Tags.ColorFieldTag);
	var DateField = exports.DateField = (0, _utils.nameWithContext)(Tags.DateFieldTag);
	var DatetimeField = exports.DatetimeField = (0, _utils.nameWithContext)(Tags.DatetimeFieldTag);
	var DatetimeLocalField = exports.DatetimeLocalField = (0, _utils.nameWithContext)(Tags.DatetimeLocalFieldTag);
	var EmailField = exports.EmailField = (0, _utils.nameWithContext)(Tags.EmailFieldTag);
	var HiddenField = exports.HiddenField = (0, _utils.nameWithContext)(Tags.TextFieldTag);
	var Label = exports.Label = (0, _utils.nameWithContext)(Tags.LabelTag, "htmlFor");
	var MonthField = exports.MonthField = (0, _utils.nameWithContext)(Tags.MonthFieldTag);
	var NumberField = exports.NumberField = (0, _utils.nameWithContext)(Tags.NumberFieldTag);
	var PasswordField = exports.PasswordField = (0, _utils.nameWithContext)(Tags.PasswordFieldTag);
	var Radio = exports.Radio = (0, _utils.nameWithContext)(Tags.RadioTag);
	var RangeField = exports.RangeField = (0, _utils.nameWithContext)(Tags.RangeFieldTag);
	var SearchField = exports.SearchField = (0, _utils.nameWithContext)(Tags.SearchFieldTag);
	var Select = exports.Select = (0, _utils.nameWithContext)(Tags.SelectTag);
	var Submit = exports.Submit = (0, _utils.nameWithContext)(Tags.SubmitTag);
	var TelephoneField = exports.TelephoneField = (0, _utils.nameWithContext)(Tags.TelephoneFieldTag);
	var TextArea = exports.TextArea = (0, _utils.nameWithContext)(Tags.TextAreaTag);
	var TextField = exports.TextField = (0, _utils.nameWithContext)(Tags.TextFieldTag);
	var TimeField = exports.TimeField = (0, _utils.nameWithContext)(Tags.TimeFieldTag);
	var UrlField = exports.UrlField = (0, _utils.nameWithContext)(Tags.UrlFieldTag);
	var WeekField = exports.WeekField = (0, _utils.nameWithContext)(Tags.WeekFieldTag);

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;