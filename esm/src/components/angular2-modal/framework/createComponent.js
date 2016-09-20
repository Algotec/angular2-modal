/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ReflectiveInjector } from '@angular/core';
export function createComponent(cfr, type, vcr, bindings) {
    return vcr.createComponent(cfr.resolveComponentFactory(type), vcr.length, getInjector(vcr, bindings));
}
function getInjector(viewContainer, bindings) {
    const ctxInjector = viewContainer.parentInjector;
    return Array.isArray(bindings) && bindings.length > 0 ?
        ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
}
export default createComponent;

//# sourceMappingURL=createComponent.js.map
