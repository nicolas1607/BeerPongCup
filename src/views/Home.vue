<template>
  <div>
    <div class="content">
      <router-link
        class="home animate__animated animate__rotateIn"
        style="--animate-duration: 2s"
        to="choices"
      >
        <img class="nav-home-img" :src="require(`../assets/logo.png`)" />
      </router-link>
    </div>
    <!-- <div class="code">
      <label for="code">ID</label>
      <input type="text" name="code" class="form-control" />
    </div> -->
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Footer,
  },
  mounted() {
    // INTEGER
    this.$store.commit("setTeamId", 2);
    localStorage.teamId = this.$store.getters.getTeamId;
    this.$store.commit("setNbTeam", 1);
    localStorage.nbTeam = this.$store.getters.getNbTeam;
    this.$store.commit("setNbTours", 0);
    localStorage.nbTours = this.$store.getters.getNbTours;
    this.$store.commit("setTotalMatch", 0);
    localStorage.totalMatch = this.$store.getters.getTotalMatch;

    // STRINGS //
    this.$store.commit("setPlay1", "");
    localStorage.play1 = this.$store.getters.getPlay1;
    this.$store.commit("setPlay2", "");
    localStorage.play2 = this.$store.getters.getPlay2;

    // BOOLEAN //
    this.$store.commit("setStarted", false);
    localStorage.started = this.$store.getters.getStarted;
    this.$store.commit("setPoolFinish", false);
    localStorage.poolFinish = this.$store.getters.getPoolFinish;
    this.$store.commit("setGameFinish", false);
    localStorage.gameFinish = this.$store.getters.getGameFinish;

    // ARRAYS //
    this.$store.commit("setTeam", []);
    localStorage.team = this.$store.getters.getTeam;
    this.$store.commit("setResFinal", []);
    localStorage.resFinal = this.$store.getters.getResFinal;
    this.$store.commit("setListMatch", []);
    localStorage.listMatch = this.$store.getters.getListMatch;

    // SETTINGS //
    this.$store.commit("setWin", "D");
    localStorage.win = this.$store.getters.getWin;
    this.$store.commit("setEqual", "1");
    localStorage.equal = this.$store.getters.getEqual;
    this.$store.commit("setLoose", "0");
    localStorage.loose = this.$store.getters.getLoose;
    this.$store.commit("setRandomTeam", false);
    localStorage.randomTeam = this.$store.getters.getRandomTeam;
  },
  beforeUnmount() {
    this.newGame();
    setTimeout(() => {}, 5000);
  },
  methods: {
    newGame() {
      const img = document.querySelector(".content a");
      img.className = "home animate__animated animate__rotateOut";
      img.style.display = "none";
      img.style.display = "block";
    },
  },
};
</script>

<style scoped>
@import url("../../node_modules/magic.css/dist/magic.min.css");
.magictime {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}

/* LOGO */
.home {
  position: relative;
  display: flex;
  justify-content: center;
  top: 30vh;
  border: solid 10px white;
  border-radius: 100rem;
  width: 15rem;
  height: 15rem;
  margin: auto;
  box-shadow: 8px 8px 8px 10px rgba(0, 0, 0, 0.1);
}

.nav-home-img {
  transform: scale(0.5) !important;
}

/* ID */
/* .code {
  width: 95%;
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: white;
  bottom: 2rem;
  margin: auto;
} */
</style>
