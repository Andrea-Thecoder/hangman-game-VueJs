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
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const configVariables_1 = require("@/configVariables");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const route = (0, vue_router_1.useRoute)();
const counterScore = (0, vue_1.ref)(0);
const scoreClass = (0, vue_1.computed)(() => {
    return {
        'text-warning': counterScore.value < 0 && counterScore.value > -100,
        'text-danger': counterScore.value <= -100
    };
});
const addScore = (event) => {
    counterScore.value += event.detail.score;
};
(0, vue_1.watch)(() => route.path, (newPath) => {
    if (configVariables_1.regexReset.test(newPath))
        counterScore.value = 0;
    if (configVariables_1.regexSummary.test(newPath)) {
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('sendSummaryScore', {
                detail: { score: counterScore.value },
                bubbles: true
            }));
        }, configVariables_1.dispachTimeBase);
    }
});
(0, vue_1.onMounted)(() => {
    document.addEventListener('score', addScore);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('score', addScore);
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ((__VLS_ctx.scoreClass)) }, });
    __VLS_styleScopedClasses = (scoreClass);
    (__VLS_ctx.counterScore);
    // @ts-ignore
    [scoreClass, counterScore,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                counterScore: counterScore,
                scoreClass: scoreClass,
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
