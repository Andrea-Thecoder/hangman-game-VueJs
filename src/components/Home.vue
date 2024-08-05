<script setup lang="ts">
import StaterGame from './subComponents/StarterGame.vue';
import {ref,computed} from 'vue';
import type {Ilang} from '../types/interfaces';
import type {ComputedRef} from 'vue';


const starterValue = ref<boolean>(false) ;
const selectedLang = ref<string>("");
const classTouched = ref<boolean>(false);


const languageArray:Ilang[]=[
    {
    data:"it",
    language:"Italiano"
    },   
    {
    data:"en",
    language:"Inglese"
    },{
    data:"fr",
    language:"Francese"
    },{
    data:"es",
    language:"Spagnolo"
    }
]

const errorClassObj:ComputedRef<{'is-invalid': boolean}>= computed(() => ({
  'is-invalid': classTouched.value
}));

//inserimento dei return false/true è necessario per l'if nel controllo distart game.
const handleTouch = ():boolean =>{
    if(selectedLang.value ==="") {
        classTouched.value=true;
        return true;
    }else {
    classTouched.value=false;
    return false;
}
}

const startGame= ():void => {
    if(handleTouch()) return 
    starterValue.value= true;
}

</script>


<template>
    <div class="container p-3 widthmax">
        <div v-if="!starterValue" class="title"> 
            <h3>L'impiccato</h3>
            <h5>Svela la parola per salvarti</h5>
        </div>
        <div class="container form-group mt-5" v-if="!starterValue">
            <label class="form-label" for="language">
                Scegli la Lingua di gioco
            </label>
            <select 
                v-model="selectedLang" 
                @change="handleTouch"
                :class="errorClassObj"
                class="form-select form-select-sm bg-dark text-light"
                name="language" id="language">
                <option selected value="">-- Scegli una lingua --</option>
                <option v-for="({data,language}) in languageArray" :key="language" :value="data">{{ language }}</option>
            </select>
            <div class="d-flex justify-content-center mt-3">
                <button class="btn btn-secondary" @click="startGame">Inizia</button>
            </div>
        </div>
        <template v-if="starterValue">
        <StaterGame :languages="selectedLang"/>
        </template>
    </div>
</template>


<style scoped lang="scss">


.title{
    text-align: center;
}



</style>
