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
const vue_router_1 = require("vue-router");
const DefeatSummary_vue_1 = __importDefault(require("@/components/DefeatSummary.vue"));
const VictorySummary_vue_1 = __importDefault(require("@/components/VictorySummary.vue"));
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const summaryValue = (0, vue_1.reactive)({
    score: 0,
    error: 0,
    timer: '',
    consecutiveWord: 0,
    word: ''
});
const condition = (0, vue_1.ref)((0, vue_router_1.useRoute)().params.condition);
const updateError = (event) => {
    summaryValue.error = event.detail.error;
};
const updateScore = (event) => {
    summaryValue.score = event.detail.score;
};
const updateTimer = (event) => {
    let timer = event.detail.timer;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    summaryValue.timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
const updateConsecutiveWord = (event) => {
    console.log(event.detail.consecutiveWord, event.detail);
    summaryValue.consecutiveWord = event.detail.consecutiveWord;
    console.log(summaryValue.consecutiveWord);
};
const updateWord = (event) => {
    summaryValue.word = event.detail.word;
    console.log(summaryValue.word);
    console.log(summaryValue.consecutiveWord);
};
//aggiungo "as EventListener" alle funzioni di gestione degli eventi custom in quanto, durante il type-check, mi è stato segnalato errore. Infatti add/remove EventListeenr cercano tra il parametro 1, il tipo di evento, un evento standard incluso della mappatura degli eventi. Con typescript questo è un redFlag durante la build. Risolviamo questa cosa assicurando a typescript che è un EventListener la nostra funzione.
(0, vue_1.onMounted)(() => {
    document.addEventListener('sendSummaryError', updateError);
    document.addEventListener('sendSummaryScore', updateScore);
    document.addEventListener('sendSummaryTimer', updateTimer);
    document.addEventListener('sendSummaryConsecutiveWord', updateConsecutiveWord);
    document.addEventListener('sendSummaryWord', updateWord);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('sendSummaryError', updateError);
    document.removeEventListener('sendSummaryScore', updateScore);
    document.removeEventListener('sendSummaryTimer', updateTimer);
    document.removeEventListener('sendSummaryConsecutiveWord', updateConsecutiveWord);
    document.removeEventListener('sendSummaryWord', updateWord);
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("bgCenterSetting") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container") }, });
    if (__VLS_ctx.condition === 'defeat') {
        // @ts-ignore
        [DefeatSummary_vue_1.default,];
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(DefeatSummary_vue_1.default, new DefeatSummary_vue_1.default({ word: ((__VLS_ctx.summaryValue.word)), score: ((__VLS_ctx.summaryValue.score)), }));
        const __VLS_1 = __VLS_0({ word: ((__VLS_ctx.summaryValue.word)), score: ((__VLS_ctx.summaryValue.score)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
        ({}({ word: ((__VLS_ctx.summaryValue.word)), score: ((__VLS_ctx.summaryValue.score)), }));
        // @ts-ignore
        [condition, summaryValue, summaryValue,];
        const __VLS_4 = __VLS_pickFunctionalComponentCtx(DefeatSummary_vue_1.default, __VLS_1);
    }
    else {
        // @ts-ignore
        [VictorySummary_vue_1.default,];
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(VictorySummary_vue_1.default, new VictorySummary_vue_1.default({ score: ((__VLS_ctx.summaryValue.score)), timer: ((__VLS_ctx.summaryValue.timer)), consecutiveWord: ((__VLS_ctx.summaryValue.consecutiveWord)), error: ((__VLS_ctx.summaryValue.error)), }));
        const __VLS_6 = __VLS_5({ score: ((__VLS_ctx.summaryValue.score)), timer: ((__VLS_ctx.summaryValue.timer)), consecutiveWord: ((__VLS_ctx.summaryValue.consecutiveWord)), error: ((__VLS_ctx.summaryValue.error)), }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        ({}({ score: ((__VLS_ctx.summaryValue.score)), timer: ((__VLS_ctx.summaryValue.timer)), consecutiveWord: ((__VLS_ctx.summaryValue.consecutiveWord)), error: ((__VLS_ctx.summaryValue.error)), }));
        // @ts-ignore
        [summaryValue, summaryValue, summaryValue, summaryValue,];
        const __VLS_9 = __VLS_pickFunctionalComponentCtx(VictorySummary_vue_1.default, __VLS_6);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['bgCenterSetting'];
        __VLS_styleScopedClasses['container'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                DefeatSummary: DefeatSummary_vue_1.default,
                VictorySummary: VictorySummary_vue_1.default,
                summaryValue: summaryValue,
                condition: condition,
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
