/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
"use strict";
var core_1 = require('@angular/core');
function createComponent(cfr, type, vcr, bindings) {
    return vcr.createComponent(cfr.resolveComponentFactory(type), vcr.length, getInjector(vcr, bindings));
}
exports.createComponent = createComponent;
function getInjector(viewContainer, bindings) {
    var ctxInjector = viewContainer.parentInjector;
    return Array.isArray(bindings) && bindings.length > 0 ?
        core_1.ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createComponent;

//# sourceMappingURL=createComponent.js.map
