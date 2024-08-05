import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import EndGameView from '@/views/EndGameView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/game/:language',
      name:'game',
      component: GameView
    },
    {
      path:'/summary/:condition',
      name:'summary',
      component: EndGameView
    },
    {
      path: '/:catchAll(.*)', // Gestisce tutte le altre rotte non valide
      component: HomeView
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (from.fullPath) {
    to.meta.oldPath = from.fullPath;
  }
  next();
});

//guard globale:
router.beforeEach((to, from, next) => {
  // Verifica se l'utente sta digitando la URL manualmente, in quanto la url attuale (from) . name (ovvero nome del componente) è compromessa dalla digitazione manuale, quindi risulterà null.  La seconda condizione è che dove vorrà andare sia diverso da home, in quanto l'utente può solo digitare la home come url giusta.
  if (from.name === null && to.name !== 'home') {
    next({ name: 'Home' }); // se sono vere, ridirige alla home.
    return;
  }
  next(); // Consenti la navigazione
  
});



export default router
