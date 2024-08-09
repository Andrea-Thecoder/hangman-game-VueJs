<script setup lang="ts">
import {onMounted,ref,onUnmounted, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import GameBox from '@/components/GameBox.vue';
import { SendParameter } from '@/composables/SummaryParameter';
import { Player } from '@/composables/Player';

//ho forzato l'assegnazione ad essere una stringa, in quanto il params può essere sia una string che un array di string. Conoscendo esattamente i ldato in ingressoche verrà inviato ho deciso quindi di forzare con un assertion.
const router:Router = useRouter()

const {starterCountTimer} = SendParameter();
const {condition} = Player();

const lang = ref<string>(useRoute().params.language as string) ;
//const lang = ref<string>("bigtest"); //Tester per quando va giu il server del genera parole.

watch(()=>condition.value, (status:string)=> {
    if(status){
        switch(status){
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
},{immediate: true})

onMounted(()=> {
  starterCountTimer.value = true;
})

onUnmounted(()=> {
    starterCountTimer.value = false;
    condition.value="";
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