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
import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { createComponent, ModalCompileConfig, DialogRef } from "angular2-modal";
/**
 * A Dialog is a
 */
export let VEXDialogButtons = class VEXDialogButtons {
    constructor() {
        /**
         * Emitted when a button was clicked
         * @type {EventEmitter<VEXButtonClickEvent>}
         */
        this.onButtonClick = new EventEmitter();
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        this.onButtonClick.emit({ btn, $event });
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Array)
], VEXDialogButtons.prototype, "buttons", void 0);
__decorate([
    Output(), 
    __metadata('design:type', Object)
], VEXDialogButtons.prototype, "onButtonClick", void 0);
VEXDialogButtons = __decorate([
    Component({
        selector: 'vex-dialog-buttons',
        encapsulation: ViewEncapsulation.None,
        template: `<div class="vex-dialog-buttons">
    <button type="button" 
         *ngFor="let btn of buttons;"
         [class]="btn.cssClass"
         (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
    }), 
    __metadata('design:paramtypes', [])
], VEXDialogButtons);
/**
 * A Dialog with customized buttons wrapped in a form.
 *
 */
export let DialogFormModal = class DialogFormModal {
    constructor(dialog, _compileConfig, _cr) {
        this.dialog = dialog;
        this._compileConfig = _compileConfig;
        this._cr = _cr;
        this.context = dialog.context;
    }
    ngAfterViewInit() {
        /*  TODO:
         In RC5 dynamic component creation is no longer async.
         Somewhere down the pipe of the created component a value change happens that fires
         a CD exception. setTimeout is a workaround that mimics the async behavior.
         Find out the error and remove setTimeout.
         */
        setTimeout(() => {
            this.dialog.contentRef = createComponent(this._cr, this.context.content, this._viewContainer, this._compileConfig.bindings);
        });
    }
    onButtonClick($event) {
        $event.btn.onClick(this, $event.$event);
    }
};
__decorate([
    ViewChild('modalDialog', { read: ViewContainerRef }), 
    __metadata('design:type', ViewContainerRef)
], DialogFormModal.prototype, "_viewContainer", void 0);
DialogFormModal = __decorate([
    Component({
        selector: 'modal-dialog',
        encapsulation: ViewEncapsulation.None,
        template: `<form class="vex-dialog-form">
    <div style="display: none" #modalDialog></div> 
    <vex-dialog-buttons [buttons]="context.buttons"
                        (onButtonClick)="onButtonClick($event)"></vex-dialog-buttons>
</form>`
    }), 
    __metadata('design:paramtypes', [DialogRef, ModalCompileConfig, ComponentFactoryResolver])
], DialogFormModal);
export let FormDropIn = class FormDropIn {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
};
FormDropIn = __decorate([
    Component({
        selector: 'drop-in-dialog',
        encapsulation: ViewEncapsulation.None,
        template: `<div class="vex-dialog-message">{{context.message}}</div>
    <div *ngIf="context.showInput" class="vex-dialog-input">
        <input autofocus #input
               name="vex" 
               type="text" 
               class="vex-dialog-prompt-input"
               (change)="context.defaultResult = input.value"               
               placeholder="{{context.placeholder}}">
    </div>`
    }), 
    __metadata('design:paramtypes', [DialogRef])
], FormDropIn);

//# sourceMappingURL=dialog-form-modal.js.map
