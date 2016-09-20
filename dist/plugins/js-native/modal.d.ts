/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Modal as BaseModal } from 'angular2-modal';
import { JSNativePresetBuilder } from './presets/js-native-preset';
export interface JSNativeModal extends BaseModal {
    alert(): JSNativePresetBuilder;
    prompt(): JSNativePresetBuilder;
    confirm(): JSNativePresetBuilder;
}
export declare const Modal: typeof BaseModal;
export declare type Modal = JSNativeModal;
