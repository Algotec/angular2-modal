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
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import createComponent from '../framework/createComponent';
export let DOMModalRenderer = class DOMModalRenderer {
    constructor(_cr) {
        this._cr = _cr;
    }
    render(type, viewContainer, bindings, dialog) {
        const cmpRef = createComponent(this._cr, type, viewContainer, bindings);
        if (dialog.inElement) {
            viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
        }
        else {
            document.body.appendChild(cmpRef.location.nativeElement);
        }
        dialog.onDestroy.subscribe(() => {
            if (typeof cmpRef.instance.canDestroy === 'function') {
                cmpRef.instance.canDestroy().then(() => cmpRef.destroy());
            }
            else {
                cmpRef.destroy();
            }
        });
        return dialog;
    }
};
DOMModalRenderer = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ComponentFactoryResolver])
], DOMModalRenderer);

//# sourceMappingURL=dom-modal-renderer.js.map
