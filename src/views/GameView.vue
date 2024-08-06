<script setup lang="ts">
import {onMounted,ref,onUnmounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import GameBox from '@/components/GameBox.vue';


//ho forzato l'assegnazione ad essere una stringa, in quanto il params può essere sia una string che un array di string. Conoscendo esattamente i ldato in ingressoche verrà inviato ho deciso quindi di forzare con un assertion.
const router:Router = useRouter()
const lang = ref<string>(useRoute().params.language as string) ;
//const lang = ref<string>("bigtest"); //Tester per quando va giu il server del genera parole.

const redirectEndGameCondition =(event:CustomEvent):void => {
    if(!event.detail.condition) return;
        switch(event.detail.condition){
        case "victory":
            setTimeout(() => {
                router.push({name: 'summary' ,params: {condition: "victory"}})
            }, 5000);
        break;
        case "defeat":
        router.push({name: 'summary' ,params: {condition: "defeat"}})
        break;
        default: return;
        }
    
}

onMounted(()=> {
    document.dispatchEvent(new CustomEvent('startTime', {
    detail: { start: true },
    bubbles: true 
  }));
  document.addEventListener('endGameCondition', redirectEndGameCondition as EventListener);

})

onUnmounted(()=> {
    document.removeEventListener('endGameCondition', redirectEndGameCondition as EventListener);
})

</script>

<template>
    <div class="bgCenterSetting">
        <div class="container">
            <GameBox :lang = lang />
        </div>
        
    </div>

</template>

<style scoped lang="scss">

</style>