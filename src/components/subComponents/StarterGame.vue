<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type {Router} from 'vue-router';
const starterText:string = "Per me si va nella città dolente, per me si va nell'eterno dolore, per me si va tra la perduta gente. Lasciate ogni speranza voi ch'entrate ...";
const displayText = ref<String>("");
const countChar = ref<number>(0);
const props = defineProps({
    languages:{
        type: String,
        required: true,
        validator: value => {return value != ""}
    }
})
const router:Router = useRouter()

//funzione che permette di scrivere una lettera alla volta grazie al set interval ed al fatto che una stringa non è altro che un array di char.
const writer = ():void => {
    const interval:ReturnType<typeof setInterval> = setInterval(() => {
        displayText.value += starterText[countChar.value];
        if (starterText[countChar.value] =="," || 
           (starterText[countChar.value] =="." && starterText[countChar.value+1] !=".")
          ) 
            displayText.  value += "<br> <br>"
        countChar.value++;
        if (countChar.value === starterText.length) {
            clearInterval(interval);
            setTimeout(() => {
                router.push({ name: 'game', params: {language: props.languages } }); //ci sposta nella view del gioco, passando il parametro per far partire la chiamata axios.
            }, 3000);
        }
    }, 100);
}

onMounted(() => {
    writer();
});

</script>

<template>
    <div class="container" >
        <div>
            <h4 class="text-appear-writer">Questa è la tua ultima possibilità...</h4>
        </div>
        <div>
            <h6 v-html="displayText" class="text-appear-writer"></h6>
        </div>
    </div>
</template>


<style scoped lang="scss">
@use '../../assets/style/mixin' as mix;
@use '../../assets/style/variable' as var;

div.container {
    @include mix.displayFlex(center,center,column);
}


</style>
