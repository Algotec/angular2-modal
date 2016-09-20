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
import { FluentAssign } from './../framework/fluent-assign';
import { extend, arrayUnion } from './../framework/utils';
export const DEFAULT_VALUES = {
    isBlocking: true,
    keyboard: [27],
    supportsKey: function supportsKey(keyCode) {
        return this.keyboard.indexOf(keyCode) > -1;
    }
};
const DEFAULT_SETTERS = [
    'isBlocking',
    'keyboard',
    'message'
];
export class ModalContext {
    normalize() {
        if (this.isBlocking !== false)
            this.isBlocking = true;
        if (this.keyboard === null) {
            this.keyboard = [];
        }
        else if (typeof this.keyboard === 'number') {
            this.keyboard = [this.keyboard];
        }
        else if (!Array.isArray(this.keyboard)) {
            this.keyboard = DEFAULT_VALUES.keyboard;
        }
    }
}
/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
export let ModalContextBuilder = class ModalContextBuilder extends FluentAssign {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
    }
};
ModalContextBuilder = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [Object, Array, Function])
], ModalContextBuilder);

//# sourceMappingURL=modal-context.js.map
