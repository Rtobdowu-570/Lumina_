"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal =
/*#__PURE__*/
function () {
  function Modal(options) {
    _classCallCheck(this, Modal);

    this.title = options.title || "Confirm";
    this.message = options.message || "Are you sure?";
    this.confirmText = options.confirmText || "Confirm";
    this.cancelText = options.cancelText || "Cancel";

    this.onConfirm = options.onConfirm || function () {};

    this.onCancel = options.onCancel || function () {};
  }

  _createClass(Modal, [{
    key: "show",
    value: function show() {
      var _this = this;

      var modal = document.createElement("div");
      modal.className = "modal-overlay";
      modal.innerHTML = "\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h3>".concat(this.title, "</h3>\n          <button class=\"modal-close\" data-action=\"close\">\xD7</button>\n        </div>\n        <div class=\"modal-body\">\n          <p>").concat(this.message, "</p>\n        </div>\n        <div class=\"modal-footer\">\n          <button class=\"modal-btn cancel-btn\" data-action=\"cancel\">").concat(this.cancelText, "</button>\n          <button class=\"modal-btn confirm-btn\" data-action=\"confirm\">").concat(this.confirmText, "</button>\n        </div>\n      </div>\n    ");
      document.body.appendChild(modal);
      setTimeout(function () {
        return modal.classList.add("show");
      }, 10);
      modal.addEventListener("click", function (e) {
        var action = e.target.dataset.action;

        if (action === "confirm") {
          _this.onConfirm();

          _this.hide(modal);
        } else if (action === "cancel" || action === "close") {
          _this.onCancel();

          _this.hide(modal);
        } else if (e.target === modal) {
          _this.hide(modal);
        }
      });
    }
  }, {
    key: "onConfirm",
    value: function onConfirm() {
      var _this2 = this;

      var element = document.querySelector("[data-id=\"".concat(this.id, "\"]"));
      element.classList.add("removing");
      setTimeout(function () {
        element.remove();

        _this2.updateCart();
      }, 300);
    }
  }, {
    key: "onCancel",
    value: function onCancel(modal) {
      this.hide(modal);
    }
  }, {
    key: "hide",
    value: function hide(modal) {
      modal.classList.remove("show");
      setTimeout(function () {
        return modal.remove();
      }, 300);
    }
  }], [{
    key: "show",
    value: function show(options) {
      var modal = new Modal(options);
      modal.show();
    }
  }]);

  return Modal;
}();

exports.Modal = Modal;
//# sourceMappingURL=modal.dev.js.map
