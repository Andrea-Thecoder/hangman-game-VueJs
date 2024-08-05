<script setup lang="ts">
import {ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute} from 'vue-router';
import { regexSummary, regexReset, maxError, dispachTimeBase } from '@/configVariables';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
const route:RouteLocationNormalizedLoadedGeneric=useRoute();
const countError = ref<number>(0);


const addError = (event:CustomEvent):void => {
    if (event.detail.error) countError.value++;
    if(countError.value === maxError) {
        document.dispatchEvent(new CustomEvent('endGameCondition', {
        detail: { condition: "defeat" },
        bubbles: true 
     }));
    }
}

watch(()=>route.path , (newPath:string) => {
    if(regexReset.test(newPath)) countError.value = 0;
    if(regexSummary.test(newPath)){
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('sendSummaryError', {
            detail: { error: countError.value },
            bubbles: true 
            }));  
        }, dispachTimeBase);
    }
        
})

onMounted(() => {
    document.addEventListener('doError', addError as EventListener);
})

onUnmounted(()=>{
    document.removeEventListener('doError', addError as EventListener);
})


</script>

<template>
    <span>{{ countError }} / {{ maxError }}</span>
</template>


<style scoped lang="scss">

</style>