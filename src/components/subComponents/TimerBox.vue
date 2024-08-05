<script setup lang="ts">
import{ref,onMounted, watch, onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import { regexSummary, regexReset, dispachTimeBase } from '@/configVariables';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const route:RouteLocationNormalizedLoadedGeneric= useRoute()

//Il tempo viene tenuto contandolo in secondi.
const countTimer= ref<number>(0);
const minutes = ref<number>(Math.floor(countTimer.value / 60));
const seconds = ref<number>(countTimer.value % 60);

const timerInterval = ref<ReturnType<typeof setInterval> | null>(null); 

const start= ref<boolean>(false);

const timerGo = ():void => {
    if( !start.value) {
        if(timerInterval.value !== null)
            clearInterval(timerInterval.value);
        return
    }
    countTimer.value ++;
    minutes.value = Math.floor(countTimer.value / 60);
    seconds.value = countTimer.value % 60;
}

const starter = ():void => {     
    start.value=true;
    timerInterval.value = setInterval(timerGo,1000) 
}

const reset = (path:string):void => {
    if(regexReset.test(path) ){
           if(timerInterval.value !== null)
                clearInterval(timerInterval.value);
            countTimer.value=0;
            minutes.value = Math.floor(countTimer.value / 60);
            seconds.value = countTimer.value % 60;
        }
}

watch(()=> route.path, (newPath:string)=> {
        reset(newPath);
        if(regexSummary.test(newPath)){
           if (timerInterval.value !== null) 
                clearInterval(timerInterval.value)
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent('sendSummaryTimer', {
                detail: { timer: countTimer.value },
                bubbles: true 
            }));
            }, dispachTimeBase);
        }
})

onMounted(()=> {
    document.addEventListener('startTime', starter);
})

onUnmounted(()=> {
    document.removeEventListener('startTime', starter);
})



</script>

<template>
        <span>{{ String(minutes).padStart(2, '0') }}:{{ String(seconds).padStart(2, '0')}}</span>

</template>


<style scoped lang="scss">

</style>