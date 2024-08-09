<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { regexReset } from '@/configVariables';
import { SendParameter } from '@/composables/SummaryParameter';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import type { ComputedRef } from 'vue';

const route:RouteLocationNormalizedLoadedGeneric = useRoute();

const {totalScore, resetScore} = SendParameter();


const scoreClass:ComputedRef<{'text-warning' : boolean,'text-danger' :boolean}>= computed (() => {
       return{
        'text-warning' : totalScore.value < 0 && totalScore.value > -100 ,
        'text-danger' : totalScore.value <= -100
    }
})


watch(() => route.path, (newPath:string) => {
   if (regexReset.test(newPath)) resetScore();

})

onMounted(()=> {
    resetScore();
})


</script>

<template>
    <span :class="scoreClass">{{ totalScore }}</span>
</template>


<style scoped lang="scss">

</style>