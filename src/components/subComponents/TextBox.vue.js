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
const axios_1 = __importDefault(require("axios"));
const configVariables_1 = require("@/configVariables");
const gsap_1 = __importDefault(require("gsap"));
const vue_router_1 = require("vue-router");
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await Promise.resolve().then(() => __importStar(require('vue')));
//noterete un settimeout differente rispetto a quello degli altri dispacher, questo perchè la nuova view verrà caricata (onMounted) dopo 5 sec, quindi non avrebbe mai intercettato i dispacher da 1 sec, per qeusto ho inserito 6 sec, ovvero: tempo per il caricamento nuova view + 1 sec (valore standard scelto da me per il passaggio disparcher).
const spanWords = (0, vue_1.ref)(null); // ref necessario per far funzionare l'animazion , targhetta i span.
const word = (0, vue_1.ref)(""); //carica la parola dalla chiamata axios.
const wordArray = (0, vue_1.ref)([]); // carica l'array di char della parola word.
const indexCounter = (0, vue_1.ref)([]); //tiene traccia della posizione (index) delle lettere svelate con successo da wordArray.
const prevIndexCounter = (0, vue_1.ref)([]); //necessario per tenere traccia di chi NON deve lampeggiare
const error = (0, vue_1.ref)(false); //booleano per attivare l'invio dell'errore al componente.
const errorCount = (0, vue_1.ref)(0); //contatore di errori, necessario per far triggerare la condizione di fine gioco, sconfitta.
const highConsecutiveWordScore = (0, vue_1.ref)(0); //contatore di quante lettere consecutive sono state trovate.
const provisoryConsecutiveWordScore = (0, vue_1.ref)(0); // contatore per confrontare con la variabile HightConsecutiveWordScore, in caso la supera quest'ultima variabile verrà aggiornata con i lvalore del provisoryConsecutiveWordScore
const endGameCounter = (0, vue_1.ref)(0); // se questo valore è identico alla wordArray allora significa che la parola è stata svelata e si può procedere con la condizione di vittoria.
const router = (0, vue_router_1.useRouter)();
const props = defineProps({
    lang: {
        type: String,
        required: true,
        validator: value => value !== ""
    },
    playerWord: {
        type: String,
    }
});
const animateSpan = (index) => {
    if (!spanWords.value)
        return;
    const spanElement = spanWords.value[index];
    gsap_1.default.timeline()
        .fromTo(spanElement, { opacity: 0, rotationY: 0 }, { opacity: 1, rotationY: 360, duration: 0.5, ease: "power1.inOut" })
        .set(spanElement, { borderColor: "#ffd700" }) //valore hex preso da $hoverTextColor in _variables scss
        .to(spanElement, { opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        repeat: 2,
        yoyo: true,
        onComplete: () => {
            gsap_1.default.to(spanElement, {
                opacity: 1,
                borderColor: '#d3d3d3' //valore hex preso da $primaryTextColor in _variables scss
            });
        }
    });
};
const wordCheck = () => {
    if (props.playerWord === "" || props.playerWord === null || props.playerWord === " ")
        return [];
    let indexArray = [];
    //vi lascio 2 metodi che ho trovato per controllare le lettere:
    /* for (let i = 0; i < wordArray.value.length; i++) {
        if (wordArray.value[i] === props.playerWord) indexArray= [...indexArray,i];
    } */
    //versione alternativa array.protopype.reduce (ove array.prototype = l'array su cui vogliamo lavorare). è una versione molto potente (e personalmente la ritengo fichissima) di un ciclo for , adatta quando bisogna  eseguire operazioni di accumulo (es. fare la somma degli elementi). acc sta per l'accumulatore, necessario per tenere traccia dell'operazione che stiamo eseguendo su ogni elemento. Current sarebbe l'elemento corrente ed ovviamente index è l'indice. .reduce fa una sorta di "foreach" nel senso che itera su ogni elemento dell'array.
    indexArray = wordArray.value.reduce((acc, current, index) => {
        if (current === props.playerWord)
            acc.push(index);
        return acc; //vitale per far toranre l'accumultore per il prossimo elemento ,senza di esso non terrebbe traccia dell'avanzare dell'accumulo.
    }, []);
    return indexArray;
};
const callWord = async () => {
    const baseUrl = `/api/word?lang=${props.lang}`;
    try {
        const response = await axios_1.default.get(baseUrl);
        word.value = response.data[0].toLowerCase().trim();
        wordArray.value = word.value.split("");
        highConsecutiveWordScore.value = wordArray.value.length; //imposto il valore delle lettere consecutive al massimo possibile, cosi che, se l'utente non sbaglia mai avrà questo valore come risultato.
    }
    catch (error) {
        console.log("Warning error detected:", error);
        setTimeout(() => {
            router.push({ name: 'home' }); //rimanda automaticamente alla Home in caso di errore del get..
        }, 1000);
    }
};
(0, vue_1.watch)(() => indexCounter.value, (newIndexCounter, oldIndexCounter) => {
    // Aggiorna gli span per quelli che ora sono svelati e non erano svelati in precedenza
    const prevIndex = oldIndexCounter ?? [];
    const newlyRevealed = newIndexCounter.filter(index => !prevIndex.includes(index));
    newlyRevealed.forEach(index => {
        if (spanWords.value && spanWords.value[index])
            animateSpan(index);
    });
    prevIndexCounter.value = prevIndex;
}, { immediate: true });
(0, vue_1.watch)(() => props.playerWord, (element) => {
    let wordCheckLength = wordCheck().length; //richiedo la length dell'output della funzione.
    //se è 0 significa che non è stata trovata nessuna lettera dall'utente.
    if (wordCheckLength === 0) {
        generateError();
        updateConsecutiveWord();
        getScore(-100, wordArray.value.length);
        error.value = false;
        checkEndGame();
        return;
    }
    //Altrimenti, significa che length non è 0 quindi ha trovato qualcosa ed inizio la sequenza di aggiornamento delle meccaniche del gioco..
    endGameCounter.value += wordCheckLength;
    provisoryConsecutiveWordScore.value++;
    getScore(80, wordArray.value.length, wordCheckLength);
    indexCounter.value = [...indexCounter.value, ...wordCheck()];
    checkEndGame();
});
const sendSummaryWord = () => {
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('sendSummaryWord', {
            detail: { word: word.value },
            bubbles: true
        }));
    }, configVariables_1.dispachTimeForVictory);
};
const sendSummaryConsecutiveWord = () => {
    setTimeout(() => {
        console.log("che schifo", highConsecutiveWordScore.value);
        document.dispatchEvent(new CustomEvent('sendSummaryConsecutiveWord', {
            detail: { consecutiveWord: highConsecutiveWordScore.value },
            bubbles: true
        }));
    }, configVariables_1.dispachTimeForVictory);
};
const getScore = (score, wordLength, moltiplierWord = 1) => {
    //La formula è creata tenendo in considerazione che più la parola è lunga più la difficoltà è alta, quinndi un bonus moltiplicatore. Un altro moltiplicatore è dato da quante lettere ha indovinato, ovviamente più lettere si indovinano con una sola scelta maggior punti vanno dati. Quest'ultima è impostata come parametro opzionale in modo che nel momento in cui si va in errore il moltiplicatore è x1 . math.max serve a garantire che se uscisse una parola lunga meno di 3 caratteri (molto improbabile ma non posso escluderlo) allora il moltiplicatore sia 1.
    let totalScore = Math.round((score * moltiplierWord) * Math.max(1, wordLength / 3));
    document.dispatchEvent(new CustomEvent('score', {
        detail: { score: totalScore },
        bubbles: true
    }));
};
const generateError = () => {
    error.value = true;
    errorCount.value++;
    document.dispatchEvent(new CustomEvent('doError', {
        detail: { error: error },
        bubbles: true
    }));
};
const checkEndGame = () => {
    if (wordArray.value.length == endGameCounter.value || errorCount.value == configVariables_1.maxError) {
        sendSummaryWord();
        sendSummaryConsecutiveWord();
        if (wordArray.value.length == endGameCounter.value) {
            document.dispatchEvent(new CustomEvent('endGameCondition', {
                detail: { condition: "victory" },
                bubbles: true
            }));
        }
    }
};
const updateConsecutiveWord = () => {
    //questa condizione è necessaria altrimenti non potrà mai calcolare la quantità di  lettere consecutive indovinate i nquanto di base il contatore è settato pari alal length della parola, in modo far si che se l'utente non sbagli mai possa aver il giusto risultato. 
    if (highConsecutiveWordScore.value == wordArray.value.length)
        highConsecutiveWordScore.value = 0;
    if (provisoryConsecutiveWordScore.value > highConsecutiveWordScore.value)
        highConsecutiveWordScore.value = provisoryConsecutiveWordScore.value;
    provisoryConsecutiveWordScore.value = 0;
};
(0, vue_1.onMounted)(() => {
    callWord();
    //scommentare (ricorda di scommentare anche lang sulla gameview) se il server dove facciamo la request non funziona!
    /* word.value = "grandetest"
    wordArray.value=word.value.split("");
    highConsecutiveWordScore.value = wordArray.value.length;
    */
});
const __VLS_fnComponent = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    props: {
        lang: {
            type: String,
            required: true,
            validator: value => value !== ""
        },
        playerWord: {
            type: String,
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
    for (const [slot, index] of __VLS_getVForSourceType((__VLS_ctx.word.split('')))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((slot)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ref: ("spanWords"), ...{ class: (({
                    'spanBorder': true,
                    'hidden': slot === ' '
                })) }, });
        // @ts-ignore
        (__VLS_ctx.spanWords);
        __VLS_styleScopedClasses = ({
            'spanBorder': true,
            'hidden': slot === ' '
        });
        (__VLS_ctx.indexCounter.includes(index) ? slot : '_');
        // @ts-ignore
        [word, spanWords, indexCounter,];
    }
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
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
                spanWords: spanWords,
                word: word,
                indexCounter: indexCounter,
            };
        },
        props: {
            lang: {
                type: String,
                required: true,
                validator: value => value !== ""
            },
            playerWord: {
                type: String,
            }
        },
    });
}
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
    props: {
        lang: {
            type: String,
            required: true,
            validator: value => value !== ""
        },
        playerWord: {
            type: String,
        }
    },
});
;
