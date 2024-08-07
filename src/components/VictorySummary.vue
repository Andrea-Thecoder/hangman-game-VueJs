<script setup lang="ts">
import { writerTimer } from '@/configVariables';
import type { Imouse } from '@/types/interfaces';
import {ref, onUnmounted, onMounted, reactive } from 'vue';

const victoryText:string = "Nelle ombre del cimitero tra lapidi e dolore, Un condannato scappa dal patibolo, sfuggendo al suo terrore. Con il cuore che batte tra nebbie e tetri bagliori, Corre lontano, lontano dagli esecutori..."

const props = defineProps({
    timer:{
        type:String,
        required: true
    },
    error:{
        type:Number,
        required: true
    },
    consecutiveWord:{
        type:Number,
        required: true
    },
    score:{
        type:Number,
        required: true
    }
})

const displayText = ref<string>("");
const countChar = ref<number>(0);
const clickAppear = ref<boolean>(false);
const victorySummaryView = ref<boolean>(false);
const cursorPosition = reactive<Imouse>({
    x:0,y:0
})

const writer = ():void => {
    const interval:ReturnType<typeof setInterval> = setInterval(() => {
        displayText.value += victoryText[countChar.value];
        if (victoryText[countChar.value] =="," || 
           (victoryText[countChar.value] =="." && victoryText[countChar.value+1] !=".")
          ) 
            displayText.value += "<br> <br>"
        countChar.value++;
        if(countChar.value === victoryText.length){
            setTimeout(() => {
                clickAppear.value = true;
            }, 2500);
            clearInterval(interval);
        }
    }, writerTimer);
}

const handleSummaryView = ():void => {
    victorySummaryView.value = true
}

const updateCursorPosition= (event:CustomEvent):void =>  {
    //avremmo anche potuto usare un ciclo per fare questa cosa ma mi sembrava performance sprecata per 2 valori che resteranno sempre e solo 2.
    cursorPosition.x = event.detail.position.x;
    cursorPosition.y = event.detail.position.y;
}

onMounted(() => {
    writer();
    document.addEventListener('sendSummaryCursorPosition',updateCursorPosition as EventListener)
})

onUnmounted(()=> {
    document.removeEventListener('sendSummaryCursorPosition',updateCursorPosition as EventListener);
})


</script>

<template>
    <div class="container">
        <div>
            <h4 class="text-appear-writer">Vittoria</h4>
        </div>
        <div>
            <picture>
                <source srcset="../assets/img/victory-webp.webp" media="(min-width:981px)">
                <source srcset="../assets/img/victory-mobile-webp.webp" media="(max-width:980px)">
                <img src="../assets/img/victory-webp.webp" alt="vittoria-fuga" class="img">
            </picture>
        </div>
    </div>
    <template v-if="!victorySummaryView">
        <div>
            <h6 v-html="displayText" class="text-appear-writer"></h6>
        </div>
        <div v-if="clickAppear">
            <p class="mini-link" @click="handleSummaryView">(Premi qui per continuare)</p>
        </div>
    </template>
    <template v-else>
        <div class="container mt-2 mb-3">
        <div>
            <ul>
                <li><span>Punteggio totalizzato: </span> {{ score }}</li>
                <li><span>Tempo impiegato: </span> {{ timer }}</li>
                <li><span>Errori commessi: </span> {{ error }}</li>
                <li><span>Parole consecutive trovate: </span> {{ consecutiveWord }}</li>
                <li><span>Distanza percorsa col cursore:</span></li>
                <li>asse X: {{ cursorPosition.x }}px , asse Y: {{ cursorPosition.y }}px</li>
            </ul>
        </div>
        <div>
            <p>Grazie per aver giocato all'Impiccato.</p>
        </div>
        <div>
            <router-link class="no-link-style btn btn-secondary" :to="{name: 'home'}" title="Ritorna alla selezione della lingua">
                Ritorna alla Home
            </router-link>
        </div>
        </div>
    </template>
    
</template>


<style scoped lang="scss">
@use '../assets/style/mixin' as mix;
@use '../assets/style/variable' as var;

div.container {
    @include mix.displayFlex(center,center,column);
    p,ul{
        text-align: center;
        li span{
            cursor: default;
            &:hover {
            color: var.$hoverTextColor;
            }
        }
        
    }
}

@media (max-width: var.$maxWidthResp){
   
}

</style>