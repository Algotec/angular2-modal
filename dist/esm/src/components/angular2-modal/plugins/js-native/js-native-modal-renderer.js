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
import { Injectable } from '@angular/core';
import { DROP_IN_TYPE } from "angular2-modal";
export let JSNativeModalRenderer = class JSNativeModalRenderer {
    render(type, viewContainer, bindings, dialog) {
        let result;
        switch (dialog.context.dialogType) {
            case DROP_IN_TYPE.alert:
                window.alert(dialog.context.message);
                result = true;
                break;
            case DROP_IN_TYPE.prompt:
                result = window.prompt(dialog.context.message, dialog.context.promptDefault);
                break;
            case DROP_IN_TYPE.confirm:
                result = window.confirm(dialog.context.message);
                break;
        }
        dialog.destroy = () => {
        };
        if (result === false) {
            dialog.dismiss();
        }
        else {
            dialog.close(result);
        }
        return dialog;
    }
};
JSNativeModalRenderer = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], JSNativeModalRenderer);

//# sourceMappingURL=js-native-modal-renderer.js.map
