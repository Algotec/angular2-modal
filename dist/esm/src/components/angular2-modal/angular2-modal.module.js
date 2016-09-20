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
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { DOMOutsideEventPlugin } from './providers/index';
import { ModalRenderer } from './models/tokens';
import { DOMModalRenderer } from './providers/dom-modal-renderer';
let ModalModule_1;
export let ModalModule = ModalModule_1 = class ModalModule {
    static forRoot() {
        return {
            ngModule: ModalModule_1,
            providers: [
                { provide: ModalRenderer, useClass: DOMModalRenderer },
                { provide: EVENT_MANAGER_PLUGINS, useClass: DOMOutsideEventPlugin, multi: true },
            ]
        };
    }
};
ModalModule = ModalModule_1 = __decorate([
    NgModule({}), 
    __metadata('design:paramtypes', [])
], ModalModule);

//# sourceMappingURL=angular2-modal.module.js.map
