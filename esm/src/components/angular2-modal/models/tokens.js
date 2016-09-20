/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Type } from '@angular/core';
export var DROP_IN_TYPE;
(function (DROP_IN_TYPE) {
    DROP_IN_TYPE[DROP_IN_TYPE["alert"] = 0] = "alert";
    DROP_IN_TYPE[DROP_IN_TYPE["prompt"] = 1] = "prompt";
    DROP_IN_TYPE[DROP_IN_TYPE["confirm"] = 2] = "confirm";
})(DROP_IN_TYPE || (DROP_IN_TYPE = {}));
export class ModalCompileConfig {
    constructor(component, bindings) {
        this.component = component;
        this.bindings = bindings;
    }
}
export class ModalRenderer {
}
export class ModalBackdropComponent extends Type {
}
export class ModalDropInFactory {
}

//# sourceMappingURL=tokens.js.map
