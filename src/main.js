import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortDown, faTimes, faChevronRight } from "@fortawesome/free-solid-svg-icons";
library.add(faSortDown, faTimes, faChevronRight);

// VueX 4.0
const store = createStore({
    state() {
        return {
            // INTEGER //
            teamId: 3, // ajout des équipes
            nbTeam: 2, // nb d'équipes qui participent
            nbTours: 0, // nb de matchs déjà réalisés
            totalMatch: 0, // nb de matchs à réaliser

            // STRINGS //
            play1: '',
            play2: '',

            // BOOLEAN //
            started: false,
            poolFinish: false,
            gameFinish: false,

            // ARRAYS //
            team: [], // la liste des équipes, des joueurs et des scores
            resFinal: [], // la liste des équipes pour le tableau final des scores
            listMatch: [],
        }
    },
    getters: {
        // INTEGER //
        getTeamId: state => {
            return state.teamId;
        },
        getNbTeam: state => {
            return state.nbTeam;
        },
        getNbTours: state => {
            return state.nbTours;
        },
        getTotalMatch: state => {
            return state.totalMatch;
        },
        // STRING //
        getPlay1: state => {
            return state.play1;
        },
        getPlay2: state => {
            return state.play2;
        },
        // BOOLEAN //
        getStarted: state => {
            return state.started;
        },
        getPoolFinish: state => {
            return state.poolFinish;
        },
        getGameFinish: state => {
            return state.gameFinish;
        },
        // ARRAY //
        getTeam: state => {
            return state.team;
        },
        getResFinal: state => {
            return state.resFinal;
        },
        getListMatch: state => {
            return state.listMatch;
        },
    },
    mutations: {
        // teamId <integer>
        incrementTeamId(state) {
            state.teamId++;
        },
        reduceTeamId(state) {
            state.teamId--;
        },
        // nbTeam <integer>
        addNbTeam(state) {
            state.nbTeam++;
        },
        removeNbTeam(state) {
            state.nbTeam--;
        },
        // totalMatch <integer>
        setTotalMatch(state, bool) {
            state.totalMatch = bool;
        },
        // nbTours <integer>
        addNbTours(state) {
            state.nbTours++;
        },
        // team <array>
        setTeam(state, array) {
            state.team = array;
        },
        // resFinal <array>
        setResFinal(state, array) {
            state.resFinal = array;
        },
        // listMatch <array>
        setListMatch(state, array) {
            state.listMatch = array;
        },
        // gameFinish <boolean>
        setGameFinish(state, bool) {
            state.gameFinish = bool;
        }
    }
})

createApp(App).use(router).use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
