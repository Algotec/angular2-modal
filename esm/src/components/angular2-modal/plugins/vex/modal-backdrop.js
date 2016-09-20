/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { DialogRef, supportsKey } from "angular2-modal";
import { Modal } from './modal';
let dialogRefCount = 0;
/**
 * Represents the modal backdrop.
 */
export let VexModalBackdrop = class VexModalBackdrop {
    constructor(dialog, _modal) {
        this.dialog = dialog;
        this._modal = _modal;
        this.hs = {};
        dialogRefCount++;
        document.body.classList.add('vex-open');
        if (dialog.inElement) {
            this.hs.ps = 'absolute';
            this.hs.sz = '100%';
            this.hs.pt = 0;
        }
    }
    get cssClass() {
        return `vex vex-theme-${this.dialog.context.className}`;
    }
    ngOnDestroy() {
        if (--dialogRefCount === 0) {
            document.body.classList.remove('vex-open');
        }
    }
    documentKeypress(event) {
        // check that this modal is the last in the stack.
        if (!this._modal.isTopMost(this.dialog))
            return;
        if (supportsKey(event.keyCode, this.dialog.context.keyboard)) {
            this.dialog.dismiss();
        }
    }
};
VexModalBackdrop = __decorate([
    Component({
        selector: 'modal-backdrop',
        host: {
            '[class.in-element]': 'dialog.inElement',
            '[style.position]': 'hs.ps',
            '[style.height]': 'hs.sz',
            '[style.width]': 'hs.sz',
            '[style.top]': 'hs.pt',
            '[style.left]': 'hs.pt',
            '[style.right]': 'hs.pt',
            '[style.bottom]': 'hs.pt',
            '(body:keydown)': 'documentKeypress($event)'
        },
        styleUrls: [
            './modal-backdrop.css'
        ],
        encapsulation: ViewEncapsulation.None,
        template: `<div [class]="cssClass">
    <div [class]="dialog.context.overlayClassName"></div>
    <modal-content></modal-content>    
</div>`
    }), 
    __metadata('design:paramtypes', [DialogRef, Modal])
], VexModalBackdrop);

//# sourceMappingURL=modal-backdrop.js.map
