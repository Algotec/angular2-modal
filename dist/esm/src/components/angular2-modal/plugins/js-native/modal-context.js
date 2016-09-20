/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { DROP_IN_TYPE, ModalOpenContextBuilder, ModalOpenContext, arrayUnion } from "angular2-modal";
const DEFAULT_SETTERS = [
    'promptDefault'
];
export class JSNativeModalContext extends ModalOpenContext {
    normalize() {
        if (!this.message)
            this.message = '';
        if (this.dialogType === undefined)
            this.dialogType = DROP_IN_TYPE.alert;
    }
}
export class JSNativeModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(defaultValues || {}, arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || JSNativeModalContext);
    }
}

//# sourceMappingURL=modal-context.js.map
