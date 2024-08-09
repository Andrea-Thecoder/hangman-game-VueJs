<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import DefeatSummary from '@/components/DefeatSummary.vue';
import VictorySummary from '@/components/VictorySummary.vue';
import type { Isummary } from '@/types/interfaces';
import { SendParameter } from '@/composables/SummaryParameter';

const {errorCount,consecutiveWordScore,totalScore,summaryWord,trasformTimer} = SendParameter();

const summaryValue= reactive<Isummary>({
    score: totalScore.value,
    error: errorCount.value,
    timer: trasformTimer(),
    consecutiveWord: consecutiveWordScore.value,
    word: summaryWord.value
});


const condition= ref<string>(useRoute().params.condition as string)

</script>

<template>
    <div class="bgCenterSetting">
        <div class="container">
        <DefeatSummary v-if="condition ==='defeat'" 
            :word="summaryValue.word" 
            :score="summaryValue.score" />
            
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