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
export function extend(m1, m2) {
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
export function arrayUnion(arr1, arr2) {
    return arr1
        .concat(arr2.filter(v => arr1.indexOf(v) === -1));
}
/**
 * Returns true if the config supports a given key.
 * @param key
 * @returns {boolean}
 */
export function supportsKey(keyCode, config) {
    if (!Array.isArray(config))
        return config === null ? false : true;
    return config.indexOf(keyCode) > -1;
}
/**
 * Given an object representing a key/value map of css properties, returns a valid css string
 * representing the object.
 * Example:
 * console.log(toStyleString({
 *     position: 'absolute',
 *     width: '100%',
 *     height: '100%',
 *     top: '0',
 *     left: '0',
 *     right: '0',
 *     bottom: '0'
 * }));
 * // position:absolute;width:100%;height:100%;top:0;left:0;right:0;bottom:0
 * @param obj
 * @returns {string}
 */
export function toStyleString(obj) {
    return Object.getOwnPropertyNames(obj)
        .map(k => `${k}:${obj[k]}`)
        .join(';');
    // let objStr = JSON.stringify(obj);
    // return objStr.substr(1, objStr.length - 2)
    //     .replace(/,/g, ';')
    //     .replace(/"/g, '');
}
export class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
export function noop() { }

//# sourceMappingURL=utils.js.map
