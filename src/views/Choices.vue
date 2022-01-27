<template>
  <div>
    <div class="go animate__animated animate__bounceIn animate__delay-1s">
      <router-link to="/game">
        <font-awesome-icon :icon="['fa', 'play']" class="font-awesome-icon" />
      </router-link>
    </div>
    <div class="btn-toggle animate__animated">
      <font-awesome-icon
        :icon="['fa', 'ellipsis-h']"
        class="font-awesome-icon"
        @click="displayBtn()"
      />
    </div>

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
          <a href="" class="menu-link">Tableau des scores</a>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Changer les équipes</a>
        </li>
      </ul>
    </div>

    <div class="container">
      <div id="param-header">
        <div id="mode-param">
          <div id="mode">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <label for="mode">Mode de jeu</label>
              <font-awesome-icon
                :icon="['fa', 'ellipsis-h']"
                class="font-awesome-icon"
                @click="displayParam()"
              />
            </div>
            <select id="mode-select" class="form-select" name="mode">
              <option value="tournament">Tournoi</option>
              <option value="elimination">Élimination</option>
            </select>
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

      <section>
        <div class="skewed-param"></div>
      </section>

      <div id="teams">
        <component
          v-for="(component, index) in teams"
          :key="index"
          :is="component"
        />
        <div id="add-team">
          <a
            @click="addTeam()"
            class="
              add-team-button
              animate__animated animate__bounceIn animate__delay-2s
            "
          >
            <font-awesome-icon
              :icon="['fa', 'plus']"
              class="font-awesome-icon"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import NewTeam from "@/components/NewTeam.vue";
import ParamTournament from "@/components/ParamTournament.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    NewTeam,
    ParamTournament,
    Footer,
  },
  data() {
    return {
      teams: [],
      params: <ParamTournament />,
    };
  },
  created() {
    this.teams.push(<NewTeam id="1" />);
    // this.teams.push(<NewTeam id="2" />);
  },
  mounted() {
    const mode = document.querySelector("#mode-select");
    mode.addEventListener("change", () => {
      if (mode.value == "elimination") {
        document.querySelector(".check-elim-series input").disabled = true;
      } else {
        document
          .querySelector(".check-elim-series input")
          .removeAttribute("disabled");
      }
    });
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
    hiddenMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeOutLeft";
      menu.style.display = "none";
      menu.style.display = "block";
    },
    addTeam: function () {
      this.teams.push(
        <NewTeam id={this.$store.getters.getTeamId} remove={this.removeTeam} />
      );
      this.$store.commit("addNbTeam");
      this.$store.commit("incrementTeamId");
    },
    displayParam: function () {
      const params = document.querySelector("#params");
      if (params.style.display == "" || params.style.display == "none") {
        params.style.display = "block";
        document
          .querySelector(".skewed-param")
          .setAttribute("style", "height: 23em");
        document
          .querySelector("#teams")
          .setAttribute("style", "margin-top: 3rem;");
      } else {
        params.style.display = "none";
        document
          .querySelector(".skewed-param")
          .setAttribute("style", "height: 5em");
        document
          .querySelector("#teams")
          .setAttribute("style", "margin-top: 2rem;");
      }
    },
    displayBtn() {
      const toggle = document.querySelector(".btn-toggle");
      const go = document.querySelector(".go");
      const add = document.querySelector(".add-team-button");
      console.log(go.style.display);
      if (go.style.display == "flex" || go.style.display == "") {
        go.style.display = "none";
        add.style.display = "none";
        toggle.setAttribute("style", "transform: rotate(-270deg)");
      } else {
        go.style.display = "flex";
        add.style.display = "flex";
        toggle.setAttribute("style", "transform: rotate(0)");
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
.add-team-button {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 14rem;
  right: 1.5rem;
  border-radius: 10rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  width: 3rem;
  height: 3rem;
  box-shadow: 3px 3px 6px 5px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-color);
  z-index: 10;
}

.go {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10rem;
  right: 1.5rem;
  font-size: 1.2rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-color);
  border-radius: 10rem;
  height: 3rem;
  width: 3rem;
  z-index: 10;
  transform: scale(1.1);
}

.btn-toggle {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 6rem;
  color: white;
  right: 1.5rem;
  font-size: 1.2rem;
  box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
  background-color: var(--primary-color);
  border-radius: 10rem;
  height: 3rem;
  width: 3rem;
  z-index: 10;
  transform: scale(1.1);
  transform: rotate(0);
  transition: transform 2s;
}

.go a {
  margin-left: 0.2rem;
}

.skewed-param {
  position: absolute;
  top: 3em;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 5em;
  background-color: var(--primary-color);
  z-index: -1;
  transform: skewY(-1deg);
  transform-origin: top left;
  opacity: 0.4;
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

#param-header {
  position: relative;
}

#params {
  display: none;
  color: white;
}

#mode-param {
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
  margin-top: 4rem;
}

#mode,
#param {
  display: flex;
  align-content: center;
}

#mode select,
#param input {
  margin-top: 0.2rem;
  height: 2.2rem;
  width: 100%;
}

#mode {
  display: flex;
  flex-direction: column;
}

#mode select {
  border: transparent !important;
  border-radius: 0.2rem;
  margin-top: 1rem;
}

#param {
  margin-top: 2rem;
  position: relative;
}

#teams {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

#add-team {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 270px;
}
</style>