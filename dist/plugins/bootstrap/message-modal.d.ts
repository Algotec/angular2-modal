/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { DialogRef, ModalComponent } from 'angular2-modal';
import { FooterButtonClickEvent } from './modal-footer';
import { MessageModalPreset } from './presets/message-modal-preset';
export interface BSMessageModalButtonHandler {
    (cmp: ModalComponent<MessageModalPreset>, $event: MouseEvent): void;
}
/**
 * Interface for button definition
 */
export interface BSMessageModalButtonConfig {
    cssClass: string;
    caption: string;
    onClick: BSMessageModalButtonHandler;
}
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
export declare class BSMessageModal implements ModalComponent<MessageModalPreset> {
    dialog: DialogRef<MessageModalPreset>;
    context: MessageModalPreset;
    constructor(dialog: DialogRef<MessageModalPreset>);
    onFooterButtonClick($event: FooterButtonClickEvent): void;
    titleHtml: number;
}
