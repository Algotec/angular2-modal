/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular2_modal_1 = require("angular2-modal");
var modal_context_1 = require('../modal-context');
var message_modal_1 = require('../message-modal');
var DEFAULT_VALUES = {
    component: message_modal_1.BSMessageModal,
    headerClass: 'modal-header',
    bodyClass: 'modal-body',
    footerClass: 'modal-footer'
};
var DEFAULT_SETTERS = [
    'headerClass',
    'title',
    'titleHtml',
    'bodyClass',
    'footerClass'
];
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
var MessageModalPresetBuilder = (function (_super) {
    __extends(MessageModalPresetBuilder, _super);
    function MessageModalPresetBuilder(defaultValues, initialSetters, baseType) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        if (initialSetters === void 0) { initialSetters = undefined; }
        if (baseType === void 0) { baseType = undefined; }
        _super.call(this, angular2_modal_1.extend(angular2_modal_1.extend({ buttons: [] }, DEFAULT_VALUES), defaultValues || {}), angular2_modal_1.arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
        angular2_modal_1.setAssignAlias(this, 'body', 'message', true);
    }
    MessageModalPresetBuilder.prototype.addButton = function (css, caption, onClick) {
        var btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        var key = angular2_modal_1.privateKey('buttons');
        this[key].push(btn);
        return this;
    };
    return MessageModalPresetBuilder;
}(modal_context_1.BSModalContextBuilder));
exports.MessageModalPresetBuilder = MessageModalPresetBuilder;

//# sourceMappingURL=message-modal-preset.js.map
