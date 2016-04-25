"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekField = exports.UrlField = exports.TimeField = exports.TextField = exports.TextArea = exports.TelephoneField = exports.Submit = exports.Select = exports.SearchField = exports.RangeField = exports.Radio = exports.PasswordField = exports.NumberField = exports.MonthField = exports.Label = exports.HiddenField = exports.EmailField = exports.DatetimeLocalField = exports.DatetimeField = exports.DateField = exports.ColorField = exports.Checkbox = undefined;

var _tags = require("./tags");

var Tags = _interopRequireWildcard(_tags);

var _utils = require("./utils");

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