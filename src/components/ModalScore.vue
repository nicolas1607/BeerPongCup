<template>
  <div id="modal-score" class="overlap" hidden>
    <div id="modal">
      <a id="close-modal" @click="this.$parent.closeScoreModal()">X</a>
      <div id="title-score">
        <p class="title-team-modal">{{ this.$parent.play1 }}</p>
        <img :src="require(`../assets/vs_white.svg`)" />
        <p class="title-team-modal">{{ this.$parent.play2 }}</p>
      </div>
      <div id="div-img-modal">
        <div class="div-team">
          <!-- Team n°1 -->
          <div id="team1" class="team">
            <div id="sub-div">
              <span id="team-name1">{{ this.$parent.play1 }}</span>
            </div>
            <div id="sub-div-score">
              <div id="team-score-div">
                <input
                  id="team-score-valeur1"
                  class="team-score-valeur"
                  pattern="d*"
                  maxlength="1"
                  value="0"
                />
                <p>pts</p>
              </div>
              <div class="change-score-div">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="lessPts(1)"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="addPts(1)"
                />
              </div>
            </div>
          </div>
          <!-- Team n°2 -->
          <div id="team2" class="team">
            <div id="sub-div">
              <span id="team-name2">{{ this.$parent.play2 }}</span>
            </div>
            <div id="sub-div-score">
              <div id="team-score-div">
                <input
                  id="team-score-valeur2"
                  class="team-score-valeur"
                  pattern="d*"
                  maxlength="1"
                  value="0"
                />
                <p>pts</p>
              </div>
              <div class="change-score-div">
                <img
                  class="change-score"
                  :src="require(`../assets/less_pts.svg`)"
                  @click="lessPts(2)"
                />
                <img
                  class="change-score"
                  :src="require(`../assets/add_pts.svg`)"
                  @click="addPts(2)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="div-button-modal"
        v-if="this.$parent.nbTours < this.$parent.totalMatch - 1"
      >
        <button class="button-modal" @click="setScore()" disabled>
          Valider
        </button>
      </div>
      <div id="div-button-modal" v-else>
        <router-link to="/score_table" class="button-modal"
          >Valider</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalScore",
  data() {
    return {};
  },
  beforeUnmount() {
    this.setScore();
  },
  methods: {
    addPts(id) {
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value < 9) valeur.value = parseInt(valeur.value) + 1;
      this.verifVictory();
    },
    lessPts(id) {
      const valeur = document.querySelector("#team-score-valeur" + id);
      if (valeur.value > 0) valeur.value = parseInt(valeur.value) - 1;
      this.verifVictory();
    },
    verifVictory() {
      const score1 = document.querySelector("#team-score-valeur1");
      const score2 = document.querySelector("#team-score-valeur2");
      const button = document.querySelector(".button-modal");
      if (
        (score1.value > 0 && score2.value == 0) ||
        (score1.value == 0 && score2.value > 0)
      )
        button.disabled = false;
      else button.disabled = true;
    },
    setScore() {
      const team1 = document.querySelector("#team-name1").innerHTML;
      const score1 = document.querySelector("#team-score-valeur1").value;
      document.querySelector("#team-score-valeur1").value = "0";
      const team2 = document.querySelector("#team-name2").innerHTML;
      const score2 = document.querySelector("#team-score-valeur2").value;
      document.querySelector("#team-score-valeur2").value = "0";
      // Augmente le nbTours
      this.$parent.nbTours++;
      this.$store.commit("addNbTours");
      localStorage.nbTours = this.$parent.nbTours;
      // Supprimer le match de listMatch
      const matchs = [];
      for (let match of this.$parent.listMatch) {
        if (
          this.$parent.getTeamName(match[0]) == team1 &&
          this.$parent.getTeamName(match[1]) == team2
        ) {
          // empty
        } else {
          matchs.push([match[0], match[1]]);
        }
      }
      let parsed = JSON.stringify(matchs);
      localStorage.setItem("listMatch", parsed);
      this.$store.commit("setListMatch", matchs);
      if (localStorage.getItem("listMatch")) {
        this.$parent.listMatch = JSON.parse(localStorage.getItem("listMatch"));
      }
      // Maj du tableau des scores
      const result = [];
      for (let team of this.$parent.teams) {
        if (team["value"][0] == team1) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score1),
            ],
          });
        } else if (team["value"][0] == team2) {
          result.push({
            name: team["name"],
            value: [
              team["value"][0],
              team["value"][1],
              parseInt(team["value"][2]) + parseInt(score2),
            ],
          });
        } else {
          result.push({
            name: team["name"],
            value: [team["value"][0], team["value"][1], team["value"][2]],
          });
        }
      }
      parsed = JSON.stringify(result);
      localStorage.setItem("teams", parsed);
      this.$store.commit("setTeam", result);
      if (localStorage.getItem("teams")) {
        this.$parent.teams = JSON.parse(localStorage.getItem("teams"));
      }
      this.$parent.closeScoreModal();
    },
  },
};
</script>

<style>
.overlap {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: scroll;
}

.overlap[hidden] {
  display: none;
}

#modal {
  overflow: scroll;
  position: relative;
  background-color: #ef476f;
  position: absolute;
  width: 100%;
  top: 10%;
  bottom: 10%;
  left: 10%;
  width: 60%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@media screen and (min-width: 36em) {
  #modal {
    padding: 4rem 8rem 0 8rem;
  }
}

#close-modal {
  position: absolute;
  top: 0;
  right: 0;
  padding: 3rem 4rem 1.5rem 2rem;
  color: white;
  opacity: 0.4;
  font-size: 1.2rem;
}

#close-modal:hover {
  transform: scale(1.2);
  opacity: 1;
}

/* Fenêtre modale Score */
#div-img-modal {
  display: flex;
  justify-content: space-around;
}

#title-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

#title-score img {
  width: 4rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

@media screen and (min-width: 36em) {
  #title-score {
    align-items: unset;
    flex-direction: row;
  }
}

.div-team {
  margin: 2rem auto;
  flex-direction: column;
}

.team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2.4rem;
  color: white;
  text-align: center;
  max-height: 6rem;
}

@media screen and (min-width: 36em) {
  .team {
    display: grid;
    grid-template-columns: 40% 60%;
    gap: 3%;
  }
}

#sub-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

#sub-div-score {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.team-name {
  word-break: break-word;
}

#team-score-div {
  display: flex;
  align-items: center;
}

.team-score-valeur {
  text-align: center;
  width: 1.4rem;
  height: 2rem;
  background-color: #ef476f;
  border: none;
  color: white;
  font-size: 2.4rem;
}

.change-score-div {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 8rem;
}

.change-score {
  cursor: pointer;
  width: 40%;
  margin-top: 1rem;
  opacity: 0.6;
}

.change-score:hover {
  opacity: 1;
}

@media screen and (min-width: 36em) {
  .change-score:hover {
    animation-name: bounce;
    animation-duration: 800ms;
    animation-iteration-count: infinite;
  }
}

#div-button-modal {
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
}

@media screen and (min-width: 36em) {
  #div-button-modal {
    margin-top: 4rem;
  }
}

.button-modal {
  padding: 1rem 4rem;
}

/* MODAL EDIT */
#match-edit {
  color: white;
  margin-top: 4rem;
  margin-bottom: 6rem;
  padding: 0 2rem;
}

@media screen and (min-width: 36em) {
  #match-edit {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem 4rem;
    padding: 0;
  }
}

.match-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
  border: solid 1px white;
  padding: 0rem 1rem;
  font-size: 1.4rem;
}

.match-edit:hover {
  animation: jelly 0.5s;
}

.match-edit-vs {
  width: 20%;
  margin: 0 1rem;
  /* margin-top: -.5rem; */
}

#match-edit-title {
  margin-top: 8rem;
}

@media screen and (min-width: 36em) {
  #match-edit-title {
    margin-top: 0;
  }
}
</style>