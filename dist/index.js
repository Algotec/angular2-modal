/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./framework/fluent-assign'));
var createComponent_1 = require('./framework/createComponent');
exports.createComponent = createComponent_1.createComponent;
var utils_1 = require('./framework/utils');
exports.extend = utils_1.extend;
exports.arrayUnion = utils_1.arrayUnion;
exports.supportsKey = utils_1.supportsKey;
var dialog_ref_1 = require('./models/dialog-ref');
exports.DialogRef = dialog_ref_1.DialogRef;
var tokens_1 = require('./models/tokens');
exports.DROP_IN_TYPE = tokens_1.DROP_IN_TYPE;
exports.ModalDropInFactory = tokens_1.ModalDropInFactory;
exports.ModalBackdropComponent = tokens_1.ModalBackdropComponent;
exports.ModalCompileConfig = tokens_1.ModalCompileConfig;
exports.ModalRenderer = tokens_1.ModalRenderer;
var index_1 = require('./providers/index');
exports.Modal = index_1.Modal;
exports.DOMModalRenderer = index_1.DOMModalRenderer;
var modal_context_1 = require('./models/modal-context');
exports.DEFAULT_VALUES = modal_context_1.DEFAULT_VALUES;
exports.ModalContext = modal_context_1.ModalContext;
exports.ModalContextBuilder = modal_context_1.ModalContextBuilder;
var modal_open_context_1 = require('./models/modal-open-context');
exports.ModalOpenContext = modal_open_context_1.ModalOpenContext;
exports.ModalOpenContextBuilder = modal_open_context_1.ModalOpenContextBuilder;
var angular2_modal_module_1 = require('./angular2-modal.module');
exports.ModalModule = angular2_modal_module_1.ModalModule;

//# sourceMappingURL=index.js.map
