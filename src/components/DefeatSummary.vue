<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route:RouteLocationNormalizedLoadedGeneric = useRoute();

const defeatText: string = "Nebbie oscure avvolgono il tuo fato, l'ultimo respiro è ormai sfuggito e andato. Nel buio eterno sei ormai confinato,dalle tenebre il tuo nome è cancellato..."

const displayText = ref<string>('');
const countChar = ref<number>(0);

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

const writer = ():void => {
    const interval:ReturnType<typeof setInterval> = setInterval(() => {
        displayText.value += defeatText[countChar.value];
        if (defeatText[countChar.value] =="," || 
           (defeatText[countChar.value] =="." && defeatText[countChar.value+1] !=".")
          ) 
            displayText.value += "<br> <br>"
        countChar.value++;
        if(countChar.value === defeatText.length){
            setTimeout(() => {
                clickAppear.value = true;
            }, 2500);
            clearInterval(interval);
        }
    }, 100);
}

const handleSummaryView = ():void => {
    defeatSummaryView.value = true
}

onMounted(()=> {
    writer();
})



</script>





<template>
    <div class="container" >
        <div>
            <h4 class="text-appear-writer">Game Over</h4>
        </div>
        <div>
            <img src="../assets/img/defeat-webp.webp" alt="impiccato-sconfitta" class="img">
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