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
const GameBox_vue_1 = __importDefault(require("@/components/GameBox.vue"));
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
//ho forzato l'assegnazione ad essere una stringa, in quanto il params può essere sia una string che un array di string. Conoscendo esattamente i ldato in ingressoche verrà inviato ho deciso quindi di forzare con un assertion.
const router = (0, vue_router_1.useRouter)();
const lang = (0, vue_1.ref)((0, vue_router_1.useRoute)().params.language);
//const lang = ref<string>("bigtest"); //Tester per quando va giu il server del genera parole.
const redirectEndGameCondition = (event) => {
    if (!event.detail.condition)
        return;
    switch (event.detail.condition) {
        case "victory":
            setTimeout(() => {
                router.push({ name: 'summary', params: { condition: "victory" } });
            }, 5000);
            break;
        case "defeat":
            router.push({ name: 'summary', params: { condition: "defeat" } });
            break;
    }
};
(0, vue_1.onMounted)(() => {
    document.dispatchEvent(new CustomEvent('startTime', {
        detail: { start: true },
        bubbles: true
    }));
    document.addEventListener('endGameCondition', redirectEndGameCondition);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('endGameCondition', redirectEndGameCondition);
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
    // @ts-ignore
    [GameBox_vue_1.default,];
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(GameBox_vue_1.default, new GameBox_vue_1.default({ lang: ((__VLS_ctx.lang)), }));
    const __VLS_1 = __VLS_0({ lang: ((__VLS_ctx.lang)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ lang: ((__VLS_ctx.lang)), }));
    // @ts-ignore
    [lang,];
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(GameBox_vue_1.default, __VLS_1);
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
                GameBox: GameBox_vue_1.default,
                lang: lang,
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
