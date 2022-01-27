@<template>
  <div>
    <Header title="Phase de Pool" :linkText="this.nbMatch" href="" />

    <div id="menu">
      <div class="nav-title">
        <font-awesome-icon
          :icon="['fa', 'bars']"
          style="margin-left: 0; margin-right: 1rem"
          class="font-awesome-icon"
          @click="this.hiddenMenu()"
        />
        <img class="nav-img" :src="require(`../assets/logo.png`)" />
      </div>
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/" class="menu-link">Nouvelle partie</router-link>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Tableau des scores</a>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Changer les équipes</a>
        </li>
      </ul>
    </div>

    <ModalScore />

    <div id="modal-edit" class="overlap" hidden>
      <div id="modal">
        <a id="close-modal" @click="closeEditModal()">X</a>
        <h2 id="match-edit-title">
          Séléctionner <br />
          votre match
        </h2>
        <div id="match-edit">
          <div v-for="match in this.listMatch" :key="match">
            <a
              v-if="
                getTeamName(match[0]) != this.play1 ||
                getTeamName(match[1]) != this.play2
              "
              @click="changeMatch(match[0] + '-' + match[1])"
              class="match-edit"
            >
              <p>{{ getTeamName(match[0]) }}</p>
              <p>{{ getTeamName(match[1]) }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div id="table-team">
        <div class="div-table">
          <table class="table table-striped table-hover sortable">
            <thead>
              <tr>
                <th>#</th>
                <th>Équipe</th>
                <th>Joueurs</th>
                <th id="score-sortable">Score</th>
              </tr>
            </thead>
            <tbody v-for="team in teams" :key="team">
              <tr id="1" class="tr-elem">
                <td>{{ team.name }}</td>
                <td>{{ team.value[0] }}</td>
                <td class="table-players" v-if="team.value[1].length != 0">
                  <span v-for="(player, index) in team.value[1]" :key="player">
                    <p v-if="index < team.value[1].length - 1">{{ player }},</p>
                    <p v-else>{{ player }}</p>
                  </span>
                </td>
                <td v-else>/</td>
                {{
                  team.value[2]
                }}
                <td v-if="team.value[2] != null" id="score-sortable"></td>
                <td v-else id="score-sortable">0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="div-versus">
          <div id="div-versus-btn">
            <a @click="showEditModal()">
              <img
                id="edit-match"
                class="animate__animated animate__zoomIn animate__delay-2s"
                :src="require(`../assets/editer.png`)"
              />
            </a>
            <a @click="randomMatch()">
              <font-awesome-icon
                :icon="['fa', 'random']"
                id="switch-match"
                class="
                  font-awesome-icon
                  animate__animated animate__zoomIn animate__delay-2s
                "
              />
            </a>
            <a>
              <font-awesome-icon
                :icon="['fa', 'dice']"
                id="game-match"
                class="
                  font-awesome-icon
                  animate__animated animate__zoomIn animate__delay-2s
                "
              />
            </a>
          </div>

          <div id="div-players">
            <p id="player1" class="animate__animated animate__bounceIn">
              {{ play1 }}
            </p>
            <img
              id="team-versus"
              class="animate__animated animate__jackInTheBox animate__delay-1s"
              :src="require(`../assets/vs.svg`)"
            />
            <p id="player2" class="animate__animated animate__bounceIn">
              {{ play2 }}
            </p>
          </div>
          <button
            v-if="this.nbTours + 1 == 1"
            class="button-img"
            @click="showScoreModal()"
          >
            1er match
          </button>
          <button v-else class="button-img" @click="showScoreModal()">
            Jouer le match
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import ModalScore from "@/components/ModalScore.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    ModalScore,
    Footer,
  },
  data() {
    return {
      // INTEGER //
      nbTours: 0,
      totalMatch: 0,
      // STRING //
      nbMatch: "",
      play1: "",
      play2: "",
      // OBJECTS PROXY //
      teams: {},
      listMatch: {},
    };
  },
  created() {
    // touche 'Echap'
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const editModal = document.querySelector("#modal-edit");
        const scoreModal = document.querySelector("#modal-score");
        if (editModal.hidden == false) editModal.hidden = true;
        if (scoreModal.hidden == false) scoreModal.hidden = true;
      }
    });
  },
  mounted() {
    localStorage.win = this.$store.getters.getWin;
    localStorage.equal = this.$store.getters.getEqual;
    localStorage.loose = this.$store.getters.getLoose;
    // INTEGER //
    if (localStorage.nbTours) {
      this.nbTours = localStorage.nbTours;
    }
    if (localStorage.totalMatch) {
      this.totalMatch = localStorage.totalMatch;
    }

    // OBJECTS
    if (localStorage.getItem("teams")) {
      this.teams = JSON.parse(localStorage.getItem("teams"));
    }
    if (localStorage.getItem("listMatch")) {
      this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
    }

    // STRING
    if (localStorage.play1) {
      this.play1 = localStorage.play1;
    }
    if (localStorage.play2) {
      this.play2 = localStorage.play2;
    }

    // JS_SORTABLE
    let sortableScript = document.createElement("link");
    sortableScript.setAttribute("href", "../assets/js/sorttable.js");
    document.head.appendChild(sortableScript);
  },
  updated() {
    this.nbMatch =
      parseInt(localStorage.nbTours) + 1 + "/" + localStorage.totalMatch;
    if (this.listMatch[0]) {
      for (let team of this.teams) {
        if (team["name"] == this.listMatch[0][0]) {
          this.play1 = team["value"][0];
          localStorage.play1 = team["value"][0];
        }
        if (team["name"] == this.listMatch[0][1]) {
          this.play2 = team["value"][0];
          localStorage.play2 = team["value"][0];
        }
      }
    }
    this.sortedData();
  },
  methods: {
    hiddenMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeOutLeft";
      menu.style.display = "none";
      menu.style.display = "block";
    },
    getTeamName(id) {
      let res;
      for (let team of this.teams) {
        if (team["name"] == id) res = team["value"][0];
      }
      return res;
    },
    randomMatch(p1, p2) {
      if (this.listMatch[1]) {
        let match = [];
        for (let team of this.listMatch) {
          match.push([team[0], team[1]]);
        }
        // edit button match
        if (p1 && p2) {
          let flag = false;
          while (flag == false) {
            if (match[0][0] == p1 && match[0][1] == p2) {
              flag = true;
            } else {
              match.sort(() => Math.random() - 0.5);
            }
          }
        }
        // random button match
        else {
          while (
            this.listMatch[0][0] == match[0][0] &&
            this.listMatch[0][1] == match[0][1]
          ) {
            match.sort(() => Math.random() - 0.5);
          }
        }
        let parsed = JSON.stringify(match);
        localStorage.setItem("listMatch", parsed);
        this.$store.commit("setListMatch", match);
        if (localStorage.getItem("listMatch")) {
          this.listMatch = JSON.parse(localStorage.getItem("listMatch"));
        }
      }
    },
    sortedData() {
      this.teams.sort(function (a, b) {
        return a["value"][2] > b["value"][2] ? -1 : 1;
      });
    },
    changeMatch(teams) {
      const p1 = teams.split("-")[0];
      const p2 = teams.split("-")[1];
      this.randomMatch(p1, p2);
      this.closeEditModal();
    },
    // EDIT MODAL
    showEditModal() {
      const modal = document.querySelector("#modal-edit");
      modal.hidden = false;
    },
    closeEditModal() {
      const modal = document.querySelector("#modal-edit");
      modal.hidden = true;
    },
    // SCORE MODAL
    showScoreModal() {
      const modal = document.querySelector("#modal-score");
      modal.hidden = false;
    },
    closeScoreModal() {
      const modal = document.querySelector("#modal-score");
      modal.hidden = true;
    },
  },
};
</script>

<style scoped>
#div-versus {
  position: relative;
  text-align: center;
  color: white;
  margin-top: 6rem;
  margin-bottom: 4rem;
}

#div-versus-btn {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 10%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

#edit-match,
#switch-match,
#game-match {
  width: 100%;
}

#edit-match {
  --animate-duration: 1s;
}

#switch-match {
  --animate-duration: 1.5s;
}

#game-match {
  --animate-duration: 2s;
}

#team-versus {
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 30%;
}

.div-table {
  display: flex;
  flex-direction: column;
}

#player1,
#player2 {
  word-break: break-word;
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 0;
}

#player1 {
  margin-left: -4rem;
  --animate-duration: 2s;
}
#player2 {
  position: relative;
  margin-left: 4rem;
  right: 0;
  --animate-duration: 3s;
}

.button-img {
  padding: 0.8rem 1rem;
  font-size: 1rem;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
  animation: unset;
}
</style>