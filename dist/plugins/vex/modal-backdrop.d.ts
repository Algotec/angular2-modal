/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { OnDestroy } from '@angular/core';
import { DialogRef } from 'angular2-modal';
import { Modal } from './modal';
import { VEXModalContext } from './modal-context';
/**
 * Represents the modal backdrop.
 */
export declare class VexModalBackdrop implements OnDestroy {
    private dialog;
    private _modal;
    private hs;
    constructor(dialog: DialogRef<VEXModalContext>, _modal: Modal);
    cssClass: string;
    ngOnDestroy(): void;
    documentKeypress(event: KeyboardEvent): void;
}
