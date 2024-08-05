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
//Il tempo viene tenuto contandolo in secondi.
const countTimer = (0, vue_1.ref)(0);
const minutes = (0, vue_1.ref)(Math.floor(countTimer.value / 60));
const seconds = (0, vue_1.ref)(countTimer.value % 60);
const timerInterval = (0, vue_1.ref)(null);
const start = (0, vue_1.ref)(false);
const timerGo = () => {
    if (!start.value) {
        if (timerInterval.value !== null)
            clearInterval(timerInterval.value);
        return;
    }
    countTimer.value++;
    minutes.value = Math.floor(countTimer.value / 60);
    seconds.value = countTimer.value % 60;
};
const starter = () => {
    start.value = true;
    timerInterval.value = setInterval(timerGo, 1000);
};
const reset = (path) => {
    if (configVariables_1.regexReset.test(path)) {
        if (timerInterval.value !== null)
            clearInterval(timerInterval.value);
        countTimer.value = 0;
        minutes.value = Math.floor(countTimer.value / 60);
        seconds.value = countTimer.value % 60;
    }
};
(0, vue_1.watch)(() => route.path, (newPath) => {
    reset(newPath);
    if (configVariables_1.regexSummary.test(newPath)) {
        if (timerInterval.value !== null)
            clearInterval(timerInterval.value);
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('sendSummaryTimer', {
                detail: { timer: countTimer.value },
                bubbles: true
            }));
        }, configVariables_1.dispachTimeBase);
    }
});
(0, vue_1.onMounted)(() => {
    document.addEventListener('startTime', starter);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('startTime', starter);
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
    (String(__VLS_ctx.minutes).padStart(2, '0'));
    (String(__VLS_ctx.seconds).padStart(2, '0'));
    // @ts-ignore
    [minutes, seconds,];
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
                minutes: minutes,
                seconds: seconds,
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
