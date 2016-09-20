/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Modal as BaseModal } from 'angular2-modal';
import { DropInPresetBuilder } from './presets/dropin-preset';
export interface VEXModal extends BaseModal {
    alert(): DropInPresetBuilder;
    prompt(): DropInPresetBuilder;
    confirm(): DropInPresetBuilder;
}
export declare const Modal: typeof BaseModal;
export declare type Modal = VEXModal;
