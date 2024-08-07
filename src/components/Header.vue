<script setup lang="ts">
import TimerBox from './subComponents/TimerBox.vue';
import ScoreBox from './subComponents/ScoreBox.vue';
import ErrorCountBox from './subComponents/ErrorCountBox.vue';
import {ref,watch} from 'vue'
import { useRoute} from 'vue-router';
import { regexSummary } from '@/configVariables';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const endGameDefeat= ref<boolean>(false)
const route:RouteLocationNormalizedLoadedGeneric = useRoute();

watch (()=>route.path, (newPath:string) =>{
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
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <!-- componente punteggio -->
          <p class="nav-link mb-0">Punteggio: <ScoreBox /> </p>
        </li>
        <li class="nav-item">
          <!-- componente di calcolo degli errori effettuati -->
          <p class="nav-link mb-0">Errori Commessi: <ErrorCountBox /></p>
        
        </li>
        <li class="nav-item">
          <!-- componente calcola tempo trascorso quando il gioco parte! -->
          <p class="nav-link mb-0">Tempo trascorso: <TimerBox /></p>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped lang="scss">
@use '../assets/style/mixin' as mix;
@use '../assets/style/variable'as var;

li,a,p {
  color: var.$primaryTextColor !important;
  cursor: default;
  .nav-link:hover {
    color:var.$hoverTextColor !important;
  }
}

nav {
  @include mix.borderPrimaryType();
}

div.container-fluid{
  @include mix.displayFlex();
   gap: 3em;
}

.custom-toggler-icon {
  width: 20px; /* Imposta la larghezza desiderata */
  height: 20px; /* Imposta l'altezza desiderata */
}

@media (max-width:var.$maxWidthResp) {
  ul {
    flex-direction: row;
    gap: 1em;
  }
}

</style>