/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Modal } from '../providers/index';
import { ModalContext, ModalContextBuilder } from './modal-context';
import { arrayUnion } from '../framework/utils';
const DEFAULT_SETTERS = [
    'component'
];
export class ModalOpenContext extends ModalContext {
}
/**
 * A Modal Context that knows about the modal service, and so can open a modal window on demand.
 * Use the fluent API to configure the preset and then invoke the 'open' method to open a modal
 * based on the context.
 */
export class ModalOpenContextBuilder extends ModalContextBuilder {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(defaultValues || {}, arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
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
        return config.modal.open(config.component, config, bindings, viewContainer);
    }
}

//# sourceMappingURL=modal-open-context.js.map
