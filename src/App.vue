<script setup lang="ts">
import {ref,onMounted,watch, reactive, onUnmounted} from 'vue';
import HeaderVue from './components/TheHeader.vue';
import FooterVue from './components/TheFooter.vue';
import { RouterView, useRoute} from 'vue-router';
import gsap from 'gsap';
import { regexReset, regexSummary } from '@/configVariables';
import { Player } from './composables/Player';
import type { Imouse } from '@/types/interfaces';
import type {RouteLocationNormalizedLoadedGeneric} from 'vue-router';


const route:RouteLocationNormalizedLoadedGeneric = useRoute();

const fogOverlay = ref<HTMLElement | null>(null);
const header = ref<HTMLElement | null>(null);
const main = ref<HTMLElement | null>(null);
const footer = ref<HTMLElement | null>(null);

const overlayToggle = ref<boolean>(true);

const fadeDuration:number = 4; // Durata della dissolvenza
const disappearAfter:number = 2; // Tempo prima che l'effetto sparisca completamente

const prevMousePosition = reactive<Imouse>({
    x:0, y:0
})

const {totalMouseDistance} = Player();

/* logica del tracking: Dobbiamo tenere traccia di quanti px si muove il mouse ogni olta che l'utente lo spsota. 
per fare ciò come prima cosa inizialziziamo due oggetti reattivi per tenere traccia del totale del movimento asse X e Y e di quanto si è mosso lo "step" precedente a quello che si muoverà. Quest'ultima ci servirà per calcolare il delta ovvero la differenza tra quanto si è mosso ora e quanto si era mosso prima per trovare il valore assoluto (che deve essere sempre positivo per i nostri fini) esso andrà aggiunto nella pool del totale mosso. Infine i campi che tenevano tracica dello "step" precedente dello spostamento vengono aggiornati inserendo il valore attuale dello spsotamento. */
const trackMouse = (event:MouseEvent):void => {
    //calcolo del delta per vedere quanti px ha fatto in questo step di movimento
    const newX:number = event.clientX - prevMousePosition.x;
    const newY:number = event.clientY - prevMousePosition.y;

    //aggiornamento del totale , ricordiamo che dovranno essere inseriti solo i valori assoluti quindi il modulo del valore X e Y .
    totalMouseDistance.x += Math.abs(newX);
    totalMouseDistance.y += Math.abs(newY);

    //aggiornamento dell'oggetto reattivo che tiene traccia dello "step" precedente di movimento.
    prevMousePosition.x = event.clientX;
    prevMousePosition.y = event.clientY;

}

const fogEffect = ():void => {
    overlayToggle.value = true;
    gsap.set(fogOverlay.value, {
            opacity: 1,
            scale: 1,
            transformOrigin: "center"
        });
    
    gsap.to(fogOverlay.value, {
        delay: disappearAfter,
        duration: fadeDuration,
        opacity: 0,
        scale: 2, // Ingigantire l'overlay per estenderlo verso i bordi
        ease: "power1.inOut",
        onComplete: () => {
            overlayToggle.value = false // Imposta overlayToggle a false quando l'animazione è completata
        }
    });
    gsap.to(fogOverlay.value, {
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
}

const elementAppear=():void => {
    gsap.set([header.value, main.value, footer.value], { opacity: 0 }); // Imposta l'opacità iniziale a 0

gsap.to([header.value, main.value, footer.value], {
    delay: disappearAfter, 
    duration: fadeDuration-1, 
    opacity: 1,
    ease: "power1.out" 
});
}

const resetCursorTracker= ()=> {
    totalMouseDistance.x = 0;
    totalMouseDistance.y = 0;
    prevMousePosition.x = 0;
    prevMousePosition.y = 0;
    document.addEventListener('mousemove', trackMouse);
}

watch(()=> route.path, (newPath:string)=>{
    if(newPath === '/'){
        fogEffect();
        elementAppear();
    }
    //Un secondo if in quanto il reset del puntatore deve avvenire sia quando si ritorna alla Home, sia quando, sconfitto, il giocatore seleziona nuova partita. Per questo un secondo if che controlla entrambe le possibili vie.
    if (regexReset.test(newPath))
        resetCursorTracker();
    //il tracciamento cessa quando si raggiunge la schermata di fine gioco.
    if(regexSummary.test(newPath))
        document.removeEventListener('mousemove',trackMouse)
} )


onMounted(() => {
    if(route.path === "/"){
        fogEffect();
        elementAppear();   
    }
   document.addEventListener('mousemove', trackMouse as EventListener);
});

onUnmounted (()=> {
   document.removeEventListener('mousemove',trackMouse as EventListener)
})

</script>

<template>
    
    <header class="wrapper" ref="header">
        <HeaderVue/>
    </header>
    
    <div class="fog-overlay" ref="fogOverlay"></div>
    <main ref="main">
        <RouterView />   
    </main>
    <footer class="wrapper" ref="footer">
        <FooterVue />
    </footer>
    <div class="overlay" v-if="overlayToggle"></div>
</template>

<style lang="scss" scoped>
@use './assets/style/mixin' as mix;
@use './assets/style/variable' as var;

header,footer {
    @include mix.displayFlex();
    margin: 0 auto;
}

header {
    margin-top: 0.5em;
}

footer {
    margin-bottom: 0.5em;
}

main{
    @include mix.displayFlex();
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; 
  z-index: 9999;  
}



</style>
