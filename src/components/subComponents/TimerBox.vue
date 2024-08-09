<script setup lang="ts">
import{ref,onMounted, watch, onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import { regexSummary, regexReset, dispachTimeBase } from '@/configVariables';
import { SendParameter } from '@/composables/SummaryParameter';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route:RouteLocationNormalizedLoadedGeneric= useRoute()

const {countTimer,starterCountTimer,goTimer, trasformTimer}=SendParameter();

const timer = ref<string>(trasformTimer());

const timerInterval = ref<ReturnType<typeof setInterval> | null>(null); 


const reset = (path:string):void => {
    if(regexReset.test(path) ){
           if(timerInterval.value !== null)
                clearInterval(timerInterval.value);
            countTimer.value=0;
            timer.value = trasformTimer();
        }
}

watch(()=> route.path, (newPath:string)=> {
        reset(newPath);     
        if(regexSummary.test(newPath) && timerInterval.value !== null)
            clearInterval(timerInterval.value)
})

watch (()=>starterCountTimer.value, (status:boolean)=> {
    if (status){
        timerInterval.value = setInterval(()=>{
            goTimer();
            timer.value = trasformTimer();
        },1000);
        return;
    } else {
        clearInterval(timerInterval.value)
    }
},{ immediate: true })

onMounted(()=> {
    countTimer.value=0;
    timer.value = trasformTimer();
})

onUnmounted(()=>{
    clearInterval(timerInterval.value)
})

</script>

<template>
        <span>{{ timer  }}</span>

</template>
    

<style scoped lang="scss">

</style>