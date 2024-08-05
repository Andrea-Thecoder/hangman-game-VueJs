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
const countError = (0, vue_1.ref)(0);
const addError = (event) => {
    if (event.detail.error)
        countError.value++;
    if (countError.value === configVariables_1.maxError) {
        document.dispatchEvent(new CustomEvent('endGameCondition', {
            detail: { condition: "defeat" },
            bubbles: true
        }));
    }
};
(0, vue_1.watch)(() => route.path, (newPath) => {
    if (configVariables_1.regexReset.test(newPath))
        countError.value = 0;
    if (configVariables_1.regexSummary.test(newPath)) {
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('sendSummaryError', {
                detail: { error: countError.value },
                bubbles: true
            }));
        }, configVariables_1.dispachTimeBase);
    }
});
(0, vue_1.onMounted)(() => {
    document.addEventListener('doError', addError);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('doError', addError);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.countError);
    (__VLS_ctx.maxError);
    // @ts-ignore
    [countError, configVariables_1.maxError,];
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
                maxError: configVariables_1.maxError,
                countError: countError,
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
