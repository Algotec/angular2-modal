/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ModalOpenContext, ModalOpenContextBuilder, extend, arrayUnion } from "angular2-modal";
const DEFAULT_VALUES = {
    dialogClass: 'modal-dialog',
    showClose: false
};
const DEFAULT_SETTERS = [
    'dialogClass',
    'size',
    'showClose'
];
export class BSModalContext extends ModalOpenContext {
    normalize() {
        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES.dialogClass;
        }
        super.normalize();
    }
}
export class BSModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
}

//# sourceMappingURL=modal-context.js.map
