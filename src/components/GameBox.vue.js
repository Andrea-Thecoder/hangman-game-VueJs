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
const TextBox_vue_1 = __importDefault(require("./subComponents/TextBox.vue"));
const Keyboard_vue_1 = __importDefault(require("@/components/subComponents/Keyboard.vue"));
const vue_1 = require("vue");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const playerWord = (0, vue_1.ref)("");
const props = defineProps({
    lang: {
        type: String,
        required: true
    }
});
const travelWord = (payload) => {
    playerWord.value = payload.inputWord;
};
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    props: {
        lang: {
            type: String,
            required: true
        }
    },
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
    // @ts-ignore
    [TextBox_vue_1.default,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(TextBox_vue_1.default, new TextBox_vue_1.default({ lang: ((props.lang)), playerWord: ((__VLS_ctx.playerWord)), }));
    const __VLS_1 = __VLS_0({ lang: ((props.lang)), playerWord: ((__VLS_ctx.playerWord)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ lang: ((props.lang)), playerWord: ((__VLS_ctx.playerWord)), }));
    // @ts-ignore
    [playerWord,];
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(TextBox_vue_1.default, __VLS_1);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    // @ts-ignore
    [Keyboard_vue_1.default,];
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(Keyboard_vue_1.default, new Keyboard_vue_1.default({ ...{ 'onInputValue': {} }, }));
    const __VLS_6 = __VLS_5({ ...{ 'onInputValue': {} }, }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    ({}({ ...{ 'onInputValue': {} }, }));
    let __VLS_10;
    const __VLS_11 = {
        onInputValue: (__VLS_ctx.travelWord)
    };
    // @ts-ignore
    [travelWord,];
    const __VLS_9 = __VLS_pickFunctionalComponentCtx(Keyboard_vue_1.default, __VLS_6);
    let __VLS_7;
    let __VLS_8;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['mt-4'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                TextBox: TextBox_vue_1.default,
                Keyboard: Keyboard_vue_1.default,
                playerWord: playerWord,
                travelWord: travelWord,
            };
        },
        props: {
            lang: {
                type: String,
                required: true
            }
        },
    });
}
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
    props: {
        lang: {
            type: String,
            required: true
        }
    },
});
;
