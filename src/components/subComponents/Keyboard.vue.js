"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const simple_keyboard_1 = __importDefault(require("simple-keyboard"));
require("simple-keyboard/build/css/index.css");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const inputValue = (0, vue_1.ref)('');
const disabledKeys = (0, vue_1.ref)(new Set());
const emit = defineEmits();
let keyboard;
const onChange = (input) => {
    if (inputValue.value.length >= 1)
        return; //blocchiamo ad 1 carattere alla volta la possibile scelta!
    inputValue.value = input;
};
const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}")
        handleShift();
    if (button === "{enter}")
        handleEnter();
    if (button === "{bksp}")
        handleBackspace();
};
const handleShift = () => {
    const currentLayout = keyboard.options.layoutName ?? "default"; //operatore coalescenza nulla ?? serve in caso l'assegnazione produca un null/undefined allora gli assegna un valore predefinito, in questo modo sarà sempre di tipo string.
    keyboard.setOptions({
        layoutName: currentLayout === "default" ? "shift" : "default"
    });
};
const handleEnter = () => {
    if (inputValue.value.length === 0)
        return; //impossibilità di inviare un char vuoto.
    //console.log('Enter attivo', inputValue.value);
    emit('inputValue', { inputWord: inputValue.value });
    if (!disabledKeys.value.has(inputValue.value)) {
        disabledKeys.value.add(inputValue.value);
    }
    keyboard.setOptions({
        buttonTheme: getButtonTheme()
    });
    inputValue.value = '';
    keyboard.setInput('');
};
const handleBackspace = () => {
    keyboard.setInput('');
    inputValue.value = "";
};
const getButtonTheme = () => {
    const buttonTheme = [];
    disabledKeys.value.forEach((key) => {
        buttonTheme.push({
            class: "hg-button-disabled",
            buttons: key
        });
    });
    return buttonTheme;
};
(0, vue_1.onMounted)(() => {
    keyboard = new simple_keyboard_1.default(".simple-keyboard-container", {
        onChange: onChange,
        onKeyPress: onKeyPress,
        layout: {
            default: [
                "1 2 3 4 5 6 7 8 9 0 {bksp}",
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "{shift} z x c v b n m {enter}",
            ],
            shift: [
                "à á â ã ä å æ ç è é {bksp}",
                "ê ë ì í î ï ð ñ ò ó",
                "ô õ ö ø ù ú û ü ý þ ÿ",
                "{shift} à è ì ò ù é â ê î ô û {enter}",
            ]
        },
        display: {
            '{bksp}': 'Backspace',
            '{enter}': 'Enter',
            '{shift}': 'Shift',
        },
        buttonTheme: getButtonTheme()
    });
});
(0, vue_1.onBeforeUnmount)(() => {
    if (keyboard) {
        keyboard.destroy();
    }
});
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    emits: {},
});
let __VLS_functionalComponentProps;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container pb-2 pt-2 customWidth") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container custom") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onKeydown: () => { } }, value: ((__VLS_ctx.inputValue)), type: ("text"), readonly: (true), });
    // @ts-ignore
    [inputValue,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("simple-keyboard-container") }, });
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['pb-2'];
        __VLS_styleScopedClasses['pt-2'];
        __VLS_styleScopedClasses['customWidth'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['custom'];
        __VLS_styleScopedClasses['simple-keyboard-container'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                inputValue: inputValue,
            };
        },
        emits: {},
    });
}
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
    emits: {},
});
;
