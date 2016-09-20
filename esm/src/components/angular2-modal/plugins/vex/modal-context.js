/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ModalOpenContext, ModalOpenContextBuilder, privateKey, extend, arrayUnion } from "angular2-modal";
const DEFAULT_VALUES = {
    className: 'default',
    overlayClassName: 'vex-overlay',
    contentClassName: 'vex-content',
    closeClassName: 'vex-close'
};
const DEFAULT_SETTERS = [
    'className',
    'overlayClassName',
    'contentClassName',
    'closeClassName',
    'showCloseButton'
];
export class VEXModalContext extends ModalOpenContext {
}
export class VEXModalContextBuilder extends ModalOpenContextBuilder {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || VEXModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    /**
     *
     * @aliasFor isBlocking
     */
    overlayClosesOnClick(value) {
        this[privateKey('isBlocking')] = !value;
        return this;
    }
}

//# sourceMappingURL=modal-context.js.map
