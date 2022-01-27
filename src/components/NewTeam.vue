<template>
  <div class="team animate__animated animate__fadeInUp">
    <div :id="'team' + id" class="team-class">
      <a :id="'remove-team' + id" class="remove-team" @click="removeTeam()">
        <font-awesome-icon :icon="['fa', 'times']" class="font-awesome-icon" />
      </a>
      <div class="team-label team-name">
        <input
          :id="'team-input' + id"
          class="team-input"
          :aria-label="'Équipe n°' + id"
          name="team-name"
          :placeholder="'Équipe n°' + id"
          maxlength="24"
        />
        <font-awesome-icon
          :icon="['fa', 'pen']"
          class="font-awesome-icon team-name-edit"
        />
      </div>
      <section class="curved"></section>
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
  mounted() {
    this.players.push(NewPlayer);
  },
  methods: {
    addPlayer() {
      this.players.push(NewPlayer);
    },
    removeTeam() {
      this.$store.commit("removeNbTeam");
      this.$store.commit("reduceTeamId");
      this.$el.className = "animate__animated animate__fadeOutRight";
      this.$el.style.display = "none";
      this.$el.style.display = "block";
      setTimeout(() => {
        this.$el.remove();
      }, 800);
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
.curved {
  position: absolute;
  top: 0rem;
  left: 0;
  right: 0;
  background: var(--secondary-color);
  height: 4rem;
  border-radius: 0.5rem;
  border-bottom-left-radius: 50% 11%;
  border-bottom-right-radius: 50% 11%;
}

.team-name {
  position: relative;
  margin-bottom: 1rem !important;
}

.team-name-edit {
  position: absolute;
  transform: scale(0.4);
  top: 0.6rem;
  right: 2rem;
  color: black;
}

.team-class {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  padding-top: 0.5rem;
  border: transparent;
  background-color: white;
  box-shadow: 6px 6px 6px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  height: auto;
}

.team-class:hover {
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
  z-index: 2;
}

.remove-team:hover {
  color: lightgray;
  font-size: 1.2rem;
}

.team-label {
  margin: auto;
  z-index: 2;
}

.team-input {
  width: 80%;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border: transparent !important;
  background: var(--secondary-color);
  color: #333;
}

.team-input::placeholder {
  color: #333;
}

.team-button {
  margin-top: 1rem;
  padding: 0.8rem;
  font-size: 0.8rem;
  margin: auto;
  width: 70%;
  cursor: pointer;
  background-color: #333;
  color: white;
}
</style>