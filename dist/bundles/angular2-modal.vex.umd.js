var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular2-modal'), require('@angular/core'), require('@angular/common')) :
        typeof define === 'function' && define.amd ? define(['exports', 'angular2-modal', '@angular/core', '@angular/common'], factory) :
            (factory((global.angular2Modal = global.angular2Modal || {}, global.angular2Modal.plugins = global.angular2Modal.plugins || {}, global.angular2Modal.plugins.vex = global.angular2Modal.plugins.vex || {}), global.angular2 - modal, global.ng.core, global.ng.common));
}(this, function (exports, angular2Modal, _angular_core, _angular_common) {
    'use strict';
    var Modal$1 = angular2Modal.Modal;
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
    var dialogRefCount = 0;
    /**
     * Represents the modal backdrop.
     */
    exports.VexModalBackdrop = (function () {
        function VexModalBackdrop(dialog, _modal) {
            this.dialog = dialog;
            this._modal = _modal;
            this.hs = {};
            dialogRefCount++;
            document.body.classList.add('vex-open');
            if (dialog.inElement) {
                this.hs.ps = 'absolute';
                this.hs.sz = '100%';
                this.hs.pt = 0;
            }
        }
        Object.defineProperty(VexModalBackdrop.prototype, "cssClass", {
            get: function () {
                return "vex vex-theme-" + this.dialog.context.className;
            },
            enumerable: true,
            configurable: true
        });
        VexModalBackdrop.prototype.ngOnDestroy = function () {
            if (--dialogRefCount === 0) {
                document.body.classList.remove('vex-open');
            }
        };
        VexModalBackdrop.prototype.documentKeypress = function (event) {
            // check that this modal is the last in the stack.
            if (!this._modal.isTopMost(this.dialog))
                return;
            if (angular2Modal.supportsKey(event.keyCode, this.dialog.context.keyboard)) {
                this.dialog.dismiss();
            }
        };
        return VexModalBackdrop;
    }());
    exports.VexModalBackdrop = __decorate([
        _angular_core.Component({
            selector: 'modal-backdrop',
            host: {
                '[class.in-element]': 'dialog.inElement',
                '[style.position]': 'hs.ps',
                '[style.height]': 'hs.sz',
                '[style.width]': 'hs.sz',
                '[style.top]': 'hs.pt',
                '[style.left]': 'hs.pt',
                '[style.right]': 'hs.pt',
                '[style.bottom]': 'hs.pt',
                '(body:keydown)': 'documentKeypress($event)'
            },
            styleUrls: [
                './modal-backdrop.css'
            ],
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div [class]=\"cssClass\">\n    <div [class]=\"dialog.context.overlayClassName\"></div>\n    <modal-content></modal-content>    \n</div>"
        }),
        __metadata('design:paramtypes', [angular2Modal.DialogRef, Modal$1])
    ], exports.VexModalBackdrop);
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
    /**
     * A component that acts as a top level container for an open modal window.
     */
    exports.VexModalContent = (function () {
        function VexModalContent(dialog, _modal, _compileConfig, _cr) {
            this.dialog = dialog;
            this._modal = _modal;
            this._compileConfig = _compileConfig;
            this._cr = _cr;
            this.context = dialog.context;
        }
        VexModalContent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.dlgContainer.nativeElement) {
                this.dlgContainer.nativeElement.focus();
            }
            /*  TODO:
             In RC5 dynamic component creation is no longer async.
             Somewhere down the pipe of the created component a value change happens that fires
             a CD exception. setTimeout is a workaround that mimics the async behavior.
             Find out the error and remove setTimeout.
             */
            setTimeout(function () {
                _this.dialog.contentRef = angular2Modal.createComponent(_this._cr, _this._compileConfig.component, _this._viewContainer, _this._compileConfig.bindings);
            });
        };
        VexModalContent.prototype.onClickOutside = function () {
            // check that this modal is the last in the stack.
            if (this._modal.isTopMost(this.dialog) && !this.dialog.context.isBlocking)
                this.dialog.dismiss();
        };
        return VexModalContent;
    }());
    __decorate$1([
        _angular_core.ViewChild('dlgContainer'),
        __metadata$1('design:type', _angular_core.ElementRef)
    ], exports.VexModalContent.prototype, "dlgContainer", void 0);
    __decorate$1([
        _angular_core.ViewChild('modalDialog', { read: _angular_core.ViewContainerRef }),
        __metadata$1('design:type', _angular_core.ViewContainerRef)
    ], exports.VexModalContent.prototype, "_viewContainer", void 0);
    exports.VexModalContent = __decorate$1([
        _angular_core.Component({
            selector: 'modal-content',
            template: "<div tabindex=\"-1\" role=\"dialog\"\n      [class]=\"context.contentClassName\" (clickOutside)=\"onClickOutside()\" #dlgContainer>\n    <div style=\"display: none\" #modalDialog></div>    \n    <div *ngIf=\"context.showCloseButton\" \n         [class]=\"context.closeClassName\" \n         (click)=\"dialog.dismiss()\"></div>\n</div>",
            encapsulation: _angular_core.ViewEncapsulation.None,
        }),
        __metadata$1('design:paramtypes', [angular2Modal.DialogRef, Modal$1, angular2Modal.ModalCompileConfig, _angular_core.ComponentFactoryResolver])
    ], exports.VexModalContent);
    var DEFAULT_VALUES = {
        className: 'default',
        overlayClassName: 'vex-overlay',
        contentClassName: 'vex-content',
        closeClassName: 'vex-close'
    };
    var DEFAULT_SETTERS = [
        'className',
        'overlayClassName',
        'contentClassName',
        'closeClassName',
        'showCloseButton'
    ];
    var VEXModalContext = (function (_super) {
        __extends(VEXModalContext, _super);
        function VEXModalContext() {
            _super.apply(this, arguments);
        }
        return VEXModalContext;
    }(angular2Modal.ModalOpenContext));
    var VEXModalContextBuilder = (function (_super) {
        __extends(VEXModalContextBuilder, _super);
        function VEXModalContextBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, angular2Modal.extend(DEFAULT_VALUES, defaultValues || {}), angular2Modal.arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || VEXModalContext // https://github.com/Microsoft/TypeScript/issues/7234
            );
        }
        /**
         *
         * @aliasFor isBlocking
         */
        VEXModalContextBuilder.prototype.overlayClosesOnClick = function (value) {
            this[angular2Modal.privateKey('isBlocking')] = !value;
            return this;
        };
        return VEXModalContextBuilder;
    }(angular2Modal.ModalOpenContextBuilder));
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return (c > 3 && r && Object.defineProperty(target, key, r), r);
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    /**
     * A Dialog is a
     */
    exports.VEXDialogButtons = (function () {
        function VEXDialogButtons() {
            /**
             * Emitted when a button was clicked
             * @type {EventEmitter<VEXButtonClickEvent>}
             */
            this.onButtonClick = new _angular_core.EventEmitter();
        }
        VEXDialogButtons.prototype.onClick = function (btn, $event) {
            $event.stopPropagation();
            this.onButtonClick.emit({ btn: btn, $event: $event });
        };
        return VEXDialogButtons;
    }());
    __decorate$2([
        _angular_core.Input(),
        __metadata$2('design:type', Array)
    ], exports.VEXDialogButtons.prototype, "buttons", void 0);
    __decorate$2([
        _angular_core.Output(),
        __metadata$2('design:type', Object)
    ], exports.VEXDialogButtons.prototype, "onButtonClick", void 0);
    exports.VEXDialogButtons = __decorate$2([
        _angular_core.Component({
            selector: 'vex-dialog-buttons',
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div class=\"vex-dialog-buttons\">\n    <button type=\"button\" \n         *ngFor=\"let btn of buttons;\"\n         [class]=\"btn.cssClass\"\n         (click)=\"onClick(btn, $event)\">{{btn.caption}}</button>\n</div>"
        }),
        __metadata$2('design:paramtypes', [])
    ], exports.VEXDialogButtons);
    /**
     * A Dialog with customized buttons wrapped in a form.
     *
     */
    exports.DialogFormModal = (function () {
        function DialogFormModal(dialog, _compileConfig, _cr) {
            this.dialog = dialog;
            this._compileConfig = _compileConfig;
            this._cr = _cr;
            this.context = dialog.context;
        }
        DialogFormModal.prototype.ngAfterViewInit = function () {
            var _this = this;
            /*  TODO:
             In RC5 dynamic component creation is no longer async.
             Somewhere down the pipe of the created component a value change happens that fires
             a CD exception. setTimeout is a workaround that mimics the async behavior.
             Find out the error and remove setTimeout.
             */
            setTimeout(function () {
                _this.dialog.contentRef = angular2Modal.createComponent(_this._cr, _this.context.content, _this._viewContainer, _this._compileConfig.bindings);
            });
        };
        DialogFormModal.prototype.onButtonClick = function ($event) {
            $event.btn.onClick(this, $event.$event);
        };
        return DialogFormModal;
    }());
    __decorate$2([
        _angular_core.ViewChild('modalDialog', { read: _angular_core.ViewContainerRef }),
        __metadata$2('design:type', _angular_core.ViewContainerRef)
    ], exports.DialogFormModal.prototype, "_viewContainer", void 0);
    exports.DialogFormModal = __decorate$2([
        _angular_core.Component({
            selector: 'modal-dialog',
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<form class=\"vex-dialog-form\">\n    <div style=\"display: none\" #modalDialog></div> \n    <vex-dialog-buttons [buttons]=\"context.buttons\"\n                        (onButtonClick)=\"onButtonClick($event)\"></vex-dialog-buttons>\n</form>"
        }),
        __metadata$2('design:paramtypes', [angular2Modal.DialogRef, angular2Modal.ModalCompileConfig, _angular_core.ComponentFactoryResolver])
    ], exports.DialogFormModal);
    exports.FormDropIn = (function () {
        function FormDropIn(dialog) {
            this.dialog = dialog;
            this.context = dialog.context;
        }
        return FormDropIn;
    }());
    exports.FormDropIn = __decorate$2([
        _angular_core.Component({
            selector: 'drop-in-dialog',
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div class=\"vex-dialog-message\">{{context.message}}</div>\n    <div *ngIf=\"context.showInput\" class=\"vex-dialog-input\">\n        <input autofocus #input\n               name=\"vex\" \n               type=\"text\" \n               class=\"vex-dialog-prompt-input\"\n               (change)=\"context.defaultResult = input.value\"               \n               placeholder=\"{{context.placeholder}}\">\n    </div>"
        }),
        __metadata$2('design:paramtypes', [angular2Modal.DialogRef])
    ], exports.FormDropIn);
    var DEFAULT_SETTERS$2 = [
        'content'
    ];
    /**
     * Data definition
     */
    var DialogPreset = (function (_super) {
        __extends(DialogPreset, _super);
        function DialogPreset() {
            _super.apply(this, arguments);
        }
        return DialogPreset;
    }(VEXModalContext));
    /**
     * A Preset representing the configuration needed to open MessageModal.
     * This is an abstract implementation with no concrete behaviour.
     * Use derived implementation.
     */
    var DialogPresetBuilder = (function (_super) {
        __extends(DialogPresetBuilder, _super);
        function DialogPresetBuilder(modal, defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, angular2Modal.extend({ modal: modal, component: exports.DialogFormModal, buttons: [], defaultResult: true }, defaultValues || {}), angular2Modal.arrayUnion(DEFAULT_SETTERS$2, initialSetters || []), baseType || DialogPreset // https://github.com/Microsoft/TypeScript/issues/7234
            );
        }
        DialogPresetBuilder.prototype.addButton = function (css, caption, onClick) {
            var btn = {
                cssClass: css,
                caption: caption,
                onClick: onClick
            };
            var key = angular2Modal.privateKey('buttons');
            this[key].push(btn);
            return this;
        };
        DialogPresetBuilder.prototype.addOkButton = function (text) {
            if (text === void 0) { text = 'OK'; }
            this.addButton('vex-dialog-button-primary vex-dialog-button vex-first', text, function (cmp, $event) { return cmp.dialog.close(cmp.dialog.context.defaultResult); });
            return this;
        };
        DialogPresetBuilder.prototype.addCancelButton = function (text) {
            if (text === void 0) { text = 'CANCEL'; }
            this.addButton('vex-dialog-button-secondary vex-dialog-button vex-last', text, function (cmp, $event) { return cmp.dialog.dismiss(); });
            return this;
        };
        return DialogPresetBuilder;
    }(VEXModalContextBuilder));
    var DEFAULT_VALUES$1 = {
        component: exports.DialogFormModal,
        content: exports.FormDropIn,
        okBtn: 'OK',
        cancelBtn: 'Cancel'
    };
    var DEFAULT_SETTERS$1 = [
        'okBtn',
        'cancelBtn',
        'placeholder',
        'showCloseButton'
    ];
    /**
     * Data definition
     */
    var DropInPreset = (function (_super) {
        __extends(DropInPreset, _super);
        function DropInPreset() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(DropInPreset.prototype, "showInput", {
            get: function () {
                return this.dropInType === angular2Modal.DROP_IN_TYPE.prompt;
            },
            enumerable: true,
            configurable: true
        });
        return DropInPreset;
    }(DialogPreset));
    /**
     * A Preset representing all 3 drop ins (alert, prompt, confirm)
     */
    var Builder = (function (_super) {
        __extends(Builder, _super);
        function Builder(modal, dropInType, defaultValues) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            _super.call(this, modal, angular2Modal.extend(angular2Modal.extend({ modal: modal, dropInType: dropInType }, DEFAULT_VALUES$1), defaultValues || {}), DEFAULT_SETTERS$1, DropInPreset);
        }
        Builder.prototype.$$beforeOpen = function (config) {
            if (config.okBtn) {
                this.addOkButton(config.okBtn);
            }
            switch (config.dropInType) {
                case angular2Modal.DROP_IN_TYPE.prompt:
                    config.defaultResult = undefined;
                case angular2Modal.DROP_IN_TYPE.confirm:
                    if (config.cancelBtn) {
                        this.addCancelButton(config.cancelBtn);
                    }
                    break;
            }
            return _super.prototype.$$beforeOpen.call(this, config);
        };
        return Builder;
    }(DialogPresetBuilder));
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return (c > 3 && r && Object.defineProperty(target, key, r), r);
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    function getProviders() {
        return [
            { provide: angular2Modal.Modal, useClass: Modal$1 },
            { provide: Modal$1, useClass: Modal$1 },
            { provide: angular2Modal.ModalBackdropComponent, useValue: exports.VexModalBackdrop },
            { provide: angular2Modal.ModalDropInFactory, useValue: {
                    alert: function (modal) { return new Builder(modal, angular2Modal.DROP_IN_TYPE.alert, { isBlocking: false }); },
                    prompt: function (modal) { return new Builder(modal, angular2Modal.DROP_IN_TYPE.prompt, { isBlocking: true, keyboard: null }); },
                    confirm: function (modal) { return new Builder(modal, angular2Modal.DROP_IN_TYPE.confirm, { isBlocking: true, keyboard: null }); }
                } }
        ];
    }
    exports.VexModalModule = (function () {
        function VexModalModule() {
        }
        VexModalModule.getProviders = function () {
            return getProviders();
        };
        return VexModalModule;
    }());
    exports.VexModalModule = __decorate$3([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            declarations: [
                exports.VEXDialogButtons,
                exports.FormDropIn,
                exports.DialogFormModal,
                exports.VexModalBackdrop,
                exports.VexModalContent
            ],
            providers: getProviders(),
            entryComponents: [
                exports.VexModalBackdrop,
                exports.DialogFormModal,
                exports.FormDropIn
            ]
        }),
        __metadata$3('design:paramtypes', [])
    ], exports.VexModalModule);
    exports.Modal = Modal$1;
    exports.VEXModalContext = VEXModalContext;
    exports.VEXModalContextBuilder = VEXModalContextBuilder;
    exports.DropInPreset = DropInPreset;
    exports.DropInPresetBuilder = Builder;
    exports.DialogPreset = DialogPreset;
    exports.DialogPresetBuilder = DialogPresetBuilder;
    Object.defineProperty(exports, '__esModule', { value: true });
}));
