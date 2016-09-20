/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { DROP_IN_TYPE, extend } from "angular2-modal";
import { DialogFormModal as component, FormDropIn as content } from '../dialog-form-modal';
import { DialogPreset, DialogPresetBuilder } from './dialog-preset';
const DEFAULT_VALUES = {
    component,
    content,
    okBtn: 'OK',
    cancelBtn: 'Cancel'
};
const DEFAULT_SETTERS = [
    'okBtn',
    'cancelBtn',
    'placeholder',
    'showCloseButton'
];
/**
 * Data definition
 */
export class DropInPreset extends DialogPreset {
    get showInput() {
        return this.dropInType === DROP_IN_TYPE.prompt;
    }
}
/**
 * A Preset representing all 3 drop ins (alert, prompt, confirm)
 */
export class DropInPresetBuilder extends DialogPresetBuilder {
    constructor(modal, dropInType, defaultValues=undefined) {
        super(modal, extend(extend({ modal, dropInType }, DEFAULT_VALUES), defaultValues || {}), DEFAULT_SETTERS, DropInPreset);
    }
    $$beforeOpen(config) {
        if (config.okBtn) {
            this.addOkButton(config.okBtn);
        }
        switch (config.dropInType) {
            case DROP_IN_TYPE.prompt:
                config.defaultResult = undefined;
            case DROP_IN_TYPE.confirm:
                if (config.cancelBtn) {
                    this.addCancelButton(config.cancelBtn);
                }
                break;
        }
        return super.$$beforeOpen(config);
    }
}

//# sourceMappingURL=dropin-preset.js.map
