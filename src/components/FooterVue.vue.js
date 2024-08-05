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
const configVariables_1 = require("@/configVariables");
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
const route = (0, vue_router_1.useRoute)();
const router = (0, vue_router_1.useRouter)();
const chisiamoPopUp = (0, vue_1.ref)(false);
const comegiocarePopUp = (0, vue_1.ref)(false);
const returnHomeToggle = (0, vue_1.ref)(false);
const endGameDefeat = (0, vue_1.ref)(false);
const popUpTimeOut = (0, vue_1.ref)(null);
const handlePopUp = (index) => {
    if (popUpTimeOut.value)
        return;
    switch (index) {
        case 1:
            comegiocarePopUp.value = true;
            popUpTimeOut.value = setTimeout(() => {
                comegiocarePopUp.value = false;
                popUpTimeOut.value = null;
            }, 5000);
            break;
        case 2:
            chisiamoPopUp.value = true;
            popUpTimeOut.value = setTimeout(() => {
                chisiamoPopUp.value = false;
                popUpTimeOut.value = null;
            }, 5000);
            break;
        default: return;
    }
};
const handleClosePopUp = () => {
    if (popUpTimeOut.value !== null)
        clearTimeout(popUpTimeOut.value);
    popUpTimeOut.value = null;
    chisiamoPopUp.value = false;
    comegiocarePopUp.value = false;
};
const confirmReturn = () => {
    if (route.path === '/')
        return;
    const confirmText = "Sei sicuro di voler tornare alla Home? tutti i progressi andranno persi!";
    if (confirm(confirmText))
        router.push({ name: 'home' });
};
(0, vue_1.watch)(() => route.path, (newPath) => {
    if (newPath === "/") {
        returnHomeToggle.value = false;
    }
    else {
        returnHomeToggle.value = true;
    }
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
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: ("navbar-toggler") }, type: ("button"), "data-bs-toggle": ("collapse"), "data-bs-target": ("#footerbarNav"), "aria-controls": ("navbarNav"), "aria-expanded": ("false"), "aria-label": ("Toggle navigation"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("navbar-toggler-icon") }, });
        // @ts-ignore
        [endGameDefeat,];
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("collapse navbar-collapse") }, id: ("footerbarNav"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("navbar-nav") }, });
        if (__VLS_ctx.returnHomeToggle) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
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
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClick': {} }, ...{ class: ("nav-link mb-0 pointer") }, to: (({ name: 'home' })), }));
            const __VLS_2 = __VLS_1({ ...{ 'onClick': {} }, ...{ class: ("nav-link mb-0 pointer") }, to: (({ name: 'home' })), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            ({}({ ...{ 'onClick': {} }, ...{ class: ("nav-link mb-0 pointer") }, to: (({ name: 'home' })), }));
            let __VLS_6;
            const __VLS_7 = {
                onClick: (__VLS_ctx.confirmReturn)
            };
            // @ts-ignore
            [returnHomeToggle, confirmReturn,];
            (__VLS_5.slots).default;
            const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
            let __VLS_3;
            let __VLS_4;
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (...[$event]) => {
                    if (!((!__VLS_ctx.endGameDefeat)))
                        return;
                    __VLS_ctx.handlePopUp(1);
                    // @ts-ignore
                    [handlePopUp,];
                } }, ...{ class: ("nav-link mb-0 pointer") }, });
        if (__VLS_ctx.comegiocarePopUp) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleClosePopUp) }, ...{ class: ("pop-up bgCenterSetting container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            // @ts-ignore
            [comegiocarePopUp, handleClosePopUp,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ class: ("nav-item") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ onClick: (...[$event]) => {
                    if (!((!__VLS_ctx.endGameDefeat)))
                        return;
                    __VLS_ctx.handlePopUp(2);
                    // @ts-ignore
                    [handlePopUp,];
                } }, ...{ class: ("nav-link mb-0 pointer") }, });
        if (__VLS_ctx.chisiamoPopUp) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleClosePopUp) }, ...{ class: ("pop-up mini-pop-up bgCenterSetting container") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            // @ts-ignore
            [handleClosePopUp, chisiamoPopUp,];
        }
        if (__VLS_ctx.comegiocarePopUp || __VLS_ctx.chisiamoPopUp) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleClosePopUp) }, ...{ class: ("overlay") }, });
            // @ts-ignore
            [comegiocarePopUp, handleClosePopUp, chisiamoPopUp,];
        }
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
        __VLS_styleScopedClasses['pointer'];
        __VLS_styleScopedClasses['nav-item'];
        __VLS_styleScopedClasses['nav-link'];
        __VLS_styleScopedClasses['mb-0'];
        __VLS_styleScopedClasses['pointer'];
        __VLS_styleScopedClasses['pop-up'];
        __VLS_styleScopedClasses['bgCenterSetting'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['nav-item'];
        __VLS_styleScopedClasses['nav-link'];
        __VLS_styleScopedClasses['mb-0'];
        __VLS_styleScopedClasses['pointer'];
        __VLS_styleScopedClasses['pop-up'];
        __VLS_styleScopedClasses['mini-pop-up'];
        __VLS_styleScopedClasses['bgCenterSetting'];
        __VLS_styleScopedClasses['container'];
        __VLS_styleScopedClasses['overlay'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    let __VLS_defineComponent;
    const __VLS_internalComponent = __VLS_defineComponent({
        setup() {
            return {
                chisiamoPopUp: chisiamoPopUp,
                comegiocarePopUp: comegiocarePopUp,
                returnHomeToggle: returnHomeToggle,
                endGameDefeat: endGameDefeat,
                handlePopUp: handlePopUp,
                handleClosePopUp: handleClosePopUp,
                confirmReturn: confirmReturn,
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
