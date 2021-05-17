"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _react = _interopRequireDefault(require("react"));

function Button() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "hsbc-button"
  }, "click", /*#__PURE__*/_react.default.createElement("img", {
    src: require('./images/mail.png')
  }));
}