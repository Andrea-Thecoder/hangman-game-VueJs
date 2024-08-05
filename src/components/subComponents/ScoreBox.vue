<script setup lang="ts">
import {ref, onMounted, watch, computed , onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import { regexSummary, regexReset, dispachTimeBase } from '@/configVariables';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { ComputedRef } from 'vue';

const route:RouteLocationNormalizedLoadedGeneric = useRoute();
const counterScore=ref<number>(0);


const scoreClass:ComputedRef<{'text-warning' : boolean,'text-danger' :boolean}>= computed (() => {
       return{
        'text-warning' : counterScore.value < 0 && counterScore.value > -100 ,
        'text-danger' : counterScore.value <= -100
    }
})


const addScore = (event:CustomEvent):void => {
    counterScore.value += event.detail.score
    
}

watch(() => route.path, (newPath:string) => {
   if (regexReset.test(newPath)) counterScore.value = 0;
   if(regexSummary.test(newPath)){
        setTimeout(() => {
        document.dispatchEvent(new CustomEvent('sendSummaryScore', {
        detail: { score: counterScore.value },
        bubbles: true 
        }));
    }, dispachTimeBase);
    }
})

onMounted(()=> {
    document.addEventListener('score', addScore as EventListener);
})

onUnmounted(()=> {
    document.removeEventListener('score', addScore as EventListener);
})


</script>

<template>
    <span :class="scoreClass">{{ counterScore }}</span>
</template>


<style scoped lang="scss">

</style>