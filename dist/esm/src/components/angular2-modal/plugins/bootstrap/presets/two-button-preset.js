/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { extend } from "angular2-modal";
import { MessageModalPresetBuilder } from './message-modal-preset';
/**
 * A Preset for a classic 2 button modal window.
 */
export class TwoButtonPresetBuilder extends MessageModalPresetBuilder {
    constructor(modal, defaultValues=undefined) {
        super(extend({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary',
            cancelBtn: 'Cancel',
            cancelBtnClass: 'btn btn-default'
        }, defaultValues || {}), [
            'okBtn',
            'okBtnClass',
            'cancelBtn',
            'cancelBtnClass'
        ]);
    }
    $$beforeOpen(config) {
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true))
            .addButton(config.cancelBtnClass, config.cancelBtn, (cmp, $event) => cmp.dialog.dismiss());
        return super.$$beforeOpen(config);
    }
}

//# sourceMappingURL=two-button-preset.js.map
