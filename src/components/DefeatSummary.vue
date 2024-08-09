<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import { dynamicText } from '@/composables/DynamicText';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route:RouteLocationNormalizedLoadedGeneric = useRoute();

const defeatText: string = "Nebbie oscure avvolgono il tuo fato, l'ultimo respiro è ormai sfuggito è andato. Nel buio eterno sei ormai confinato,dalle tenebre il tuo nome è cancellato..."


const newGameRoute=ref<string>(route.meta.oldPath as string);
const language = ref<string>(newGameRoute.value.split('/')[2]);
//const language = ref<string>('it');

const defeatSummaryView = ref<boolean>(false);
const clickAppear = ref<boolean>(false);

const props = defineProps({
    word:{
        type:String,
        required: true,
    },
    score:{
        type:Number,
        required: true
    }
})

const {displayText, endLoading, generateText} = dynamicText(); 

const handleSummaryView = ():void => {
    defeatSummaryView.value = true
}

watch(()=>endLoading.value, (newValue:boolean)=>{
    if(newValue){
        setTimeout(() => {
            clickAppear.value = true;
        }, 2500);
    }
})

onMounted(()=> {
    generateText(defeatText);
})



</script>

<template>
    <div class="container" >
        <div>
            <h4 class="text-appear-writer">Game Over</h4>
        </div>
        <div>
            <picture>
                <source srcset="../assets/img/defeat-webp.webp" media="(min-width:981px)">
                <source srcset="../assets/img/defeat-mobile-webp.webp" media="(max-width:980px)">
                <img src="../assets/img/defeat-webp.webp" alt="impiccato-sconfitta" class="img">
            </picture>
        </div>
        <template v-if="!defeatSummaryView">
            <div>
            <h6 v-html="displayText" class="text-appear-writer"></h6>
            </div>
            <div v-if="clickAppear">
            <p class="mini-link" @click="handleSummaryView">(Premi qui per continuare)</p>
            </div>
        </template>
        <template v-else>
            <div class="container mb-4 mt-3" >
                <div>
                <p>La parola da trovare era: <strong>{{ word }}</strong></p> 
                <p>Hai totalizzato un punteggio di: <strong>{{ score }}</strong></p>
                </div>
                <div>
                    <p>Ora cosa vuoi fare ?</p>
                </div>
                <div>
                    <router-link class="no-link-style btn btn-secondary" :to="{name: 'home'}" title="Ritorna alla selezione della lingua">
                        Ritorna alla Home
                    </router-link>
                </div>
                <div class="mt-2">
                    <router-link class="no-link-style btn btn-secondary" :to="{name: 'game', params : {language : language}}" title="Nuova partita con le medesime impostazioni">
                        Nuova Partita
                    </router-link>
                </div>
            </div>
        </template>
        
    </div>



</template>

<style scoped lang="scss">
@use '../assets/style/mixin' as mix;
@use '../assets/style/variable' as var;

div.container {
    @include mix.displayFlex(center,center,column);
    p{
        text-align: center;
    }
}




</style>