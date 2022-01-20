import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Choices from '../views/Choices.vue'
import Game from '../views/Game.vue'
import ScoreTable from '../views/ScoreTable.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/choices',
    name: 'Choices',
    component: Choices
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/score',
    name: 'ScoreTable',
    component: ScoreTable
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
