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
const StarterGame_vue_1 = __importDefault(require("./subComponents/StarterGame.vue"));
const vue_1 = require("vue");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const starterValue = (0, vue_1.ref)(false);
const selectedLang = (0, vue_1.ref)("");
const classTouched = (0, vue_1.ref)(false);
const languageArray = [
    {
        data: "it",
        language: "Italiano"
    },
    {
        data: "en",
        language: "Inglese"
    }, {
        data: "fr",
        language: "Francese"
    }, {
        data: "es",
        language: "Spagnolo"
    }
];
const errorClassObj = (0, vue_1.computed)(() => ({
    'is-invalid': classTouched.value
}));
//inserimento dei return false/true è necessario per l'if nel controllo distart game.
const handleTouch = () => {
    if (selectedLang.value === "") {
        classTouched.value = true;
        return true;
    }
    else {
        classTouched.value = false;
        return false;
    }
};
const startGame = () => {
    if (handleTouch())
        return;
    starterValue.value = true;
};
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container p-3 widthmax") }, });
    if (!__VLS_ctx.starterValue) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("title") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
        // @ts-ignore
        [starterValue,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    }
    if (!__VLS_ctx.starterValue) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container form-group mt-5") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({ ...{ class: ("form-label") }, for: ("language"), });
        // @ts-ignore
        [starterValue,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({ ...{ onChange: (__VLS_ctx.handleTouch) }, value: ((__VLS_ctx.selectedLang)), ...{ class: ((__VLS_ctx.errorClassObj)) }, ...{ class: ("form-select form-select-sm bg-dark text-light") }, name: ("language"), id: ("language"), });
        __VLS_styleScopedClasses = (errorClassObj);
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ selected: (true), value: (""), });
        // @ts-ignore
        [handleTouch, selectedLang, errorClassObj,];
        for (const [{ data, language }] of __VLS_getVForSourceType((__VLS_ctx.languageArray))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((language)), value: ((data)), });
            (language);
            // @ts-ignore
            [languageArray,];
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("d-flex justify-content-center mt-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.startGame) }, ...{ class: ("btn btn-secondary") }, });
        // @ts-ignore
        [startGame,];
    }
    if (__VLS_ctx.starterValue) {
        // @ts-ignore
        [StarterGame_vue_1.default,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(StarterGame_vue_1.default, new StarterGame_vue_1.default({ languages: ((__VLS_ctx.selectedLang)), }));
        const __VLS_1 = __VLS_0({ languages: ((__VLS_ctx.selectedLang)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({ languages: ((__VLS_ctx.selectedLang)), }));
        // @ts-ignore
        [starterValue, selectedLang,];
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(StarterGame_vue_1.default, __VLS_1);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['p-3'];
        __VLS_styleScopedClasses['widthmax'];
        __VLS_styleScopedClasses['title'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['form-group'];
        __VLS_styleScopedClasses['mt-5'];
        __VLS_styleScopedClasses['form-label'];
        __VLS_styleScopedClasses['form-select'];
        __VLS_styleScopedClasses['form-select-sm'];
        __VLS_styleScopedClasses['bg-dark'];
        __VLS_styleScopedClasses['text-light'];
        __VLS_styleScopedClasses['d-flex'];
        __VLS_styleScopedClasses['justify-content-center'];
        __VLS_styleScopedClasses['mt-3'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-secondary'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                StaterGame: StarterGame_vue_1.default,
                starterValue: starterValue,
                selectedLang: selectedLang,
                languageArray: languageArray,
                errorClassObj: errorClassObj,
                handleTouch: handleTouch,
                startGame: startGame,
            };
        },
    });
}
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
;
