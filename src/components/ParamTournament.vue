<template>
  <div class="checkboxes">
    <!-- Paramètres du mode -->
    <div class="param-mode animate__animated animate__bounceInLeft">
      <h2>Paramètres du mode</h2>
      <div
        class="checkbox"
        style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem"
      >
        <div>
          <input
            id="teamVteam"
            type="checkbox"
            name="return"
            @click="teamVteam()"
            checked
          />
          <label for="return">EcE</label>
        </div>
        <div>
          <input
            id="playerVplayer"
            type="checkbox"
            name="return"
            @click="playerVplayer()"
          />
          <label for="return">JcJ</label>
        </div>
      </div>
      <div class="checkbox check-elim-series">
        <input type="checkbox" name="return" checked />
        <label for="return">Activer la série d'élimination</label>
      </div>
      <!-- <div class="checkbox">
        <input type="checkbox" name="return" />
        <label for="return">Activer la double élimination</label>
      </div> -->
      <!-- <div class="checkbox">
        <input type="checkbox" name="return" />
        <label for="return">Activer les matchs retour</label>
      </div> -->
      <div class="checkbox">
        <input type="checkbox" name="return" />
        <label for="return">Créer les équipes aléatoirement</label>
      </div>
    </div>
    <!-- Options avancées -->
    <div
      class="
        param-advanced
        animate__animated animate__bounceInLeft animate__delay-1s
      "
    >
      <h2>Options avancées</h2>
      <div class="nb-pts-select">
        <label for="table"
          >Nb de table à jouer
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
          />
        </label>
        <select id="table" class="nb-pts" name="table">
          <option value="1" selected>1</option>
          <option value="3">2</option>
          <option value="5">3</option>
          <option value="5">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="nb-pts-select">
        <label for="win"
          >Nb de points par victoire
          <font-awesome-icon
            :icon="['fa', 'info-circle']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
          />
        </label>
        <select id="win" class="nb-pts" name="win">
          <div>
            <option value="difference" selected>D</option>
          </div>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="nb-pts-select">
        <label for="equal">Nb de points par égalité</label>
        <select id="equal" class="nb-pts" name="equal">
          <option value="0">0</option>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div class="nb-pts-select">
        <label for="loose">Nb de points par défaite</label>
        <select id="loose" class="nb-pts" name="loose">
          <option value="0" selected>0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamTournament",
  mounted() {
    // WINNER
    const win = document.querySelector("#win");
    win.addEventListener("change", () => {
      this.$store.commit("setWin", win.value);
      localStorage.win = this.$store.getters.getWin;
    });
    // EQUAL
    const equal = document.querySelector("#equal");
    equal.addEventListener("change", () => {
      this.$store.commit("setEqual", equal.value);
      localStorage.equal = this.$store.getters.getEqual;
    });
    // LOOSE
    const loose = document.querySelector("#loose");
    loose.addEventListener("change", () => {
      this.$store.commit("setLoose", loose.value);
      localStorage.loose = this.$store.getters.getLoose;
    });
  },
  methods: {
    teamVteam() {
      const team = document.querySelector("#teamVteam");
      const player = document.querySelector("#playerVplayer");
      if (team.checked) {
        if (player.checked) {
          player.checked = false;
        } else {
          player.checked = true;
        }
      } else {
        if (player.checked) {
          player.checked = false;
        } else {
          player.checked = true;
        }
      }
    },
    playerVplayer() {
      // Gestion checkboxes
      const team = document.querySelector("#teamVteam");
      const player = document.querySelector("#playerVplayer");
      if (player.checked) {
        if (team.checked) {
          team.checked = false;
        } else {
          team.checked = true;
        }
      } else {
        if (team.checked) {
          team.checked = false;
        } else {
          team.checked = true;
        }
      }
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 2rem;
}

.checkboxes {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 1rem;
}

.checkboxes label {
  font-size: 1rem;
}

.nb-pts-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nb-pts {
  width: 3rem;
  background-color: transparent;
  color: white;
  border: transparent;
}
</style>
