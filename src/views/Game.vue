@<template>
  <div>
    <Header :linkText="this.nbMatch" href="" />

    <ModalScore />

    <div id="modal-edit" class="overlap" hidden>
      <div id="modal">
        <a id="close-modal" @click="closeEditModal()">X</a>
        <h2 id="match-edit-title">Séléctionner votre match</h2>
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
              <img
                :src="require(`../assets/vs_white.svg`)"
                class="match-edit-vs"
              />
              <p>{{ getTeamName(match[1]) }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="score-title">Phase de Pool</h1>
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
                <td v-if="team.value[1]">
                  <span v-for="player in team.value[1]" :key="player">
                    {{ player }} /
                  </span>
                </td>
                <td v-else></td>
                <td id="score-sortable">{{ team.value[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="div-versus">
          <div id="div-players">
            <p id="player1">{{ play1 }}</p>
            <img id="team-versus" :src="require(`../assets/vs.svg`)" />
            <p id="player2">{{ play2 }}</p>
          </div>
          <div id="div-img-versus">
            <img
              id="switch-button"
              :src="require(`../assets/switch.svg`)"
              @click="randomMatch()"
            />
            <img
              id="edit-button"
              :src="require(`../assets/edit.svg`)"
              @click="showEditModal()"
            />
            <button
              v-if="this.nbTours + 1 == 1"
              class="button-img"
              @click="showScoreModal()"
            >
              1er match
            </button>
            <button v-else class="button-img" @click="showScoreModal()">
              {{ this.nbTours + 1 }}ème match
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ModalScore from "@/components/ModalScore.vue";

export default {
  name: "Home",
  components: {
    Header,
    ModalScore,
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
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
  opacity: 0.8;
}

#team-versus {
  margin: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 20%;
}

#div-img-versus {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 8rem;
}

#switch-button,
#edit-button {
  z-index: 10000;
  background-color: #ef476f;
  margin: auto;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 10rem;
  cursor: pointer;
}

#switch-button:hover,
#edit-button:hover {
  transform: scale(1.2);
}

.div-table {
  display: flex;
  flex-direction: column;
}

#player1,
#player2 {
  word-break: break-word;
  font-size: 1.8rem;
}

.button-img {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
}

@media screen and (min-width: 36em) {
  #player1 {
    margin-left: -10rem;
  }
  #player2 {
    margin-left: 10rem;
  }
  #div-img-versus {
    margin-bottom: 0;
  }
  #div-versus {
    position: absolute;
    top: 25%;
    left: 65%;
    margin-left: 0;
  }
}
</style>