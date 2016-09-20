var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/platform-browser')) :
        typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/platform-browser'], factory) :
            (factory((global.angular2Modal = global.angular2Modal || {}), global.ng.core, global.Rx, global.ng.platformBrowser));
}(this, function (exports, _angular_core, rxjs_Subject, _angular_platformBrowser) {
    'use strict';
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    var PRIVATE_PREFIX = '$$';
    var RESERVED_REGEX = /^(\$\$).*/;
    function validateMethodName(name) {
        if (!name) {
            throw new Error("Illegal method name. Empty method name is not allowed");
        }
        else if (name in this) {
            throw new Error("A member name '" + name + "' already defined.");
        }
    }
    /**
     * Returns a list of assigned property names (non private)
     * @param subject
     * @returns {string[]}
     */
    function getAssignedPropertyNames(subject) {
        return Object.getOwnPropertyNames(subject)
            .filter(function (name) { return RESERVED_REGEX.test(name); })
            .map(function (name) { return name.substr(2); });
    }
    function privateKey(name) {
        return PRIVATE_PREFIX + name;
    }
    function objectDefinePropertyValue(obj, propertyName, value) {
        Object.defineProperty(obj, propertyName, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: value
        });
    }
    /**
     * Given a FluentAssign instance, apply all of the supplied default values so calling
     * instance.toJSON will return those values (does not create a setter function)
     * @param instance
     * @param defaultValues
     */
    function applyDefaultValues(instance, defaultValues) {
        Object.getOwnPropertyNames(defaultValues)
            .forEach(function (name) { return instance[privateKey(name)] = defaultValues[name]; });
    }
    /**
     * Create a function for setting a value for a property on a given object.
     * @param obj The object to apply the key & setter on.
     * @param propertyName The name of the property on the object
     * @param writeOnce If true will allow writing once (default: false)
     *
     * Example:
     * let obj = new FluentAssign<any>;
     * setAssignMethod(obj, 'myProp');
     * obj.myProp('someValue');
     * const result = obj.toJSON();
     * console.log(result); //{ myProp: 'someValue' }
     *
     *
     * let obj = new FluentAssign<any>;
     * setAssignMethod(obj, 'myProp', true); // applying writeOnce
     * obj.myProp('someValue');
     * obj.myProp('someValue'); // ERROR: Overriding config property 'myProp' is not allowed.
     */
    function setAssignMethod(obj, propertyName, writeOnce) {
        var _this = this;
        if (writeOnce === void 0) { writeOnce = false; }
        validateMethodName.call(obj, propertyName);
        var key = privateKey(propertyName);
        objectDefinePropertyValue(obj, propertyName, function (value) {
            if (writeOnce && _this.hasOwnProperty(key)) {
                throw new Error("Overriding config property '" + propertyName + "' is not allowed.");
            }
            obj[key] = value;
            return obj;
        });
    }
    /**
     * Create a function for setting a value that is an alias to an other setter function.
     * @param obj The object to apply the key & setter on.
     * @param propertyName The name of the property on the object
     * @param srcPropertyName The name of the property on the object this alias points to
     * @param hard If true, will set a readonly property on the object that returns
     *        the value of the source property. Default: false
     *
     * Example:
     * let obj = new FluentAssign<any> ;
     * setAssignMethod(obj, 'myProp');
     * setAssignAlias(obj, 'myPropAlias', 'myProp');
     * obj.myPropAlias('someValue');
     * const result = obj.toJSON();
     * console.log(result); //{ myProp: 'someValue' }
     * result.myPropAlias // undefined
     *
     *
     * let obj = new FluentAssign<any> ;
     * setAssignMethod(obj, 'myProp');
     * setAssignAlias(obj, 'myPropAlias', 'myProp', true); // setting a hard alias.
     * obj.myPropAlias('someValue');
     * const result = obj.toJSON();
     * console.log(result); //{ myProp: 'someValue' }
     * result.myPropAlias // someValue
     */
    function setAssignAlias(obj, propertyName, srcPropertyName, hard) {
        if (hard === void 0) { hard = false; }
        validateMethodName.call(obj, propertyName);
        objectDefinePropertyValue(obj, propertyName, function (value) {
            obj[srcPropertyName](value);
            return obj;
        });
        if (hard === true) {
            var key = privateKey(propertyName), srcKey_1 = privateKey(srcPropertyName);
            Object.defineProperty(obj, key, {
                configurable: false,
                enumerable: false,
                get: function () { return obj[srcKey_1]; }
            });
        }
    }
    /**
     * Represent a fluent API factory wrapper for defining FluentAssign instances.
     */
    var FluentAssignFactory = (function () {
        function FluentAssignFactory(fluentAssign) {
            this._fluentAssign =
                fluentAssign instanceof FluentAssign ? fluentAssign : new FluentAssign();
        }
        /**
         * Create a setter method on the FluentAssign instance.
         * @param name The name of the setter function.
         * @param defaultValue If set (not undefined) set's the value on the instance immediately.
         * @returns {FluentAssignFactory}
         */
        FluentAssignFactory.prototype.setMethod = function (name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            setAssignMethod(this._fluentAssign, name);
            if (defaultValue !== undefined) {
                this._fluentAssign[name](defaultValue);
            }
            return this;
        };
        Object.defineProperty(FluentAssignFactory.prototype, "fluentAssign", {
            /**
             * The FluentAssign instance.
             * @returns {FluentAssign<T>}
             */
            get: function () {
                return this._fluentAssign;
            },
            enumerable: true,
            configurable: true
        });
        return FluentAssignFactory;
    }());
    /**
     * Represent an object where every property is a function representing an assignment function.
     * Calling each function with a value will assign the value to the object and return the object.
     * Calling 'toJSON' returns an object with the same properties but this time representing the
     * assigned values.
     *
     * This allows setting an object in a fluent API manner.
     * Example:
     let fluent = new FluentAssign<any>(undefined, ['some', 'went']);
     fluent.some('thing').went('wrong').toJSON();
     // { some: 'thing', went: 'wrong' }
     */
    var FluentAssign = (function () {
        /**
         *
         * @param defaultValues An object representing default values for the underlying object.
         * @param initialSetters A list of initial setters for this FluentAssign.
         * @param baseType the class/type to create a new base. optional, {} is used if not supplied.
         */
        function FluentAssign(defaultValues, initialSetters, baseType) {
            var _this = this;
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            if (Array.isArray(defaultValues)) {
                defaultValues.forEach(function (d) { return applyDefaultValues(_this, d); });
            }
            else if (defaultValues) {
                applyDefaultValues(this, defaultValues);
            }
            if (Array.isArray(initialSetters)) {
                initialSetters.forEach(function (name) { return setAssignMethod(_this, name); });
            }
            if (baseType) {
                this.__fluent$base__ = baseType;
            }
        }
        /**
         * Returns a FluentAssignFactory<FluentAssign<T>> ready to define a FluentAssign type.
         * @param defaultValues An object representing default values for the instance.
         * @param initialSetters A list of initial setters for the instance.
         * @returns {FluentAssignFactory<T>}
         */
        FluentAssign.compose = function (defaultValues, initialSetters) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            return FluentAssign.composeWith(new FluentAssign(defaultValues, initialSetters));
        };
        /**
         * Returns a FluentAssignFactory<Z> where Z is an instance of FluentAssign<?> or a derived
         * class of it.
         * @param fluentAssign An instance of FluentAssign<?> or a derived class of FluentAssign<?>.
         * @returns {any}
         */
        FluentAssign.composeWith = function (fluentAssign) {
            return new FluentAssignFactory(fluentAssign);
        };
        FluentAssign.prototype.toJSON = function () {
            var _this = this;
            return getAssignedPropertyNames(this)
                .reduce(function (obj, name) {
                var key = privateKey(name);
                // re-define property descriptors (we dont want their value)
                var propDesc = Object.getOwnPropertyDescriptor(_this, key);
                if (propDesc) {
                    Object.defineProperty(obj, name, propDesc);
                }
                else {
                    obj[name] = _this[key];
                }
                return obj;
            }, this.__fluent$base__ ? new this.__fluent$base__() : {});
        };
        return FluentAssign;
    }());
    function createComponent(cfr, type, vcr, bindings) {
        return vcr.createComponent(cfr.resolveComponentFactory(type), vcr.length, getInjector(vcr, bindings));
    }
    function getInjector(viewContainer, bindings) {
        var ctxInjector = viewContainer.parentInjector;
        return Array.isArray(bindings) && bindings.length > 0 ?
            _angular_core.ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
    }
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    /**
     * Simple object extend
     * @param m1
     * @param m2
     * @returns {{}}
     */
    function extend(m1, m2) {
        var m = {};
        for (var attr in m1) {
            if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
            }
        }
        for (var attr in m2) {
            if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
            }
        }
        return m;
    }
    /**
     * Simple, not optimized, array union of unique values.
     * @param arr1
     * @param arr2
     * @returns {T[]|any[]|any[][]|any[]}
     */
    function arrayUnion(arr1, arr2) {
        return arr1
            .concat(arr2.filter(function (v) { return arr1.indexOf(v) === -1; }));
    }
    /**
     * Returns true if the config supports a given key.
     * @param key
     * @returns {boolean}
     */
    function supportsKey(keyCode, config) {
        if (!Array.isArray(config))
            return config === null ? false : true;
        return config.indexOf(keyCode) > -1;
    }
    var PromiseCompleter = (function () {
        function PromiseCompleter() {
            var _this = this;
            this.promise = new Promise(function (res, rej) {
                _this.resolve = res;
                _this.reject = rej;
            });
        }
        return PromiseCompleter;
    }());
    function noop() { }
    /**
     * API to an open modal window.
     */
    var DialogRef = (function () {
        function DialogRef(context) {
            this.context = context;
            this._resultDeferred = new PromiseCompleter();
            this._onDestroy = new rxjs_Subject.Subject();
            this.onDestroy = this._onDestroy.asObservable();
        }
        Object.defineProperty(DialogRef.prototype, "result", {
            /**
             * A Promise that is resolved on a close event and rejected on a dismiss event.
             * @returns {Promise<T>|any|*|Promise<any>}
             */
            get: function () {
                return this._resultDeferred.promise;
            },
            enumerable: true,
            configurable: true
        });
        /**
         *  Close the modal with a return value, i.e: result.
         */
        DialogRef.prototype.close = function (result) {
            var _this = this;
            if (result === void 0) { result = null; }
            var _close = function () {
                _this.destroy();
                _this._resultDeferred.resolve(result);
            };
            this._fireHook('beforeClose')
                .then(function (value) { return value !== true && _close(); })
                .catch(_close);
        };
        /**
         *  Close the modal without a return value, i.e: cancelled.
         *  This call is automatically invoked when a user either:
         *  - Presses an exit keyboard key (if configured).
         *  - Clicks outside of the modal window (if configured).
         *  Usually, dismiss represent a Cancel button or a X button.
         */
        DialogRef.prototype.dismiss = function () {
            var _this = this;
            var _dismiss = function () {
                _this.destroy();
                _this._resultDeferred.reject();
            };
            this._fireHook('beforeDismiss')
                .then(function (value) { return value !== true && _dismiss(); })
                .catch(_dismiss);
        };
        DialogRef.prototype.destroy = function () {
            this._onDestroy.next(null);
            this._onDestroy.complete();
        };
        DialogRef.prototype._fireHook = function (name) {
            var instance = this.contentRef && this.contentRef.instance, fn = instance && typeof instance[name] === 'function' && instance[name];
            return Promise.resolve(fn ? fn.call(instance) : false);
        };
        return DialogRef;
    }());
    exports.DROP_IN_TYPE;
    (function (DROP_IN_TYPE) {
        DROP_IN_TYPE[DROP_IN_TYPE["alert"] = 0] = "alert";
        DROP_IN_TYPE[DROP_IN_TYPE["prompt"] = 1] = "prompt";
        DROP_IN_TYPE[DROP_IN_TYPE["confirm"] = 2] = "confirm";
    })(exports.DROP_IN_TYPE || (exports.DROP_IN_TYPE = {}));
    var ModalCompileConfig = (function () {
        function ModalCompileConfig(component, bindings) {
            this.component = component;
            this.bindings = bindings;
        }
        return ModalCompileConfig;
    }());
    var ModalRenderer = (function () {
        function ModalRenderer() {
        }
        return ModalRenderer;
    }());
    var ModalBackdropComponent = (function (_super) {
        __extends(ModalBackdropComponent, _super);
        function ModalBackdropComponent() {
            _super.apply(this, arguments);
        }
        return ModalBackdropComponent;
    }(_angular_core.Type));
    var ModalDropInFactory = (function () {
        function ModalDropInFactory() {
        }
        return ModalDropInFactory;
    }());
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
    exports.DOMModalRenderer = (function () {
        function DOMModalRenderer(_cr) {
            this._cr = _cr;
        }
        DOMModalRenderer.prototype.render = function (type, viewContainer, bindings, dialog) {
            var cmpRef = createComponent(this._cr, type, viewContainer, bindings);
            if (dialog.inElement) {
                viewContainer.element.nativeElement.appendChild(cmpRef.location.nativeElement);
            }
            else {
                document.body.appendChild(cmpRef.location.nativeElement);
            }
            dialog.onDestroy.subscribe(function () {
                if (typeof cmpRef.instance.canDestroy === 'function') {
                    cmpRef.instance.canDestroy().then(function () { return cmpRef.destroy(); });
                }
                else {
                    cmpRef.destroy();
                }
            });
            return dialog;
        };
        return DOMModalRenderer;
    }());
    exports.DOMModalRenderer = __decorate([
        _angular_core.Injectable(),
        __metadata('design:paramtypes', [_angular_core.ComponentFactoryResolver])
    ], exports.DOMModalRenderer);
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    /**
     * A dumb stack implementation over an array.
     */
    var DialogRefStack = (function () {
        function DialogRefStack() {
            this._stack = [];
        }
        DialogRefStack.prototype.push = function (dialogRef) {
            var idx = this._stack.indexOf(dialogRef);
            if (idx === -1)
                this._stack.push(dialogRef);
        };
        /**
         * Push a DialogRef into the stack and manage it so when it's done
         * it will automatically kick itself out of the stack.
         * @param dialogRef
         */
        DialogRefStack.prototype.pushManaged = function (dialogRef) {
            this.push(dialogRef);
        };
        DialogRefStack.prototype.pop = function () {
            this._stack.pop();
        };
        /**
         * Remove a DialogRef from the stack.
         * @param dialogRef
         */
        DialogRefStack.prototype.remove = function (dialogRef) {
            var idx = this._stack.indexOf(dialogRef);
            if (idx > -1)
                this._stack.splice(idx, 1);
        };
        DialogRefStack.prototype.index = function (index) {
            return this._stack[index];
        };
        DialogRefStack.prototype.indexOf = function (dialogRef) {
            return this._stack.indexOf(dialogRef);
        };
        Object.defineProperty(DialogRefStack.prototype, "length", {
            get: function () {
                return this._stack.length;
            },
            enumerable: true,
            configurable: true
        });
        return DialogRefStack;
    }());
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
    var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
    var _stack = new DialogRefStack();
    var unsupportedDropIn = function () {
        throw new Error('Unsupported Drop-in.');
    };
    var UnsupportedDropInFactory = {
        alert: unsupportedDropIn,
        prompt: unsupportedDropIn,
        confirm: unsupportedDropIn
    };
    function normalizeDropInFactory(dropInFactory) {
        if (!dropInFactory)
            return UnsupportedDropInFactory;
        return ['alert', 'prompt', 'confirm']
            .reduce(function (dif, key) {
            if (typeof dif[key] !== 'function')
                dif[key] = unsupportedDropIn;
            return dif;
        }, dropInFactory);
    }
    var Modal_1;
    exports.Modal = Modal_1 = (function () {
        function Modal(_modalRenderer, _backdrop, _dropIn) {
            this._modalRenderer = _modalRenderer;
            this._backdrop = _backdrop;
            this._dropIn = normalizeDropInFactory(_dropIn);
        }
        Modal.prototype.alert = function () {
            return this._dropIn.alert(this);
        };
        Modal.prototype.prompt = function () {
            return this._dropIn.prompt(this);
        };
        Modal.prototype.confirm = function () {
            return this._dropIn.confirm(this);
        };
        /**
         * Opens a modal window inside an existing component.
         * If
         * @param componentType The angular Component to render as the modal content.
         * @param bindings Resolved providers that will inject into the component provided.
         * @param context The context for the modal, attached to the dialog instance, DialogRef.context.
         *        Default: {}
         * @param viewContainer The element to block using the modal.
         *        Default: The value set in defaultViewContainer.
         * @param inside If true, render's the component inside the ViewContainerRef,
         *        otherwise render's the component in the root element (body in DOM)
         *        Default: true if ViewContainer supplied, false if not supplied.
         * @returns {Promise<DialogRef>}
         */
        Modal.prototype.open = function (componentType, context, bindings, viewContainer, inside) {
            if (context === void 0) { context = undefined; }
            if (bindings === void 0) { bindings = undefined; }
            if (viewContainer === void 0) { viewContainer = undefined; }
            inside = inside === undefined ? !!viewContainer : !!inside;
            if (!viewContainer) {
                if (!this.defaultViewContainer) {
                    throw new Error('defaultViewContainer not set.');
                }
                viewContainer = this.defaultViewContainer;
            }
            if (context) {
                context.normalize();
            }
            var dialog = new DialogRef(context || {});
            dialog.inElement = inside;
            var compileConfig = new ModalCompileConfig(componentType, bindings || []);
            var b = _angular_core.ReflectiveInjector.resolve([
                { provide: Modal_1, useValue: this },
                { provide: ModalRenderer, useValue: this._modalRenderer },
                { provide: DialogRef, useValue: dialog },
                { provide: ModalCompileConfig, useValue: compileConfig }
            ]);
            this._modalRenderer.render(this._backdrop, viewContainer, b, dialog);
            _stack.pushManaged(dialog);
            dialog.onDestroy.subscribe(function () { return _stack.remove(dialog); });
            return Promise.resolve(dialog);
        };
        /**
         * Check if a given DialogRef is the top most ref in the stack.
         * TODO: distinguish between body modal vs in element modal.
         * @param dialogRef
         * @returns {boolean}
         */
        Modal.prototype.isTopMost = function (dialogRef) {
            return _stack.indexOf(dialogRef) === _stack.length - 1;
        };
        Modal.prototype.stackPosition = function (dialogRef) {
            return _stack.indexOf(dialogRef);
        };
        Object.defineProperty(Modal.prototype, "stackLength", {
            get: function () {
                return _stack.length;
            },
            enumerable: true,
            configurable: true
        });
        return Modal;
    }());
    exports.Modal = Modal_1 = __decorate$1([
        _angular_core.Injectable(),
        __param(2, _angular_core.Optional()),
        __metadata$1('design:paramtypes', [ModalRenderer, ModalBackdropComponent, ModalDropInFactory])
    ], exports.Modal);
    /**
     * angular2-modal - Angular2 Modal (dialog) window.
     * @version v1.1.1
     * @link https://github.com/shlomiassaf/angular2-modal
     * @license MIT
     */
    // heavily inspired by:
    // http://www.bennadel.com/blog/3025-creating-custom-dom-and-host-event-bindings-in-angular-2-beta-6.htm
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
    var eventMap = {
        clickOutside: 'click',
        mousedownOutside: 'mousedown',
        mouseupOutside: 'mouseup',
        mousemoveOutside: 'mousemove'
    };
    /**
     * An event handler factory for event handlers that bubble the event to a given handler
     * if the event target is not an ancestor of the given element.
     * @param element
     * @param handler
     * @returns {function(any): undefined}
     */
    function bubbleNonAncestorHandlerFactory(element, handler) {
        return function (event) {
            var current = event.target;
            do {
                if (current === element) {
                    return;
                }
            } while (current.parentNode && (current = current.parentNode));
            handler(event);
        };
    }
    var DOMOutsideEventPlugin = (function () {
        function DOMOutsideEventPlugin() {
            // TODO: use DI factory for this.
            if (!document || typeof document.addEventListener !== 'function') {
                this.addEventListener = noop;
            }
        }
        DOMOutsideEventPlugin.prototype.supports = function (eventName) {
            return eventMap.hasOwnProperty(eventName);
        };
        DOMOutsideEventPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var zone = this.manager.getZone();
            // A Factory that registers the event on the document, instead of the element.
            // the handler is created at runtime, and it acts as a propagation/bubble predicate, it will
            // bubble up the event (i.e: execute our original event handler) only if the event targer
            // is an ancestor of our element.
            // The event is fired inside the angular zone so change detection can kick into action.
            var onceOnOutside = function () {
                var listener = bubbleNonAncestorHandlerFactory(element, function (evt) { return zone.runGuarded(function () { return handler(evt); }); });
                // mimic BrowserDomAdapter.onAndCancel
                document.addEventListener(eventMap[eventName], listener, false);
                return function () { return document.removeEventListener(eventMap[eventName], listener, false); };
            };
            // we run the event registration for the document in a different zone, this will make sure
            // change detection is off.
            // It turns out that if a component that use DOMOutsideEventPlugin is built from a click
            // event, we might get here before the event reached the document, causing a quick false
            // positive handling (when stopPropagation() was'nt invoked). To workaround this we wait
            // for the next vm turn and register.
            // Event registration returns a dispose function for that event, angular use it to clean
            // up after component get's destroyed. Since we need to return a dispose function
            // synchronously we have to put a wrapper for it since we will get it asynchronously,
            // i.e: after we need to return it.
            //
            return zone.runOutsideAngular(function () {
                var fn;
                setTimeout(function () { return fn = onceOnOutside(); }, 0);
                return function () { return fn(); };
            });
        };
        DOMOutsideEventPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
            throw 'not supported';
        };
        return DOMOutsideEventPlugin;
    }());
    DOMOutsideEventPlugin = __decorate$2([
        _angular_core.Injectable(),
        __metadata$2('design:paramtypes', [])
    ], DOMOutsideEventPlugin);
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
    var DEFAULT_VALUES = {
        isBlocking: true,
        keyboard: [27],
        supportsKey: function supportsKey(keyCode) {
            return this.keyboard.indexOf(keyCode) > -1;
        }
    };
    var DEFAULT_SETTERS = [
        'isBlocking',
        'keyboard',
        'message'
    ];
    var ModalContext = (function () {
        function ModalContext() {
        }
        ModalContext.prototype.normalize = function () {
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
        };
        return ModalContext;
    }());
    /**
     * A core context builder for a modal window instance, used to define the context upon
     * a modal choose it's behaviour.
     */
    exports.ModalContextBuilder = (function (_super) {
        __extends(ModalContextBuilder, _super);
        function ModalContextBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, extend(DEFAULT_VALUES, defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
        }
        return ModalContextBuilder;
    }(FluentAssign));
    exports.ModalContextBuilder = __decorate$3([
        _angular_core.Injectable(),
        __metadata$3('design:paramtypes', [Object, Array, Function])
    ], exports.ModalContextBuilder);
    var DEFAULT_SETTERS$1 = [
        'component'
    ];
    var ModalOpenContext = (function (_super) {
        __extends(ModalOpenContext, _super);
        function ModalOpenContext() {
            _super.apply(this, arguments);
        }
        return ModalOpenContext;
    }(ModalContext));
    /**
     * A Modal Context that knows about the modal service, and so can open a modal window on demand.
     * Use the fluent API to configure the preset and then invoke the 'open' method to open a modal
     * based on the context.
     */
    var ModalOpenContextBuilder = (function (_super) {
        __extends(ModalOpenContextBuilder, _super);
        function ModalOpenContextBuilder(defaultValues, initialSetters, baseType) {
            if (defaultValues === void 0) { defaultValues = undefined; }
            if (initialSetters === void 0) { initialSetters = undefined; }
            if (baseType === void 0) { baseType = undefined; }
            _super.call(this, defaultValues || {}, arrayUnion(DEFAULT_SETTERS$1, initialSetters || []), baseType);
        }
        /**
         * Hook to alter config and return bindings.
         * @param config
         */
        ModalOpenContextBuilder.prototype.$$beforeOpen = function (config) {
            return [];
        };
        /**
         * Open a modal window based on the configuration of this config instance.
         * @param viewContainer If set opens the modal inside the supplied viewContainer
         * @returns Promise<DialogRef>
         */
        ModalOpenContextBuilder.prototype.open = function (viewContainer) {
            var config = this.toJSON();
            if (!(config.modal instanceof exports.Modal)) {
                return Promise.reject(new Error('Configuration Error: modal service not set.'));
            }
            var bindings = typeof this.$$beforeOpen === 'function' && this.$$beforeOpen(config);
            return config.modal.open(config.component, config, bindings, viewContainer);
        };
        return ModalOpenContextBuilder;
    }(exports.ModalContextBuilder));
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
    var ModalModule_1;
    exports.ModalModule = ModalModule_1 = (function () {
        function ModalModule() {
        }
        ModalModule.forRoot = function () {
            return {
                ngModule: ModalModule_1,
                providers: [
                    { provide: ModalRenderer, useClass: exports.DOMModalRenderer },
                    { provide: _angular_platformBrowser.EVENT_MANAGER_PLUGINS, useClass: DOMOutsideEventPlugin, multi: true },
                ]
            };
        };
        return ModalModule;
    }());
    exports.ModalModule = ModalModule_1 = __decorate$4([
        _angular_core.NgModule({}),
        __metadata$4('design:paramtypes', [])
    ], exports.ModalModule);
    exports.createComponent = createComponent;
    exports.extend = extend;
    exports.arrayUnion = arrayUnion;
    exports.supportsKey = supportsKey;
    exports.DialogRef = DialogRef;
    exports.ModalDropInFactory = ModalDropInFactory;
    exports.ModalBackdropComponent = ModalBackdropComponent;
    exports.ModalCompileConfig = ModalCompileConfig;
    exports.ModalRenderer = ModalRenderer;
    exports.DEFAULT_VALUES = DEFAULT_VALUES;
    exports.ModalContext = ModalContext;
    exports.ModalOpenContext = ModalOpenContext;
    exports.ModalOpenContextBuilder = ModalOpenContextBuilder;
    exports.privateKey = privateKey;
    exports.setAssignMethod = setAssignMethod;
    exports.setAssignAlias = setAssignAlias;
    exports.FluentAssignFactory = FluentAssignFactory;
    exports.FluentAssign = FluentAssign;
    Object.defineProperty(exports, '__esModule', { value: true });
}));
