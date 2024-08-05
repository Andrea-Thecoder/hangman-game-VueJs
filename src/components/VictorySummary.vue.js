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
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const victoryText = "Nelle ombre del cimitero tra lapidi e dolore, Un condannato scappa dal patibolo, sfuggendo al suo terrore. Con il cuore che batte tra nebbie e tetri bagliori, Corre lontano, lontano dagli esecutori...";
const props = defineProps({
    timer: {
        type: String,
        required: true
    },
    error: {
        type: Number,
        required: true
    },
    consecutiveWord: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});
const displayText = (0, vue_1.ref)("");
const countChar = (0, vue_1.ref)(0);
const clickAppear = (0, vue_1.ref)(false);
const victorySummaryView = (0, vue_1.ref)(false);
const cursorPosition = (0, vue_1.reactive)({
    x: 0, y: 0
});
const writer = () => {
    const interval = setInterval(() => {
        displayText.value += victoryText[countChar.value];
        if (victoryText[countChar.value] == "," ||
            (victoryText[countChar.value] == "." && victoryText[countChar.value + 1] != "."))
            displayText.value += "<br> <br>";
        countChar.value++;
        if (countChar.value === victoryText.length) {
            setTimeout(() => {
                clickAppear.value = true;
            }, 2500);
            clearInterval(interval);
        }
    }, 100);
};
const handleSummaryView = () => {
    victorySummaryView.value = true;
};
const updateCursorPosition = (event) => {
    console.log(event.detail.position.x, event.detail.position.y);
    //avremmo anche potuto usare un ciclo per fare questa cosa ma mi sembrava performance sprecata per 2 valori che resteranno sempre e solo 2.
    cursorPosition.x = event.detail.position.x;
    cursorPosition.y = event.detail.position.y;
};
(0, vue_1.onMounted)(() => {
    writer();
    document.addEventListener('sendSummaryCursorPosition', updateCursorPosition);
});
(0, vue_1.onUnmounted)(() => {
    document.removeEventListener('sendSummaryCursorPosition', updateCursorPosition);
});
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    props: {
        timer: {
            type: String,
            required: true
        },
        error: {
            type: Number,
            required: true
        },
        consecutiveWord: {
            type: Number,
            required: true
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ src: ("../assets/img/victory-webp.webp"), alt: ("vittoria-fuga"), ...{ class: ("img") }, });
    if (!__VLS_ctx.victorySummaryView) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.h6, __VLS_intrinsicElements.h6)({ ...{ class: ("text-appear-writer") }, });
        __VLS_directiveFunction(__VLS_ctx.vHtml)((__VLS_ctx.displayText));
        // @ts-ignore
        [victorySummaryView, vHtml, displayText,];
        if (__VLS_ctx.clickAppear) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (__VLS_ctx.handleSummaryView) }, ...{ class: ("mini-link") }, });
            // @ts-ignore
            [clickAppear, handleSummaryView,];
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mt-2 mb-3") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.score);
        // @ts-ignore
        [score,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.timer);
        // @ts-ignore
        [timer,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.error);
        // @ts-ignore
        [error,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.consecutiveWord);
        // @ts-ignore
        [consecutiveWord,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
        (__VLS_ctx.cursorPosition.x);
        (__VLS_ctx.cursorPosition.y);
        // @ts-ignore
        [cursorPosition, cursorPosition,];
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
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['text-appear-writer'];
        __VLS_styleScopedClasses['img'];
        __VLS_styleScopedClasses['text-appear-writer'];
        __VLS_styleScopedClasses['mini-link'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['mb-3'];
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
                clickAppear: clickAppear,
                victorySummaryView: victorySummaryView,
                cursorPosition: cursorPosition,
                handleSummaryView: handleSummaryView,
            };
        },
        props: {
            timer: {
                type: String,
                required: true
            },
            error: {
                type: Number,
                required: true
            },
            consecutiveWord: {
                type: Number,
                required: true
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
        timer: {
            type: String,
            required: true
        },
        error: {
            type: Number,
            required: true
        },
        consecutiveWord: {
            type: Number,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
});
;
