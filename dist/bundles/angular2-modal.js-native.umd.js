var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular2-modal'), require('@angular/core')) :
        typeof define === 'function' && define.amd ? define(['exports', 'angular2-modal', '@angular/core'], factory) :
            (factory((global.angular2Modal = global.angular2Modal || {}, global.angular2Modal.plugins = global.angular2Modal.plugins || {}, global.angular2Modal.plugins.jsNative = global.angular2Modal.plugins.jsNative || {}), global.angular2 - modal, global.ng.core));
}(this, function (exports, angular2Modal, _angular_core) {
    'use strict';
    var Modal$1 = angular2Modal.Modal;
    var DEFAULT_SETTERS = [
        'promptDefault'
    ];
    var JSNativeModalContext = (function (_super) {
        __extends(JSNativeModalContext, _super);
        function JSNativeModalContext() {
            _super.apply(this, arguments);
        }
        JSNativeModalContext.prototype.normalize = function () {
            if (!this.message)
                this.message = '';
            if (this.dialogType === undefined)
                this.dialogType = angular2Modal.DROP_IN_TYPE.alert;
        };
        return JSNativeModalContext;
    }(angular2Modal.ModalOpenContext));
    var JSNativeModalContextBuilder = (function (_super) {
        __extends(JSNativeModalContextBuilder, _super);
        function JSNativeModalContextBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, defaultValues || {}, angular2Modal.arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || JSNativeModalContext);
        }
        return JSNativeModalContextBuilder;
    }(angular2Modal.ModalOpenContextBuilder));
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return (c > 3 && r && Object.defineProperty(target, key, r), r);
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    exports.JSNativeModalRenderer = (function () {
        function JSNativeModalRenderer() {
        }
        JSNativeModalRenderer.prototype.render = function (type, viewContainer, bindings, dialog) {
            var result;
            switch (dialog.context.dialogType) {
                case angular2Modal.DROP_IN_TYPE.alert:
                    window.alert(dialog.context.message);
                    result = true;
                    break;
                case angular2Modal.DROP_IN_TYPE.prompt:
                    result = window.prompt(dialog.context.message, dialog.context.promptDefault);
                    break;
                case angular2Modal.DROP_IN_TYPE.confirm:
                    result = window.confirm(dialog.context.message);
                    break;
            }
            dialog.destroy = function () {
            };
            if (result === false) {
                dialog.dismiss();
            }
            else {
                dialog.close(result);
            }
            return dialog;
        };
        return JSNativeModalRenderer;
    }());
    exports.JSNativeModalRenderer = __decorate([
        _angular_core.Injectable(),
        __metadata('design:paramtypes', [])
    ], exports.JSNativeModalRenderer);
    var JSNativePresetBuilder = (function (_super) {
        __extends(JSNativePresetBuilder, _super);
        function JSNativePresetBuilder(modal, dialogType) {
            _super.call(this, { modal: modal, dialogType: dialogType });
        }
        /**
         * Hook to alter config and return bindings.
         * @param config
         */
        JSNativePresetBuilder.prototype.$$beforeOpen = function (config) {
            return [];
        };
        /**
         * Open a modal window based on the configuration of this config instance.
         * @param viewContainer If set opens the modal inside the supplied viewContainer
         * @returns Promise<DialogRef>
         */
        JSNativePresetBuilder.prototype.open = function (viewContainer) {
            var config = this.toJSON();
            if (!(config.modal instanceof Modal$1)) {
                return Promise.reject(new Error('Configuration Error: modal service not set.'));
            }
            var bindings = typeof this.$$beforeOpen === 'function' && this.$$beforeOpen(config);
            return config.modal.open(true, config, bindings, true);
        };
        return JSNativePresetBuilder;
    }(JSNativeModalContextBuilder));
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return (c > 3 && r && Object.defineProperty(target, key, r), r);
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    function getProviders() {
        return [
            { provide: angular2Modal.Modal, useClass: Modal$1 },
            { provide: Modal$1, useClass: Modal$1 },
            { provide: angular2Modal.ModalRenderer, useClass: exports.JSNativeModalRenderer },
            { provide: angular2Modal.ModalBackdropComponent, useValue: {} },
            { provide: angular2Modal.ModalDropInFactory, useValue: {
                    alert: function (modal) { return new JSNativePresetBuilder(modal, angular2Modal.DROP_IN_TYPE.alert); },
                    prompt: function (modal) { return new JSNativePresetBuilder(modal, angular2Modal.DROP_IN_TYPE.prompt); },
                    confirm: function (modal) { return new JSNativePresetBuilder(modal, angular2Modal.DROP_IN_TYPE.confirm); }
                } }
        ];
    }
    exports.JSNativeModalModule = (function () {
        function JSNativeModalModule() {
        }
        JSNativeModalModule.getProviders = function () {
            return getProviders();
        };
        return JSNativeModalModule;
    }());
    exports.JSNativeModalModule = __decorate$1([
        _angular_core.NgModule({
            providers: getProviders()
        }),
        __metadata$1('design:paramtypes', [])
    ], exports.JSNativeModalModule);
    exports.Modal = Modal$1;
    exports.JSNativeModalContext = JSNativeModalContext;
    exports.JSNativeModalContextBuilder = JSNativeModalContextBuilder;
    exports.JSNativePresetBuilder = JSNativePresetBuilder;
    Object.defineProperty(exports, '__esModule', { value: true });
}));
