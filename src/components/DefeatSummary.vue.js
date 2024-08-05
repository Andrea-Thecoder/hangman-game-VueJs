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
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const route = (0, vue_router_1.useRoute)();
const defeatText = "Nebbie oscure avvolgono il tuo fato, l'ultimo respiro è ormai sfuggito e andato. Nel buio eterno sei ormai confinato,dalle tenebre il tuo nome è cancellato...";
const displayText = (0, vue_1.ref)('');
const countChar = (0, vue_1.ref)(0);
const newGameRoute = (0, vue_1.ref)(route.meta.oldPath);
const language = (0, vue_1.ref)(newGameRoute.value.split('/')[2]);
//const language = ref<string>('it');
const defeatSummaryView = (0, vue_1.ref)(false);
const clickAppear = (0, vue_1.ref)(false);
const props = defineProps({
    word: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true
    }
});
const writer = () => {
    const interval = setInterval(() => {
        displayText.value += defeatText[countChar.value];
        if (defeatText[countChar.value] == "," ||
            (defeatText[countChar.value] == "." && defeatText[countChar.value + 1] != "."))
            displayText.value += "<br> <br>";
        countChar.value++;
        if (countChar.value === defeatText.length) {
            setTimeout(() => {
                clickAppear.value = true;
            }, 2500);
            clearInterval(interval);
        }
    }, 100);
};
const handleSummaryView = () => {
    defeatSummaryView.value = true;
};
(0, vue_1.onMounted)(() => {
    writer();
});
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    props: {
        word: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-appear-writer") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("../assets/img/defeat-webp.webp"), alt: ("impiccato-sconfitta"), ...{ class: ("img") }, });
    if (!__VLS_ctx.defeatSummaryView) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h6, __VLS_intrinsicElements.h6)({ ...{ class: ("text-appear-writer") }, });
        __VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.displayText));
        // @ts-ignore
        [defeatSummaryView, vHtml, displayText,];
        if (__VLS_ctx.clickAppear) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (__VLS_ctx.handleSummaryView) }, ...{ class: ("mini-link") }, });
            // @ts-ignore
            [clickAppear, handleSummaryView,];
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mb-4 mt-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.word);
        // @ts-ignore
        [word,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.score);
        // @ts-ignore
        [score,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        // @ts-ignore
        const __VLS_0 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'home' })), title: ("Ritorna alla selezione della lingua"), }));
        const __VLS_2 = __VLS_1({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'home' })), title: ("Ritorna alla selezione della lingua"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        ({}({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'home' })), title: ("Ritorna alla selezione della lingua"), }));
        (__VLS_5.slots).default;
        const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-2") }, });
        // @ts-ignore
        const __VLS_6 = {}
            .RouterLink;
        ({}.RouterLink);
        ({}.RouterLink);
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        __VLS_components.RouterLink;
        __VLS_components.routerLink;
        // @ts-ignore
        [RouterLink, RouterLink,];
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'game', params: { language: __VLS_ctx.language } })), title: ("Nuova partita con le medesime impostazioni"), }));
        const __VLS_8 = __VLS_7({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'game', params: { language: __VLS_ctx.language } })), title: ("Nuova partita con le medesime impostazioni"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ ...{ class: ("no-link-style btn btn-secondary") }, to: (({ name: 'game', params: { language: __VLS_ctx.language } })), title: ("Nuova partita con le medesime impostazioni"), }));
        // @ts-ignore
        [language,];
        (__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['text-appear-writer'];
        __VLS_styleScopedClasses['img'];
        __VLS_styleScopedClasses['text-appear-writer'];
        __VLS_styleScopedClasses['mini-link'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['mt-3'];
        __VLS_styleScopedClasses['no-link-style'];
        __VLS_styleScopedClasses['btn'];
        __VLS_styleScopedClasses['btn-secondary'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['no-link-style'];
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
                displayText: displayText,
                language: language,
                defeatSummaryView: defeatSummaryView,
                clickAppear: clickAppear,
                handleSummaryView: handleSummaryView,
            };
        },
        props: {
            word: {
                type: String,
                required: true,
            },
            score: {
                type: Number,
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
        word: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true
        }
    },
});
;
