/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ViewContainerRef, ResolvedReflectiveProvider, Type } from '@angular/core';
import { DialogRef, ModalRenderer } from 'angular2-modal';
import { JSNativeModalContext } from './modal-context';
export declare class JSNativeModalRenderer implements ModalRenderer {
    render(type: Type<any>, viewContainer: ViewContainerRef, bindings: ResolvedReflectiveProvider[], dialog: DialogRef<JSNativeModalContext>): DialogRef<any>;
}
