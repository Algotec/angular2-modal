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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from './modal';
import { BSModalBackdrop } from './modal-backdrop';
import { BSMessageModal } from './message-modal';
import { BSModalContainer } from './modal-container';
import { BSModalFooter } from './modal-footer';
import { OneButtonPresetBuilder } from './presets/one-button-preset';
import { TwoButtonPresetBuilder } from './presets/two-button-preset';
import { Modal as BaseModal, ModalBackdropComponent, ModalDropInFactory } from "angular2-modal";
function getProviders() {
    return [
        { provide: BaseModal, useClass: Modal },
        { provide: Modal, useClass: Modal },
        { provide: ModalBackdropComponent, useValue: BSModalBackdrop },
        { provide: ModalDropInFactory, useValue: {
                alert: modal => new OneButtonPresetBuilder(modal, { isBlocking: false }),
                prompt: modal => new OneButtonPresetBuilder(modal, { isBlocking: true, keyboard: null }),
                confirm: modal => new TwoButtonPresetBuilder(modal, { isBlocking: true, keyboard: null })
            } }
    ];
}
export let BootstrapModalModule = class BootstrapModalModule {
    static getProviders() {
        return getProviders();
    }
};
BootstrapModalModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [
            BSModalFooter,
            BSMessageModal,
            BSModalBackdrop,
            BSModalContainer
        ],
        providers: getProviders(),
        entryComponents: [
            BSModalBackdrop,
            BSMessageModal
        ]
    }), 
    __metadata('design:paramtypes', [])
], BootstrapModalModule);

//# sourceMappingURL=bootstrap.module.js.map
