<template>
  <div>
    <Header linkText="LET'S GO" href="/game" />

    <div class="container">
      <div id="param-header">
        <div id="mode-param">
          <div id="mode">
            <label for="mode">Mode de jeu</label>
            <select name="mode">
              <option value="tournament">Tournoi</option>
              <option value="elimination">Élimination</option>
            </select>
          </div>
          <div id="param">
            <label for="param">Paramètres</label>
            <font-awesome-icon
              :icon="['fa', 'sort-down']"
              class="font-awesome-icon"
              @click="displayParam()"
            />
          </div>
        </div>

        <div id="params">
          <component
            v-for="(component, index) in params"
            :key="index"
            :is="component"
          />
        </div>
      </div>

      <div id="teams">
        <component
          v-for="(component, index) in teams"
          :key="index"
          :is="component"
        />
        <div id="add-team">
          <a @click="addTeam()" class="add-team-button">
            <img
              class="add-team-img"
              :src="require(`../assets/add_team.svg`)"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import NewTeam from "@/components/NewTeam.vue";
import ParamTournament from "@/components/ParamTournament.vue";

export default {
  name: "Home",
  components: {
    Header,
    NewTeam,
    ParamTournament,
  },
  data() {
    return {
      teams: [],
      params: <ParamTournament />,
    };
  },
  created() {
    this.teams.push(<NewTeam id="1" />);
    this.teams.push(<NewTeam id="2" />);
  },
  beforeUnmount() {
    this.init();

    // INTEGER
    localStorage.nbTeam = this.$store.getters.getNbTeam;
    localStorage.nbTours = this.$store.getters.getNbTours;
    localStorage.totalMatch = this.$store.getters.getTotalMatch;

    // ARRAY
    let parsed = JSON.stringify(this.$store.getters.getTeam);
    localStorage.setItem("teams", parsed);
    parsed = JSON.stringify(this.$store.getters.getListMatch);
    localStorage.setItem("listMatch", parsed);
  },
  methods: {
    addTeam: function () {
      this.teams.push(
        <NewTeam id={this.$store.getters.getTeamId} remove={this.removeTeam} />
      );
      this.$store.commit("addNbTeam");
      this.$store.commit("incrementTeamId");
    },
    displayParam: function () {
      const params = document.querySelector("#params");
      if (
        params.style.visibility == "" ||
        params.style.visibility == "hidden"
      ) {
        params.style.visibility = "visible";
      } else {
        params.style.visibility = "hidden";
      }
    },
    // initialise la partie avec toutes les équipes
    init: function () {
      const store = this.$store.getters;
      if (store.getStarted == false) {
        // team <array> & resFinal <array>
        let res = Array.from(this.getTeam(new Map()), ([name, value]) => ({
          name,
          value,
        }));
        console.log(res);
        this.$store.commit("setTeam", res);
        this.$store.commit("setResFinal", res);
      }
      if (store.getListMatch == [] || store.getPoolFinish == false) {
        this.$store.commit("setListMatch", this.listGame());
        this.$store.commit("setTotalMatch", store.getListMatch.length);
      }
      if (store.getTeam.size < 2 && store.getPoolFinish == true)
        this.$store.commit("setGameFinish", true);
      if (store.getGameFinish == true)
        this.$store.commit("setTeam", store.getResFinal);
    },
    // récupère toutes les équipes
    getTeam: function (team) {
      for (let i = 1; i <= this.$store.getters.getNbTeam; i++) {
        let players = [];
        const teamName = document.querySelector("#team-input" + i).value;
        const listPlayers = document
          .querySelector("#team" + i)
          .querySelectorAll(".team-input1");
        for (let j = 0; j < listPlayers.length; j++) {
          if (listPlayers[j].value != "")
            players.push(listPlayers[j].value + " ");
        }
        if (teamName != "") team.set(i, [teamName, players, 0]);
      }
      return team;
    },
    // Créer une liste de match aléatoire
    listGame: function () {
      const store = this.$store.getters;
      let res = "";
      let match = [];
      for (let i = 1; i <= store.getNbTeam; i++) {
        for (let j = 1; j <= store.getNbTeam; j++) {
          if (i != j) {
            if (res.includes([j, i]) == false) {
              res += "," + i + "," + j;
            }
          }
        }
      }
      res = res.split(",").join("");
      for (let i = 0; i < res.length; i += 2) {
        match.push([res[i], res[i + 1]]);
      }
      return match.sort(() => Math.random() - 0.5);
    },
  },
};
</script>

<style scoped>
#param-header {
  margin-bottom: -2rem;
}

#mode-param {
  display: flex;
  justify-content: center;
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

#mode,
#param {
  display: flex;
  align-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
}

#mode select,
#param input {
  margin-top: 0.2rem;
  margin-left: 2rem;
  height: 2.2rem;
}

#params {
  color: white;
  visibility: hidden;
}

#teams {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 4rem;
  margin-bottom: 8rem;
}

#add-team {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 270px;
}

.add-team-img {
  width: 90px;
  height: 90px;
  margin-top: -2rem;
  animation-name: bounce;
  animation-duration: 800ms;
  animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  animation-iteration-count: infinite;
}
</style>