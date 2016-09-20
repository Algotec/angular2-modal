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
import { Component, ViewEncapsulation, trigger, state, style, keyframes, animate, transition } from '@angular/core';
import { DialogRef } from "angular2-modal";
let dialogRefCount = 0;
/**
 * Represents the modal backdrop.
 */
export let BSModalBackdrop = class BSModalBackdrop {
    constructor(dialog) {
        this.fadeState = 'in';
        this.hs = { ps: null, sz: null, pt: null };
        dialogRefCount++;
        document.body.classList.add('modal-open');
        if (dialog.inElement) {
            this.hs.ps = 'absolute';
            this.hs.sz = '100%';
            this.hs.pt = '0';
        }
        dialog.onDestroy.subscribe(() => this.fadeState = 'out');
    }
    /**
     * Temp workaround for animation where destruction of the top level component does not
     * trigger child animations. Solution should be found either in animation module or in design
     * of the modal component tree.
     * @returns {Promise<void>}
     */
    canDestroy() {
        return new Promise(resolve => {
            setTimeout(() => resolve(), 310);
        });
    }
    ngOnDestroy() {
        if (--dialogRefCount === 0) {
            document.body.classList.remove('modal-open');
        }
    }
};
BSModalBackdrop = __decorate([
    Component({
        selector: 'modal-backdrop',
        host: {
            '[style.position]': 'hs.ps',
            '[style.height]': 'hs.sz',
            '[style.width]': 'hs.sz',
            '[style.top]': 'hs.pt',
            '[style.left]': 'hs.pt',
            '[style.right]': 'hs.pt',
            '[style.bottom]': 'hs.pt'
        },
        animations: [
            trigger('fade', [
                transition('void => in', [
                    animate('150ms linear', keyframes([
                        style({ opacity: 0 }),
                        style({ opacity: 0.5 })
                    ]))
                ]),
                state('out', style({ opacity: 0 })),
                transition('* => out', [
                    animate('150ms linear', keyframes([
                        style({ opacity: 0.5 }),
                        style({ opacity: 0.5 })
                    ])),
                    animate('150ms linear', keyframes([
                        style({ opacity: 0.5 }),
                        style({ opacity: 0 }),
                    ]))
                ])
            ])
        ],
        encapsulation: ViewEncapsulation.None,
        template: `<div [style.position]="hs.ps" class="modal-backdrop in" [@fade]="fadeState"></div>
<modal-container></modal-container>`
    }), 
    __metadata('design:paramtypes', [DialogRef])
], BSModalBackdrop);

//# sourceMappingURL=modal-backdrop.js.map
