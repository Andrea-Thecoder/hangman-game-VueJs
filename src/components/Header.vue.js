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
const TimerBox_vue_1 = __importDefault(require("./subComponents/TimerBox.vue"));
const ScoreBox_vue_1 = __importDefault(require("./subComponents/ScoreBox.vue"));
const ErrorCountBox_vue_1 = __importDefault(require("./subComponents/ErrorCountBox.vue"));
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const configVariables_1 = require("@/configVariables");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const endGameDefeat = (0, vue_1.ref)(false);
const route = (0, vue_router_1.useRoute)();
(0, vue_1.watch)(() => route.path, (newPath) => {
    if (configVariables_1.regexSummary.test(newPath)) {
        setTimeout(() => {
            endGameDefeat.value = true;
        }, 20);
    }
    else
        endGameDefeat.value = false;
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
    if (!__VLS_ctx.endGameDefeat) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: ("navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-50") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container-fluid") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("navbar-toggler") }, type: ("button"), "data-bs-toggle": ("collapse"), "data-bs-target": ("#navbarNav"), "aria-controls": ("navbarNav"), "aria-expanded": ("false"), "aria-label": ("Toggle navigation"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("navbar-toggler-icon") }, });
        // @ts-ignore
        [endGameDefeat,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("collapse navbar-collapse") }, id: ("navbarNav"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("navbar-nav") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("nav-link mb-0") }, });
        // @ts-ignore
        [ScoreBox_vue_1.default,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(ScoreBox_vue_1.default, new ScoreBox_vue_1.default({}));
        const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({}));
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(ScoreBox_vue_1.default, __VLS_1);
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("nav-link mb-0") }, });
        // @ts-ignore
        [ErrorCountBox_vue_1.default,];
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(ErrorCountBox_vue_1.default, new ErrorCountBox_vue_1.default({}));
        const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
        ({}({}));
        const __VLS_9 = __VLS_pickFunctionalComponentCtx(ErrorCountBox_vue_1.default, __VLS_6);
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("nav-link mb-0") }, });
        // @ts-ignore
        [TimerBox_vue_1.default,];
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(TimerBox_vue_1.default, new TimerBox_vue_1.default({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        ({}({}));
        const __VLS_14 = __VLS_pickFunctionalComponentCtx(TimerBox_vue_1.default, __VLS_11);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['navbar'];
        __VLS_styleScopedClasses['navbar-expand-lg'];
        __VLS_styleScopedClasses['navbar-dark'];
        __VLS_styleScopedClasses['bg-dark'];
        __VLS_styleScopedClasses['bg-opacity-50'];
        __VLS_styleScopedClasses['container-fluid'];
        __VLS_styleScopedClasses['navbar-toggler'];
        __VLS_styleScopedClasses['navbar-toggler-icon'];
        __VLS_styleScopedClasses['collapse'];
        __VLS_styleScopedClasses['navbar-collapse'];
        __VLS_styleScopedClasses['navbar-nav'];
        __VLS_styleScopedClasses['nav-item'];
        __VLS_styleScopedClasses['nav-link'];
        __VLS_styleScopedClasses['mb-0'];
        __VLS_styleScopedClasses['nav-item'];
        __VLS_styleScopedClasses['nav-link'];
        __VLS_styleScopedClasses['mb-0'];
        __VLS_styleScopedClasses['nav-item'];
        __VLS_styleScopedClasses['nav-link'];
        __VLS_styleScopedClasses['mb-0'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                TimerBox: TimerBox_vue_1.default,
                ScoreBox: ScoreBox_vue_1.default,
                ErrorCountBox: ErrorCountBox_vue_1.default,
                endGameDefeat: endGameDefeat,
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
