<script setup lang="ts">
import { popUpTimer, regexSummary } from '@/configVariables';
import {computed, ComputedRef, ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type {RouteLocationNormalizedLoadedGeneric, Router} from 'vue-router';


const route:RouteLocationNormalizedLoadedGeneric = useRoute();
const router:Router = useRouter();

const chisiamoPopUp= ref<boolean>(false);
const comegiocarePopUp = ref<boolean>(false);
const returnHomeToggle = ref<boolean>(false);
const endGameDefeat= ref<boolean>(false);

const popUpTimeOut = ref<ReturnType<typeof setInterval> | null> (null);


const handlePopUp=(index:number):void => {
  if (popUpTimeOut.value) return;
  switch(index){
    case 1:
    comegiocarePopUp.value = true;
    popUpTimeOut.value = setTimeout(() => {
      comegiocarePopUp.value = false;
      popUpTimeOut.value = null;
    }, 5000);
    break;
    case 2:
      chisiamoPopUp.value = true;
      popUpTimeOut.value = setTimeout(() => {
        chisiamoPopUp.value = false;
        popUpTimeOut.value = null;
      }, popUpTimer);
        
    break;
    default: return;
  }
}

const handleClosePopUp = ():void => {
  if(popUpTimeOut.value !== null ) 
     clearTimeout(popUpTimeOut.value);
  popUpTimeOut.value = null;
  chisiamoPopUp.value = false;
  comegiocarePopUp.value = false;
}

const confirmReturn = ():void => {
  if (route.path === '/') return ;
  const confirmText:string= "Sei sicuro di voler tornare alla Home? tutti i progressi andranno persi!"
  if(confirm(confirmText))
    router.push({ name: 'home' });
}

const divSizeObj:ComputedRef<{'gap' : boolean}> = computed (() => ({
  'gap' : !returnHomeToggle.value
}))

watch (()=>route.path, (newPath:string) =>{
  if(newPath ==="/") {
     returnHomeToggle.value = false;
  }else {
    returnHomeToggle.value = true;
  }

  if(regexSummary.test(newPath)) {
    setTimeout(() => {
      endGameDefeat.value=true;
    }, 20);

  }
  else endGameDefeat.value=false;
})


</script>





<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-opacity-50" v-if="!endGameDefeat">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#footerbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="footerbarNav">
      <ul class="navbar-nav" :class="divSizeObj">
        <li class="nav-item" v-if="returnHomeToggle">
          <router-link class="nav-link mb-0 pointer" :to="{name: 'home'}" @click.native.prevent="confirmReturn">Torna alla Home</router-link>
        </li>
        <li class="nav-item">
           <p class="nav-link mb-0 pointer" @click="handlePopUp(1)">Come si gioca?</p>
            <div class="pop-up bgCenterSetting container" 
            v-if="comegiocarePopUp"
            @click="handleClosePopUp">
              <p>Il giocatore sceglie in quale lingua giocare. Una parola verrà generata casualmente nella lingua scelta.</p>
              <p>Il giocatore deve scegliere una lettera dalla tastiera virtuale e clickare sul tasto "Enter".</p>
              <p>Se la lettera scelta è tra quelle che compongono la parola nascosta essa verrà svelata sullo schermo al posto dei trattini "_" </p>
              <p>Se la lettera non è presente nella parola il conteggio degli errori aumenta di 1. Se il giocatore raggiunge 6 errori ha perso la partita.</p>
              <p>Il giocatore vince la partita se svela l'intera parola prima di commettere 6 errori.</p>
            </div>
        </li>
        <li class="nav-item">
          <p class="nav-link mb-0 pointer" @click="handlePopUp(2)">Chi siamo?</p>
            <div class="pop-up bgCenterSetting container"
            v-if="chisiamoPopUp"
            @click="handleClosePopUp">
              <p class="right-align">Created by Andrea - TheCoder 07/2024.</p>
            </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-if="comegiocarePopUp || chisiamoPopUp" class="overlay" @click="handleClosePopUp"></div>
</nav>
</template>

<style scoped lang="scss">
@use '../assets/style/mixin' as mix;
@use '../assets/style/variable'as var;

nav {
  @include mix.borderPrimaryType();
  li,a,p {
    color: var.$primaryTextColor !important;
    cursor:default;
    .nav-link:hover {
      color:var.$hoverTextColor !important;
    }
    .pointer{
      cursor:pointer;
    }
  }
  div.pop-up{
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    z-index: 10000;
    p{
      padding: 0.3em;
    } 
  }
}

.right-align{
        text-align: right;
      }

.gap {
  gap: 8em;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent; 
  z-index: 9999;  
}

div.container-fluid{
  @include mix.displayFlex();
   gap: 3em;
}

@media (max-width: var.$maxWidthResp) {
  ul {
    flex-direction: row;
    gap: 1em;
  }
}

</style>