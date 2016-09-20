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
import { Modal } from './modal';
import { JSNativeModalRenderer } from './js-native-modal-renderer';
import { JSNativePresetBuilder } from './presets/js-native-preset';
import { Modal as BaseModal, ModalBackdropComponent, ModalDropInFactory, ModalRenderer, DROP_IN_TYPE } from "angular2-modal";
function getProviders() {
    return [
        { provide: BaseModal, useClass: Modal },
        { provide: Modal, useClass: Modal },
        { provide: ModalRenderer, useClass: JSNativeModalRenderer },
        { provide: ModalBackdropComponent, useValue: {} },
        { provide: ModalDropInFactory, useValue: {
                alert: modal => new JSNativePresetBuilder(modal, DROP_IN_TYPE.alert),
                prompt: modal => new JSNativePresetBuilder(modal, DROP_IN_TYPE.prompt),
                confirm: modal => new JSNativePresetBuilder(modal, DROP_IN_TYPE.confirm)
            } }
    ];
}
export let JSNativeModalModule = class JSNativeModalModule {
    static getProviders() {
        return getProviders();
    }
};
JSNativeModalModule = __decorate([
    NgModule({
        providers: getProviders()
    }), 
    __metadata('design:paramtypes', [])
], JSNativeModalModule);

//# sourceMappingURL=js-native.module.js.map
