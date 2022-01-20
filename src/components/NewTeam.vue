<template>
  <div id="team">
    <div :id="'team' + id" class="team-class">
      <a :id="'remove-team' + id" class="remove-team" @click="removeTeam()"
        >X</a
      >
      <div class="team-label">
        <input
          :id="'team-input' + id"
          class="team-input"
          :aria-label="'Équipe n°' + id"
          name="team-name"
          :placeholder="'Équipe n°' + id"
          maxlength="24"
        />
      </div>
      <hr />
      <div :id="'players' + id" class="team-label">
        <component
          v-for="(component, index) in players"
          :key="index"
          :is="component"
        />
      </div>
      <button :id="'button' + id" class="team-button" @click="addPlayer()">
        Nouveau joueur
      </button>
    </div>
  </div>
</template>

<script>
import Choices from "../views/Choices.vue";
import NewPlayer from "./NewPlayer.vue";

export default {
  name: "NewTeam",
  props: ["id", "remove"],
  components: {
    NewPlayer,
    Choices,
  },
  data() {
    return {
      players: [],
    };
  },
  methods: {
    addPlayer() {
      this.players.push(NewPlayer);
    },
    removeTeam() {
      this.$store.commit("removeNbTeam");
      this.$store.commit("reduceTeamId");
      this.$el.remove();
      const teams = document.querySelectorAll(".team-class");
      for (let i = 0; i < teams.length; i++) {
        teams[i].id = "team" + (i + 1);
        teams[i].querySelector(".team-input").id = "team-input" + (i + 1);
        teams[i].querySelector(".team-input").placeholder =
          "Équipe n°" + (i + 1);
        teams[i].querySelector(".team-input").ariaLabel = "Équipe n°" + (i + 1);
        teams[i].querySelector(".team-button").id = "button" + (i + 1);
        teams[i].querySelector(".remove-team").id = "remove-team" + (i + 1);
        teams[i].querySelectorAll(".team-label")[1].id = "players" + (i + 1);
      }
    },
  },
};
</script>

<style scoped>
.team-class {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 2rem 2rem 2rem;
  border: transparent;
  background-color: white;
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  height: auto;
}

@media screen and (min-width: 36em) {
  .team-class {
    margin-bottom: 0;
  }
}

.team-class:hover {
  transform: translateY(-0.3rem);
  box-shadow: 6px 6px 6px 4px rgba(0, 0, 0, 0.2);
}

.remove-team {
  position: absolute;
  top: 0;
  right: 0;
  padding: 1.2rem 1.2rem;
  color: lightgray;
  font-size: 1rem;
  font-weight: bold;
}

.remove-team:hover {
  color: lightgray;
  font-size: 1.2rem;
}

.team-label {
  margin: auto;
}

.team-input {
  width: 94%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border: transparent;
}

@media screen and (min-width: 36em) {
  .team-input {
    font-size: 1.4rem;
  }
}

.team-button {
  margin-top: 1rem;
  padding: 0.8rem 1rem;
  margin: auto;
  width: 70%;
  cursor: pointer;
}

.team-button:hover {
  background-color: #ef476f;
  color: white;
  opacity: 0.8;
}
</style>