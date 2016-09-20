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
import { Modal as BaseModal, ModalBackdropComponent, ModalDropInFactory, DROP_IN_TYPE as DIType } from "angular2-modal";
import { DropInPresetBuilder as Builder } from './presets/dropin-preset';
import { VexModalBackdrop } from './modal-backdrop';
import { VexModalContent } from './modal-content';
import { DialogFormModal, FormDropIn, VEXDialogButtons } from './dialog-form-modal';
function getProviders() {
    return [
        { provide: BaseModal, useClass: Modal },
        { provide: Modal, useClass: Modal },
        { provide: ModalBackdropComponent, useValue: VexModalBackdrop },
        { provide: ModalDropInFactory, useValue: {
                alert: modal => new Builder(modal, DIType.alert, { isBlocking: false }),
                prompt: modal => new Builder(modal, DIType.prompt, { isBlocking: true, keyboard: null }),
                confirm: modal => new Builder(modal, DIType.confirm, { isBlocking: true, keyboard: null })
            } }
    ];
}
export let VexModalModule = class VexModalModule {
    static getProviders() {
        return getProviders();
    }
};
VexModalModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [
            VEXDialogButtons,
            FormDropIn,
            DialogFormModal,
            VexModalBackdrop,
            VexModalContent
        ],
        providers: getProviders(),
        entryComponents: [
            VexModalBackdrop,
            DialogFormModal,
            FormDropIn
        ]
    }), 
    __metadata('design:paramtypes', [])
], VexModalModule);

//# sourceMappingURL=vex.module.js.map
