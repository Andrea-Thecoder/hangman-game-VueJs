<script setup lang="ts">
import {onMounted,ref,onUnmounted, reactive, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DefeatSummary from '@/components/DefeatSummary.vue';
import VictorySummary from '@/components/VictorySummary.vue';
import type { Isummary } from '@/types/interfaces';


const summaryValue= reactive<Isummary>({
    score:0,
    error:0,
    timer:'',
    consecutiveWord:0,
    word:''
});

const condition= ref<string>(useRoute().params.condition as string)


const updateError =(event:CustomEvent):void => {
    summaryValue.error =  event.detail.error;
}

const updateScore =(event:CustomEvent):void => {
    summaryValue.score =  event.detail.score;
}

const updateTimer = (event:CustomEvent):void => {
    let timer:number =  event.detail.timer;
    let minutes:number = Math.floor(timer / 60);
    let seconds:number = timer % 60;
    summaryValue.timer =`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const updateConsecutiveWord = (event:CustomEvent):void => {
    summaryValue.consecutiveWord = event.detail.consecutiveWord
}

const updateWord = (event:CustomEvent):void => {
    summaryValue.word = event.detail.word;
}


 //aggiungo "as EventListener" alle funzioni di gestione degli eventi custom in quanto, durante il type-check, mi è stato segnalato errore. Infatti add/remove EventListeenr cercano tra il parametro 1, il tipo di evento, un evento standard incluso della mappatura degli eventi. Con typescript questo è un redFlag durante la build. Risolviamo questa cosa assicurando a typescript che è un EventListener la nostra funzione.

onMounted(()=> {
    document.addEventListener('sendSummaryError',updateError as EventListener);
    document.addEventListener('sendSummaryScore',updateScore as EventListener);
    document.addEventListener('sendSummaryTimer',updateTimer as EventListener);
    document.addEventListener('sendSummaryConsecutiveWord',updateConsecutiveWord as EventListener);
    document.addEventListener('sendSummaryWord',updateWord as EventListener);
})

onUnmounted(() => {
   
    document.removeEventListener('sendSummaryError', updateError as EventListener);
    document.removeEventListener('sendSummaryScore', updateScore as EventListener);
    document.removeEventListener('sendSummaryTimer', updateTimer as EventListener);
    document.removeEventListener('sendSummaryConsecutiveWord', updateConsecutiveWord as EventListener);
    document.removeEventListener('sendSummaryWord', updateWord as EventListener);
});

</script>

<template>
    <div class="bgCenterSetting">
        <div class="container">
        <DefeatSummary v-if="condition ==='defeat'" :word="summaryValue.word" :score="summaryValue.score" />
        <VictorySummary v-else 
            :score="summaryValue.score" 
            :timer="summaryValue.timer" 
            :consecutiveWord="summaryValue.consecutiveWord"
            :error="summaryValue.error"
            />
        </div>
        
    </div>

</template>

<style scoped lang="scss">

</style>