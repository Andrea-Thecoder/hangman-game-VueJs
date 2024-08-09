<script setup lang="ts">
import { watch, onMounted} from 'vue';
import { useRoute} from 'vue-router';
import {regexReset, maxError } from '@/configVariables';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import { SendParameter } from '@/composables/SummaryParameter';
import { Player } from '@/composables/Player';

const route:RouteLocationNormalizedLoadedGeneric=useRoute();
const {errorCount,resetError}= SendParameter();
const {condition}= Player();

watch(()=>errorCount.value, (actualError:number)=>{
    if(actualError === maxError)
        condition.value = "defeat";
})

watch(()=>route.path , (newPath:string) => {
    if(regexReset.test(newPath)) resetError();
})

onMounted(() => {
    resetError();
})



</script>

<template>
    <span>{{ errorCount }} / {{ maxError }}</span>
</template>


<style scoped lang="scss">

</style>