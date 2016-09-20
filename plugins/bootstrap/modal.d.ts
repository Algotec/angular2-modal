/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v1.1.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
import { Modal as BaseModal } from 'angular2-modal';
import { OneButtonPresetBuilder } from './../bootstrap/presets/one-button-preset';
import { TwoButtonPresetBuilder } from './../bootstrap/presets/two-button-preset';
export interface BSModal extends BaseModal {
    alert(): OneButtonPresetBuilder;
    prompt(): OneButtonPresetBuilder;
    confirm(): TwoButtonPresetBuilder;
}
export declare const Modal: typeof BaseModal;
export declare type Modal = BSModal;
