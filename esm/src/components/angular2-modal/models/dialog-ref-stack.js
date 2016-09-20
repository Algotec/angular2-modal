/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
/**
 * A dumb stack implementation over an array.
 */
export class DialogRefStack {
    constructor() {
        this._stack = [];
    }
    push(dialogRef) {
        let idx = this._stack.indexOf(dialogRef);
        if (idx === -1)
            this._stack.push(dialogRef);
    }
    /**
     * Push a DialogRef into the stack and manage it so when it's done
     * it will automatically kick itself out of the stack.
     * @param dialogRef
     */
    pushManaged(dialogRef) {
        this.push(dialogRef);
    }
    pop() {
        this._stack.pop();
    }
    /**
     * Remove a DialogRef from the stack.
     * @param dialogRef
     */
    remove(dialogRef) {
        let idx = this._stack.indexOf(dialogRef);
        if (idx > -1)
            this._stack.splice(idx, 1);
    }
    index(index) {
        return this._stack[index];
    }
    indexOf(dialogRef) {
        return this._stack.indexOf(dialogRef);
    }
    get length() {
        return this._stack.length;
    }
}

//# sourceMappingURL=dialog-ref-stack.js.map
