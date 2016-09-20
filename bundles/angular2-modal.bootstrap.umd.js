var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('angular2-modal'), require('@angular/core'), require('@angular/common')) :
        typeof define === 'function' && define.amd ? define(['exports', 'angular2-modal', '@angular/core', '@angular/common'], factory) :
            (factory((global.angular2Modal = global.angular2Modal || {}, global.angular2Modal.plugins = global.angular2Modal.plugins || {}, global.angular2Modal.plugins.bootstrap = global.angular2Modal.plugins.bootstrap || {}), global.angular2 - modal, global.ng.core, global.ng.common));
}(this, function (exports, angular2Modal, _angular_core, _angular_common) {
    'use strict';
    var DEFAULT_VALUES = {
        dialogClass: 'modal-dialog',
        showClose: false
    };
    var DEFAULT_SETTERS = [
        'dialogClass',
        'size',
        'showClose'
    ];
    var BSModalContext = (function (_super) {
        __extends(BSModalContext, _super);
        function BSModalContext() {
            _super.apply(this, arguments);
        }
        BSModalContext.prototype.normalize = function () {
            if (!this.dialogClass) {
                this.dialogClass = DEFAULT_VALUES.dialogClass;
            }
            _super.prototype.normalize.call(this);
        };
        return BSModalContext;
    }(angular2Modal.ModalOpenContext));
    var BSModalContextBuilder = (function (_super) {
        __extends(BSModalContextBuilder, _super);
        function BSModalContextBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, angular2Modal.extend(DEFAULT_VALUES, defaultValues || {}), angular2Modal.arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
            );
        }
        return BSModalContextBuilder;
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
    var dialogRefCount = 0;
    /**
     * Represents the modal backdrop.
     */
    exports.BSModalBackdrop = (function () {
        function BSModalBackdrop(dialog) {
            var _this = this;
            this.fadeState = 'in';
            this.hs = { ps: null, sz: null, pt: null };
            dialogRefCount++;
            document.body.classList.add('modal-open');
            if (dialog.inElement) {
                this.hs.ps = 'absolute';
                this.hs.sz = '100%';
                this.hs.pt = '0';
            }
            dialog.onDestroy.subscribe(function () { return _this.fadeState = 'out'; });
        }
        /**
         * Temp workaround for animation where destruction of the top level component does not
         * trigger child animations. Solution should be found either in animation module or in design
         * of the modal component tree.
         * @returns {Promise<void>}
         */
        BSModalBackdrop.prototype.canDestroy = function () {
            return new Promise(function (resolve) {
                setTimeout(function () { return resolve(); }, 310);
            });
        };
        BSModalBackdrop.prototype.ngOnDestroy = function () {
            if (--dialogRefCount === 0) {
                document.body.classList.remove('modal-open');
            }
        };
        return BSModalBackdrop;
    }());
    exports.BSModalBackdrop = __decorate([
        _angular_core.Component({
            selector: 'modal-backdrop',
            host: {
                '[style.position]': 'hs.ps',
                '[style.height]': 'hs.sz',
                '[style.width]': 'hs.sz',
                '[style.top]': 'hs.pt',
                '[style.left]': 'hs.pt',
                '[style.right]': 'hs.pt',
                '[style.bottom]': 'hs.pt'
            },
            animations: [
                _angular_core.trigger('fade', [
                    _angular_core.transition('void => in', [
                        _angular_core.animate('150ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 0 }),
                            _angular_core.style({ opacity: 0.5 })
                        ]))
                    ]),
                    _angular_core.state('out', _angular_core.style({ opacity: 0 })),
                    _angular_core.transition('* => out', [
                        _angular_core.animate('150ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 0.5 }),
                            _angular_core.style({ opacity: 0.5 })
                        ])),
                        _angular_core.animate('150ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 0.5 }),
                            _angular_core.style({ opacity: 0 }),
                        ]))
                    ])
                ])
            ],
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div [style.position]=\"hs.ps\" class=\"modal-backdrop in\" [@fade]=\"fadeState\"></div>\n<modal-container></modal-container>"
        }),
        __metadata('design:paramtypes', [angular2Modal.DialogRef])
    ], exports.BSModalBackdrop);
    var Modal$1 = angular2Modal.Modal;
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
    exports.BSModalContainer = (function () {
        function BSModalContainer(dialog, el, _compileConfig, _modal, _cr) {
            var _this = this;
            this.dialog = dialog;
            this.el = el;
            this._compileConfig = _compileConfig;
            this._modal = _modal;
            this._cr = _cr;
            this.fadeState = 'in';
            if (!dialog.inElement) {
                this.position = null;
            }
            else {
                this.position = 'absolute';
            }
            dialog.onDestroy.subscribe(function () { return _this.fadeState = 'out'; });
        }
        BSModalContainer.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.el.nativeElement) {
                this.el.nativeElement.focus();
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
        BSModalContainer.prototype.onClickOutside = function () {
            if (this._modal.isTopMost(this.dialog) && !this.dialog.context.isBlocking)
                this.dialog.dismiss();
        };
        BSModalContainer.prototype.documentKeypress = function (event) {
            // check that this modal is the last in the stack.
            if (!this._modal.isTopMost(this.dialog))
                return;
            if (angular2Modal.supportsKey(event.keyCode, this.dialog.context.keyboard)) {
                this.dialog.dismiss();
            }
        };
        return BSModalContainer;
    }());
    __decorate$1([
        _angular_core.ViewChild('modalDialog', { read: _angular_core.ViewContainerRef }),
        __metadata$1('design:type', _angular_core.ViewContainerRef)
    ], exports.BSModalContainer.prototype, "_viewContainer", void 0);
    exports.BSModalContainer = __decorate$1([
        _angular_core.Component({
            selector: 'modal-container',
            host: {
                'tabindex': '-1',
                'role': 'dialog',
                'class': 'modal',
                'style': 'display: block',
                '[style.position]': 'position',
                '(body:keydown)': 'documentKeypress($event)'
            },
            animations: [
                _angular_core.trigger('fade', [
                    _angular_core.transition('void => in', [
                        _angular_core.animate('100ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 0, transform: 'translate(0, -25%)' }),
                            _angular_core.style({ opacity: 0, transform: 'translate(0, -25%)' })
                        ])),
                        _angular_core.animate('300ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 0, transform: 'translate(0, -25%)', offset: 0 }),
                            _angular_core.style({ opacity: 1, transform: 'translate(0, -12.5%)', offset: 0.5 }),
                            _angular_core.style({ opacity: 1, transform: 'translate(0, 0)', offset: 1 })
                        ]))
                    ]),
                    _angular_core.state('out', _angular_core.style({ opacity: 0, transform: 'translate(0, -25%)' })),
                    _angular_core.transition('in => out', [
                        _angular_core.animate('150ms linear', _angular_core.keyframes([
                            _angular_core.style({ opacity: 1, transform: 'translate(0, 0)' }),
                            _angular_core.style({ opacity: 0, transform: 'translate(0, -12.5%)' }),
                        ]))
                    ])
                ])
            ],
            encapsulation: _angular_core.ViewEncapsulation.None,
            /* tslint:disable */
            template: "<div [ngClass]=\"dialog.context.dialogClass\" \n          [class.modal-lg]=\"dialog.context.size == 'lg'\"\n          [class.modal-sm]=\"dialog.context.size == 'sm'\"\n          [@fade]=\"fadeState\">\n         <div class=\"modal-content\"              \n              style=\"display:block\"              \n              role=\"document\"\n              (clickOutside)=\"onClickOutside()\">\n            <div style=\"display: none\" #modalDialog></div>\n         </div>\n    </div>"
        }),
        __metadata$1('design:paramtypes', [angular2Modal.DialogRef, _angular_core.ElementRef, angular2Modal.ModalCompileConfig, Modal$1, _angular_core.ComponentFactoryResolver])
    ], exports.BSModalContainer);
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
     * A Component representing a generic bootstrap modal content element.
     *
     * By configuring a MessageModalContext instance you can:
     *
     *  Header:
     *      - Set header container class (default: modal-header)
     *      - Set title text (enclosed in H3 element)
     *      - Set title html (overrides text)
     *
     *  Body:
     *      - Set body container class.  (default: modal-body)
     *      - Set body container HTML.
     *
     *  Footer:
     *      - Set footer class.  (default: modal-footer)
     *      - Set button configuration (from 0 to n)
     */
    exports.BSMessageModal = (function () {
        function BSMessageModal(dialog) {
            this.dialog = dialog;
            this.context = dialog.context;
        }
        BSMessageModal.prototype.onFooterButtonClick = function ($event) {
            $event.btn.onClick(this, $event.$event);
        };
        Object.defineProperty(BSMessageModal.prototype, "titleHtml", {
            get: function () {
                return this.context.titleHtml ? 1 : 0;
            },
            enumerable: true,
            configurable: true
        });
        return BSMessageModal;
    }());
    exports.BSMessageModal = __decorate$2([
        _angular_core.Component({
            selector: 'modal-content',
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div [ngClass]=\"context.headerClass\" [ngSwitch]=\"titleHtml\">\n        <button *ngIf=\"context.showClose\" type=\"button\" class=\"close\" \n                aria-label=\"Close\" (click)=\"dialog.dismiss()\">\n            <span aria-hidden=\"true\">\u00D7</span>\n        </button>\n        <div *ngSwitchCase=\"1\" [innerHtml]=\"context.titleHtml\"></div>\n        <h3 *ngSwitchDefault class=\"modal-title\">{{context.title}}</h3>\n    </div>\n    <div [ngClass]=\"context.bodyClass\" [innerHtml]=\"context.message\"></div>\n    <modal-footer [footerClass]=\"context.footerClass\" \n                  [buttons]=\"context.buttons\"\n                  (onButtonClick)=\"onFooterButtonClick($event)\"></modal-footer>"
        }),
        __metadata$2('design:paramtypes', [angular2Modal.DialogRef])
    ], exports.BSMessageModal);
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
    /**
     * Represents the modal footer for storing buttons.
     */
    exports.BSModalFooter = (function () {
        function BSModalFooter() {
            /**
             * Emitted when a button was clicked
             * @type {EventEmitter<FooterButtonClickEvent>}
             */
            this.onButtonClick = new _angular_core.EventEmitter();
        }
        BSModalFooter.prototype.onClick = function (btn, $event) {
            $event.stopPropagation();
            this.onButtonClick.emit({ btn: btn, $event: $event });
        };
        return BSModalFooter;
    }());
    __decorate$3([
        _angular_core.Input(),
        __metadata$3('design:type', String)
    ], exports.BSModalFooter.prototype, "footerClass", void 0);
    __decorate$3([
        _angular_core.Input(),
        __metadata$3('design:type', Array)
    ], exports.BSModalFooter.prototype, "buttons", void 0);
    __decorate$3([
        _angular_core.Output(),
        __metadata$3('design:type', Object)
    ], exports.BSModalFooter.prototype, "onButtonClick", void 0);
    exports.BSModalFooter = __decorate$3([
        _angular_core.Component({
            selector: 'modal-footer',
            encapsulation: _angular_core.ViewEncapsulation.None,
            template: "<div [ngClass]=\"footerClass\">\n    <button *ngFor=\"let btn of buttons;\"\n            [ngClass]=\"btn.cssClass\"\n            (click)=\"onClick(btn, $event)\">{{btn.caption}}</button>\n</div>"
        }),
        __metadata$3('design:paramtypes', [])
    ], exports.BSModalFooter);
    var DEFAULT_VALUES$1 = {
        component: exports.BSMessageModal,
        headerClass: 'modal-header',
        bodyClass: 'modal-body',
        footerClass: 'modal-footer'
    };
    var DEFAULT_SETTERS$1 = [
        'headerClass',
        'title',
        'titleHtml',
        'bodyClass',
        'footerClass'
    ];
    /**
     * A Preset representing the configuration needed to open MessageModal.
     * This is an abstract implementation with no concrete behaviour.
     * Use derived implementation.
     */
    var MessageModalPresetBuilder = (function (_super) {
        __extends(MessageModalPresetBuilder, _super);
        function MessageModalPresetBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, angular2Modal.extend(angular2Modal.extend({ buttons: [] }, DEFAULT_VALUES$1), defaultValues || {}), angular2Modal.arrayUnion(DEFAULT_SETTERS$1, initialSetters || []), baseType);
            angular2Modal.setAssignAlias(this, 'body', 'message', true);
        }
        MessageModalPresetBuilder.prototype.addButton = function (css, caption, onClick) {
            var btn = {
                cssClass: css,
                caption: caption,
                onClick: onClick
            };
            var key = angular2Modal.privateKey('buttons');
            this[key].push(btn);
            return this;
        };
        return MessageModalPresetBuilder;
    }(BSModalContextBuilder));
    /**
     * A Preset for a classic 1 button modal window.
     */
    var OneButtonPresetBuilder = (function (_super) {
        __extends(OneButtonPresetBuilder, _super);
        function OneButtonPresetBuilder(modal, defaultValues) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            _super.call(this, angular2Modal.extend({
                modal: modal,
                okBtn: 'OK',
                okBtnClass: 'btn btn-primary'
            }, defaultValues || {}), [
                'okBtn',
                'okBtnClass'
            ]);
        }
        OneButtonPresetBuilder.prototype.$$beforeOpen = function (config) {
            this.addButton(config.okBtnClass, config.okBtn, function (cmp, $event) { return cmp.dialog.close(true); });
            return _super.prototype.$$beforeOpen.call(this, config);
        };
        return OneButtonPresetBuilder;
    }(MessageModalPresetBuilder));
    /**
     * A Preset for a classic 2 button modal window.
     */
    var TwoButtonPresetBuilder = (function (_super) {
        __extends(TwoButtonPresetBuilder, _super);
        function TwoButtonPresetBuilder(modal, defaultValues) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            _super.call(this, angular2Modal.extend({
                modal: modal,
                okBtn: 'OK',
                okBtnClass: 'btn btn-primary',
                cancelBtn: 'Cancel',
                cancelBtnClass: 'btn btn-default'
            }, defaultValues || {}), [
                'okBtn',
                'okBtnClass',
                'cancelBtn',
                'cancelBtnClass'
            ]);
        }
        TwoButtonPresetBuilder.prototype.$$beforeOpen = function (config) {
            this.addButton(config.okBtnClass, config.okBtn, function (cmp, $event) { return cmp.dialog.close(true); })
                .addButton(config.cancelBtnClass, config.cancelBtn, function (cmp, $event) { return cmp.dialog.dismiss(); });
            return _super.prototype.$$beforeOpen.call(this, config);
        };
        return TwoButtonPresetBuilder;
    }(MessageModalPresetBuilder));
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return (c > 3 && r && Object.defineProperty(target, key, r), r);
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(k, v);
    };
    function getProviders() {
        return [
            { provide: angular2Modal.Modal, useClass: Modal$1 },
            { provide: Modal$1, useClass: Modal$1 },
            { provide: angular2Modal.ModalBackdropComponent, useValue: exports.BSModalBackdrop },
            { provide: angular2Modal.ModalDropInFactory, useValue: {
                    alert: function (modal) { return new OneButtonPresetBuilder(modal, { isBlocking: false }); },
                    prompt: function (modal) { return new OneButtonPresetBuilder(modal, { isBlocking: true, keyboard: null }); },
                    confirm: function (modal) { return new TwoButtonPresetBuilder(modal, { isBlocking: true, keyboard: null }); }
                } }
        ];
    }
    exports.BootstrapModalModule = (function () {
        function BootstrapModalModule() {
        }
        BootstrapModalModule.getProviders = function () {
            return getProviders();
        };
        return BootstrapModalModule;
    }());
    exports.BootstrapModalModule = __decorate$4([
        _angular_core.NgModule({
            imports: [_angular_common.CommonModule],
            declarations: [
                exports.BSModalFooter,
                exports.BSMessageModal,
                exports.BSModalBackdrop,
                exports.BSModalContainer
            ],
            providers: getProviders(),
            entryComponents: [
                exports.BSModalBackdrop,
                exports.BSMessageModal
            ]
        }),
        __metadata$4('design:paramtypes', [])
    ], exports.BootstrapModalModule);
    exports.BSModalContext = BSModalContext;
    exports.BSModalContextBuilder = BSModalContextBuilder;
    exports.MessageModalPresetBuilder = MessageModalPresetBuilder;
    exports.ModalOpenContext = angular2Modal.ModalOpenContext;
    exports.ModalOpenContextBuilder = angular2Modal.ModalOpenContextBuilder;
    exports.OneButtonPresetBuilder = OneButtonPresetBuilder;
    exports.TwoButtonPresetBuilder = TwoButtonPresetBuilder;
    exports.Modal = Modal$1;
    Object.defineProperty(exports, '__esModule', { value: true });
}));
