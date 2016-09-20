/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ModalCompileConfig, DialogRef } from 'angular2-modal';
import { Modal } from './modal';
import { VEXModalContext } from './modal-context';
/**
 * A component that acts as a top level container for an open modal window.
 */
export declare class VexModalContent implements AfterViewInit {
    dialog: DialogRef<VEXModalContext>;
    private _modal;
    private _compileConfig;
    private _cr;
    private context;
    private dlgContainer;
    private _viewContainer;
    constructor(dialog: DialogRef<VEXModalContext>, _modal: Modal, _compileConfig: ModalCompileConfig, _cr: ComponentFactoryResolver);
    ngAfterViewInit(): void;
    onClickOutside(): void;
}
