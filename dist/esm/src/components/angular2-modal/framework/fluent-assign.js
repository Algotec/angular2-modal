/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
const PRIVATE_PREFIX = '$$';
const RESERVED_REGEX = /^(\$\$).*/;
function validateMethodName(name) {
    if (!name) {
        throw new Error(`Illegal method name. Empty method name is not allowed`);
    }
    else if (name in this) {
        throw new Error(`A member name '${name}' already defined.`);
    }
}
/**
 * Returns a list of assigned property names (non private)
 * @param subject
 * @returns {string[]}
 */
function getAssignedPropertyNames(subject) {
    return Object.getOwnPropertyNames(subject)
        .filter(name => RESERVED_REGEX.test(name))
        .map(name => name.substr(2));
}
export function privateKey(name) {
    return PRIVATE_PREFIX + name;
}
function objectDefinePropertyValue(obj, propertyName, value) {
    Object.defineProperty(obj, propertyName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value
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
        .forEach(name => instance[privateKey(name)] = defaultValues[name]);
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
export function setAssignMethod(obj, propertyName, writeOnce = false) {
    validateMethodName.call(obj, propertyName);
    const key = privateKey(propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        if (writeOnce && this.hasOwnProperty(key)) {
            throw new Error(`Overriding config property '${propertyName}' is not allowed.`);
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
export function setAssignAlias(obj, propertyName, srcPropertyName, hard = false) {
    validateMethodName.call(obj, propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        obj[srcPropertyName](value);
        return obj;
    });
    if (hard === true) {
        const key = privateKey(propertyName), srcKey = privateKey(srcPropertyName);
        Object.defineProperty(obj, key, {
            configurable: false,
            enumerable: false,
            get: () => obj[srcKey]
        });
    }
}
/**
 * Represent a fluent API factory wrapper for defining FluentAssign instances.
 */
export class FluentAssignFactory {
    constructor(fluentAssign) {
        this._fluentAssign =
            fluentAssign instanceof FluentAssign ? fluentAssign : new FluentAssign();
    }
    /**
     * Create a setter method on the FluentAssign instance.
     * @param name The name of the setter function.
     * @param defaultValue If set (not undefined) set's the value on the instance immediately.
     * @returns {FluentAssignFactory}
     */
    setMethod(name, defaultValue=undefined) {
        setAssignMethod(this._fluentAssign, name);
        if (defaultValue !== undefined) {
            this._fluentAssign[name](defaultValue);
        }
        return this;
    }
    /**
     * The FluentAssign instance.
     * @returns {FluentAssign<T>}
     */
    get fluentAssign() {
        return this._fluentAssign;
    }
}
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
export class FluentAssign {
    /**
     *
     * @param defaultValues An object representing default values for the underlying object.
     * @param initialSetters A list of initial setters for this FluentAssign.
     * @param baseType the class/type to create a new base. optional, {} is used if not supplied.
     */
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        if (Array.isArray(defaultValues)) {
            defaultValues.forEach(d => applyDefaultValues(this, d));
        }
        else if (defaultValues) {
            applyDefaultValues(this, defaultValues);
        }
        if (Array.isArray(initialSetters)) {
            initialSetters.forEach(name => setAssignMethod(this, name));
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
    static compose(defaultValues=undefined, initialSetters=undefined) {
        return FluentAssign.composeWith(new FluentAssign(defaultValues, initialSetters));
    }
    /**
     * Returns a FluentAssignFactory<Z> where Z is an instance of FluentAssign<?> or a derived
     * class of it.
     * @param fluentAssign An instance of FluentAssign<?> or a derived class of FluentAssign<?>.
     * @returns {any}
     */
    static composeWith(fluentAssign) {
        return new FluentAssignFactory(fluentAssign);
    }
    toJSON() {
        return getAssignedPropertyNames(this)
            .reduce((obj, name) => {
            const key = privateKey(name);
            // re-define property descriptors (we dont want their value)
            let propDesc = Object.getOwnPropertyDescriptor(this, key);
            if (propDesc) {
                Object.defineProperty(obj, name, propDesc);
            }
            else {
                obj[name] = this[key];
            }
            return obj;
        }, this.__fluent$base__ ? new this.__fluent$base__() : {});
    }
}

//# sourceMappingURL=fluent-assign.js.map
