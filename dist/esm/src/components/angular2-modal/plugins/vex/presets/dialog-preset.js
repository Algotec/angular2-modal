/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { privateKey, extend, arrayUnion } from "angular2-modal";
import { VEXModalContext, VEXModalContextBuilder } from '../modal-context';
import { DialogFormModal as component } from '../dialog-form-modal';
const DEFAULT_SETTERS = [
    'content'
];
/**
 * Data definition
 */
export class DialogPreset extends VEXModalContext {
}
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
export class DialogPresetBuilder extends VEXModalContextBuilder {
    constructor(
        modal,
        defaultValues=undefined,
        initialSetters=undefined,
        baseType=undefined) {
        super(extend({ modal, component, buttons: [], defaultResult: true }, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || DialogPreset // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    addButton(css, caption, onClick) {
        let btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        let key = privateKey('buttons');
        this[key].push(btn);
        return this;
    }
    addOkButton(text='OK') {
        this.addButton('vex-dialog-button-primary vex-dialog-button vex-first', text, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultResult));
        return this;
    }
    addCancelButton(text='CANCEL') {
        this.addButton('vex-dialog-button-secondary vex-dialog-button vex-last', text, (cmp, $event) => cmp.dialog.dismiss());
        return this;
    }
}

//# sourceMappingURL=dialog-preset.js.map
