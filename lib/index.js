"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forms = require("./forms");

Object.keys(_forms).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _forms[key];
    }
  });
});

var _fields = require("./fields");

Object.keys(_fields).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _fields[key];
    }
  });
});

var _tags = require("./tags");

Object.keys(_tags).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tags[key];
    }
  });
});