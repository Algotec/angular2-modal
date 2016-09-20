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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ReflectiveInjector, Injectable, Optional } from '@angular/core';
import { ModalRenderer, ModalCompileConfig, ModalBackdropComponent, ModalDropInFactory } from '../models/tokens';
import { DialogRefStack } from '../models/dialog-ref-stack';
import { DialogRef } from '../models/dialog-ref';
const _stack = new DialogRefStack();
const unsupportedDropIn = () => {
    throw new Error('Unsupported Drop-in.');
};
const UnsupportedDropInFactory = {
    alert: unsupportedDropIn,
    prompt: unsupportedDropIn,
    confirm: unsupportedDropIn
};
function normalizeDropInFactory(dropInFactory) {
    if (!dropInFactory)
        return UnsupportedDropInFactory;
    return ['alert', 'prompt', 'confirm']
        .reduce((dif, key) => {
        if (typeof dif[key] !== 'function')
            dif[key] = unsupportedDropIn;
        return dif;
    }, dropInFactory);
}
let Modal_1;
export let Modal = Modal_1 = class Modal {
    constructor(_modalRenderer, _backdrop, _dropIn) {
        this._modalRenderer = _modalRenderer;
        this._backdrop = _backdrop;
        this._dropIn = normalizeDropInFactory(_dropIn);
    }
    alert() {
        return this._dropIn.alert(this);
    }
    prompt() {
        return this._dropIn.prompt(this);
    }
    confirm() {
        return this._dropIn.confirm(this);
    }
    /**
     * Opens a modal window inside an existing component.
     * If
     * @param componentType The angular Component to render as the modal content.
     * @param bindings Resolved providers that will inject into the component provided.
     * @param context The context for the modal, attached to the dialog instance, DialogRef.context.
     *        Default: {}
     * @param viewContainer The element to block using the modal.
     *        Default: The value set in defaultViewContainer.
     * @param inside If true, render's the component inside the ViewContainerRef,
     *        otherwise render's the component in the root element (body in DOM)
     *        Default: true if ViewContainer supplied, false if not supplied.
     * @returns {Promise<DialogRef>}
     */
    open(
        componentType,
        context=undefined,
        bindings=undefined,
        viewContainer=undefined,
        inside) {
        inside = inside === undefined ? !!viewContainer : !!inside;
        if (!viewContainer) {
            if (!this.defaultViewContainer) {
                throw new Error('defaultViewContainer not set.');
            }
            viewContainer = this.defaultViewContainer;
        }
        if (context) {
            context.normalize();
        }
        let dialog = new DialogRef(context || {});
        dialog.inElement = inside;
        let compileConfig = new ModalCompileConfig(componentType, bindings || []);
        let b = ReflectiveInjector.resolve([
            { provide: Modal_1, useValue: this },
            { provide: ModalRenderer, useValue: this._modalRenderer },
            { provide: DialogRef, useValue: dialog },
            { provide: ModalCompileConfig, useValue: compileConfig }
        ]);
        this._modalRenderer.render(this._backdrop, viewContainer, b, dialog);
        _stack.pushManaged(dialog);
        dialog.onDestroy.subscribe(() => _stack.remove(dialog));
        return Promise.resolve(dialog);
    }
    /**
     * Check if a given DialogRef is the top most ref in the stack.
     * TODO: distinguish between body modal vs in element modal.
     * @param dialogRef
     * @returns {boolean}
     */
    isTopMost(dialogRef) {
        return _stack.indexOf(dialogRef) === _stack.length - 1;
    }
    stackPosition(dialogRef) {
        return _stack.indexOf(dialogRef);
    }
    get stackLength() {
        return _stack.length;
    }
};
Modal = Modal_1 = __decorate([
    Injectable(),
    __param(2, Optional()), 
    __metadata('design:paramtypes', [ModalRenderer, ModalBackdropComponent, ModalDropInFactory])
], Modal);

//# sourceMappingURL=modal.js.map
