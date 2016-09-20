/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Subject } from 'rxjs/Subject';
import { PromiseCompleter } from '../framework/utils';
/**
 * API to an open modal window.
 */
export class DialogRef {
    constructor(context) {
        this.context = context;
        this._resultDeferred = new PromiseCompleter();
        this._onDestroy = new Subject();
        this.onDestroy = this._onDestroy.asObservable();
    }
    /**
     * A Promise that is resolved on a close event and rejected on a dismiss event.
     * @returns {Promise<T>|any|*|Promise<any>}
     */
    get result() {
        return this._resultDeferred.promise;
    }
    /**
     *  Close the modal with a return value, i.e: result.
     */
    close(result=null) {
        const _close = () => {
            this.destroy();
            this._resultDeferred.resolve(result);
        };
        this._fireHook('beforeClose')
            .then(value => value !== true && _close())
            .catch(_close);
    }
    /**
     *  Close the modal without a return value, i.e: cancelled.
     *  This call is automatically invoked when a user either:
     *  - Presses an exit keyboard key (if configured).
     *  - Clicks outside of the modal window (if configured).
     *  Usually, dismiss represent a Cancel button or a X button.
     */
    dismiss() {
        const _dismiss = () => {
            this.destroy();
            this._resultDeferred.reject();
        };
        this._fireHook('beforeDismiss')
            .then(value => value !== true && _dismiss())
            .catch(_dismiss);
    }
    destroy() {
        this._onDestroy.next(null);
        this._onDestroy.complete();
    }
    _fireHook(name) {
        const instance = this.contentRef && this.contentRef.instance, fn = instance && typeof instance[name] === 'function' && instance[name];
        return Promise.resolve(fn ? fn.call(instance) : false);
    }
}

//# sourceMappingURL=dialog-ref.js.map
