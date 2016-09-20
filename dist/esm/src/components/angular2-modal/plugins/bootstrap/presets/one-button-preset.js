/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { extend } from "angular2-modal";
import { MessageModalPresetBuilder } from './message-modal-preset';
/**
 * A Preset for a classic 1 button modal window.
 */
export class OneButtonPresetBuilder extends MessageModalPresetBuilder {
    constructor(modal, defaultValues=undefined) {
        super(extend({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary'
        }, defaultValues || {}), [
            'okBtn',
            'okBtnClass'
        ]);
    }
    $$beforeOpen(config) {
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
        return super.$$beforeOpen(config);
    }
}

//# sourceMappingURL=one-button-preset.js.map
