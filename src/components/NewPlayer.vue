<template>
  <div class="player">
    <input
      class="team-input1"
      name="player-name"
      placeholder="Nom du joueur"
      maxlength="24"
    />
    <p class="remove-player" @click="removePlayer()">X</p>
  </div>
</template>

<script>
export default {
  name: "NewPlayer",
  methods: {
    removePlayer() {
      this.$el.remove();
    },
  },
};
</script>

<style scoped>
.player {
  position: relative;
}

.player:hover .remove-player {
  visibility: visible;
}

.remove-player {
  visibility: hidden;
  cursor: pointer;
  position: absolute;
  top: 0rem;
  right: 0.6rem;
  font-size: 0.8rem;
}
</style>