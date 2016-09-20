/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { privateKey, setAssignAlias, extend, arrayUnion } from "angular2-modal";
import { BSModalContextBuilder } from '../modal-context';
import { BSMessageModal } from '../message-modal';
const DEFAULT_VALUES = {
    component: BSMessageModal,
    headerClass: 'modal-header',
    bodyClass: 'modal-body',
    footerClass: 'modal-footer'
};
const DEFAULT_SETTERS = [
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
export class MessageModalPresetBuilder extends BSModalContextBuilder {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(extend(extend({ buttons: [] }, DEFAULT_VALUES), defaultValues || {}), arrayUnion(DEFAULT_SETTERS, initialSetters || []), baseType);
        setAssignAlias(this, 'body', 'message', true);
    }
    addButton(css, caption, onClick) {
        let btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        let key = privateKey('buttons');
        this[key].push(btn);
        return this;
    }
}

//# sourceMappingURL=message-modal-preset.js.map
