/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ViewContainerRef, ResolvedReflectiveProvider, Type } from '@angular/core';
import { Modal } from '../providers/index';
import { DialogRef } from './dialog-ref';
import { ModalControllingContextBuilder } from '../models/modal-context';
export declare enum DROP_IN_TYPE {
    alert = 0,
    prompt = 1,
    confirm = 2,
}
export interface ModalComponent<T> {
    dialog: DialogRef<T>;
    /**
     * Invoked before a modal is dismissed.
     * @return true or a promise that resolves to true to cancel dismissal.
     */
    beforeDismiss?(): boolean | Promise<boolean>;
    /**
     * Invoked before a modal is closed.
     * @return true or a promise that resolves to true to cancel closing.
     */
    beforeClose?(): boolean | Promise<boolean>;
}
export declare class ModalCompileConfig {
    component: Type<any>;
    bindings: ResolvedReflectiveProvider[];
    constructor(component: Type<any>, bindings: ResolvedReflectiveProvider[]);
}
export declare abstract class ModalRenderer {
    abstract render(type: any, viewContainer: ViewContainerRef, bindings: ResolvedReflectiveProvider[], dialog: DialogRef<any>): DialogRef<any>;
}
export declare abstract class ModalBackdropComponent extends Type {
}
export declare class ModalDropInFactory {
    alert: <T>(modal: Modal) => ModalControllingContextBuilder<T>;
    prompt: <T>(modal: Modal) => ModalControllingContextBuilder<T>;
    confirm: <T>(modal: Modal) => ModalControllingContextBuilder<T>;
}
