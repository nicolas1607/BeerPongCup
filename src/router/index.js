import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Choices from '../views/Choices.vue'
import Game from '../views/Game.vue'
import ScoreTable from '../views/ScoreTable.vue'
import Settings from '../views/Settings.vue'

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
    path: '/score_table',
    name: 'ScoreTable',
    component: ScoreTable
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
]

const router = createRouter({
  base: "/",
  history: createWebHistory(),
  routes
})

export default router
