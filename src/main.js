import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

// Font awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortDown, faTimes, faBars, faEllipsisH, faInfoCircle, faHome, faSlidersH, faTrophy, faDice, faRandom, faEdit, faChevronLeft, faPlay, faPlus, faPen, faCogs } from "@fortawesome/free-solid-svg-icons";
library.add(faSortDown, faTimes, faBars, faEllipsisH, faInfoCircle, faHome, faSlidersH, faTrophy, faDice, faRandom, faEdit, faChevronLeft, faPlay, faPlus, faPen, faCogs);

// VueX 4.0
const store = createStore({
    state() {
        return {
            // INTEGER //
            teamId: 2, // ajout des équipes
            nbTeam: 1, // nb d'équipes qui participent
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

            // SETTINGS //
            win: 'D',
            equal: '1',
            loose: '0',
            randomTeam: false,

            // OPTIONS ADVANCED //
            langage: 'french',
            darkMode: false

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
        // SETTINGS
        getWin: state => {
            return state.win;
        },
        getEqual: state => {
            return state.equal;
        },
        getLoose: state => {
            return state.loose;
        },
        getRandomTeam: state => {
            return state.randomTeam;
        },
        // OPTIONS ADVANCED
        getDarkMode: state => {
            return state.darkMode;
        }
    },
    mutations: {
        // teamId <integer>
        setTeamId(state, val) {
            state.teamId = val;
        },
        incrementTeamId(state) {
            state.teamId++;
        },
        reduceTeamId(state) {
            state.teamId--;
        },
        // nbTeam <integer>
        setNbTeam(state, val) {
            state.nbTeam = val;
        },
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
        setNbTours(state, val) {
            state.nbTours = val;
        },
        addNbTours(state) {
            state.nbTours++;
        },
        // play1 <string>
        setPlay1(state, val) {
            state.play1 = val;
        },
        // play2 <string>
        setPlay2(state, val) {
            state.play2 = val;
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
        // started <boolean>
        setStarted(state, val) {
            state.started = val;
        },
        // poolFinish <boolean>
        setPoolFinish(state, val) {
            state.poolFinish = val;
        },
        // gameFinish <boolean>
        setGameFinish(state, bool) {
            state.gameFinish = bool;
        },
        // SETTINGS
        setWin(state, string) {
            state.win = string;
        },
        setEqual(state, string) {
            state.equal = string;
        },
        setLoose(state, string) {
            state.loose = string;
        },
        setRandomTeam(state, bool) {
            state.randomTeam = bool;
        },
        // OPTIONS ADVANCED
        setDarkMode(state, bool) {
            state.darkMode = bool;
        }
    }
})

createApp(App).use(router).use(store)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
