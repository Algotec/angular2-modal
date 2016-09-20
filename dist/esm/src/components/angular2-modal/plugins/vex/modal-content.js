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
import { Component, ComponentFactoryResolver, ElementRef, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { createComponent, ModalCompileConfig, DialogRef } from "angular2-modal";
import { Modal } from './modal';
/**
 * A component that acts as a top level container for an open modal window.
 */
export let VexModalContent = class VexModalContent {
    constructor(dialog, _modal, _compileConfig, _cr) {
        this.dialog = dialog;
        this._modal = _modal;
        this._compileConfig = _compileConfig;
        this._cr = _cr;
        this.context = dialog.context;
    }
    ngAfterViewInit() {
        if (this.dlgContainer.nativeElement) {
            this.dlgContainer.nativeElement.focus();
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
        // check that this modal is the last in the stack.
        if (this._modal.isTopMost(this.dialog) && !this.dialog.context.isBlocking)
            this.dialog.dismiss();
    }
};
__decorate([
    ViewChild('dlgContainer'), 
    __metadata('design:type', ElementRef)
], VexModalContent.prototype, "dlgContainer", void 0);
__decorate([
    ViewChild('modalDialog', { read: ViewContainerRef }), 
    __metadata('design:type', ViewContainerRef)
], VexModalContent.prototype, "_viewContainer", void 0);
VexModalContent = __decorate([
    Component({
        selector: 'modal-content',
        template: `<div tabindex="-1" role="dialog"
      [class]="context.contentClassName" (clickOutside)="onClickOutside()" #dlgContainer>
    <div style="display: none" #modalDialog></div>    
    <div *ngIf="context.showCloseButton" 
         [class]="context.closeClassName" 
         (click)="dialog.dismiss()"></div>
</div>`,
        encapsulation: ViewEncapsulation.None,
    }), 
    __metadata('design:paramtypes', [DialogRef, Modal, ModalCompileConfig, ComponentFactoryResolver])
], VexModalContent);

//# sourceMappingURL=modal-content.js.map
