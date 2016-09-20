/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Modal } from '../modal';
import { JSNativeModalContextBuilder } from '../modal-context';
export class JSNativePresetBuilder extends JSNativeModalContextBuilder {
    constructor(modal, dialogType) {
        super({ modal, dialogType });
    }
    /**
     * Hook to alter config and return bindings.
     * @param config
     */
    $$beforeOpen(config) {
        return [];
    }
    /**
     * Open a modal window based on the configuration of this config instance.
     * @param viewContainer If set opens the modal inside the supplied viewContainer
     * @returns Promise<DialogRef>
     */
    open(viewContainer) {
        let config = this.toJSON();
        if (!(config.modal instanceof Modal)) {
            return Promise.reject(new Error('Configuration Error: modal service not set.'));
        }
        let bindings = typeof this.$$beforeOpen === 'function' && this.$$beforeOpen(config);
        return config.modal.open(true, config, bindings, true);
    }
}

//# sourceMappingURL=js-native-preset.js.map
