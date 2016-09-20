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
import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ViewEncapsulation, ElementRef, trigger, state, style, keyframes, animate, transition } from '@angular/core';
import { createComponent, DialogRef, ModalCompileConfig, supportsKey } from "angular2-modal";
import { Modal } from './modal';
/**
 * A component that acts as a top level container for an open modal window.
 */
export let BSModalContainer = class BSModalContainer {
    constructor(dialog, el, _compileConfig, _modal, _cr) {
        this.dialog = dialog;
        this.el = el;
        this._compileConfig = _compileConfig;
        this._modal = _modal;
        this._cr = _cr;
        this.fadeState = 'in';
        if (!dialog.inElement) {
            this.position = null;
        }
        else {
            this.position = 'absolute';
        }
        dialog.onDestroy.subscribe(() => this.fadeState = 'out');
    }
    ngAfterViewInit() {
        if (this.el.nativeElement) {
            this.el.nativeElement.focus();
        }
        /*  TODO:
            In RC5 dynamic component creation is no longer async.
            Somewhere down the pipe of the created component a value change happens that fires
            a CD exception. setTimeout is a workaround that mimics the async behavior.
            Find out the error and remove setTimeout.
         */
        setTimeout(() => {
            this.dialog.contentRef = createComponent(this._cr, this._compileConfig.component, this._viewContainer, this._compileConfig.bindings);
        });
    }
    onClickOutside() {
        if (this._modal.isTopMost(this.dialog) && !this.dialog.context.isBlocking)
            this.dialog.dismiss();
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
__decorate([
    ViewChild('modalDialog', { read: ViewContainerRef }), 
    __metadata('design:type', ViewContainerRef)
], BSModalContainer.prototype, "_viewContainer", void 0);
BSModalContainer = __decorate([
    Component({
        selector: 'modal-container',
        host: {
            'tabindex': '-1',
            'role': 'dialog',
            'class': 'modal',
            'style': 'display: block',
            '[style.position]': 'position',
            '(body:keydown)': 'documentKeypress($event)'
        },
        animations: [
            trigger('fade', [
                transition('void => in', [
                    animate('100ms linear', keyframes([
                        style({ opacity: 0, transform: 'translate(0, -25%)' }),
                        style({ opacity: 0, transform: 'translate(0, -25%)' })
                    ])),
                    animate('300ms linear', keyframes([
                        style({ opacity: 0, transform: 'translate(0, -25%)', offset: 0 }),
                        style({ opacity: 1, transform: 'translate(0, -12.5%)', offset: 0.5 }),
                        style({ opacity: 1, transform: 'translate(0, 0)', offset: 1 })
                    ]))
                ]),
                state('out', style({ opacity: 0, transform: 'translate(0, -25%)' })),
                transition('in => out', [
                    animate('150ms linear', keyframes([
                        style({ opacity: 1, transform: 'translate(0, 0)' }),
                        style({ opacity: 0, transform: 'translate(0, -12.5%)' }),
                    ]))
                ])
            ])
        ],
        encapsulation: ViewEncapsulation.None,
        /* tslint:disable */
        template: `<div [ngClass]="dialog.context.dialogClass" 
          [class.modal-lg]="dialog.context.size == \'lg\'"
          [class.modal-sm]="dialog.context.size == \'sm\'"
          [@fade]="fadeState">
         <div class="modal-content"              
              style="display:block"              
              role="document"
              (clickOutside)="onClickOutside()">
            <div style="display: none" #modalDialog></div>
         </div>
    </div>`
    }), 
    __metadata('design:paramtypes', [DialogRef, ElementRef, ModalCompileConfig, Modal, ComponentFactoryResolver])
], BSModalContainer);

//# sourceMappingURL=modal-container.js.map
