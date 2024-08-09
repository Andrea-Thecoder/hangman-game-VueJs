<script setup lang="ts">
import TextBox from './subComponents/TextBox.vue'
import Keyboard from '@/components/subComponents/Keyboard.vue';
import {ref} from 'vue'

const playerWord=ref<string>("");
const props = defineProps({
    lang:{
        type:String,
        required:true
    }

})


const travelWord = (payload:{inputWord:string}):void => {
    playerWord.value = payload.inputWord;
}


</script>

<template>

    <div class="container">
        <div class="mt-4">
            <TextBox :lang="props.lang" :playerWord="playerWord"/>
        </div>
        <div>
            <Keyboard @inputValue="travelWord"/>
        </div>
    </div>
</template>


<style scoped lang="scss">


        
</style>