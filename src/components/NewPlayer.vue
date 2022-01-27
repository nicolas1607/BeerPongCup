<template>
  <div class="player animate__animated animate__headShake">
    <input
      class="team-input1 team-input"
      name="player-name"
      placeholder="Nom du joueur"
      maxlength="16"
    />
    <span class="bottom"></span>
    <span class="right"></span>
    <span class="top"></span>
    <span class="left"></span>
    <p class="remove-player" @click="removePlayer()">
      <font-awesome-icon :icon="['fa', 'times']" class="font-awesome-icon" />
    </p>
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
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 0.6rem;
  font-size: 0.8rem;
  opacity: 0.4;
  color: black;
}

.team-input {
  border: 1px solid transparent;
  transition: background-color 0.3s ease-in-out;
}

.team-input:focus {
  outline: none;
}

span {
  position: absolute;
  background-color: var(--primary-color);
  transition: transform 0.1s ease;
}

.bottom,
.top {
  height: 2px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.left,
.right {
  width: 2px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.bottom {
  bottom: 0;
  transform-origin: bottom right;
}

.team-input:focus ~ .bottom {
  transform-origin: bottom left;
  transform: scaleX(1);
}

.right {
  right: 0;
  transform-origin: top right;
  transition-delay: 0.05s;
}

.team-input:focus ~ .right {
  transform-origin: bottom right;
  transform: scaleY(1);
}

.top {
  top: 0;
  transform-origin: top left;
  transition-delay: 0.15s;
}

.team-input:focus ~ .top {
  transform-origin: top right;
  transform: scaleX(1);
}

.left {
  left: 0;
  transform-origin: bottom left;
  transition-delay: 0.25s;
}

.team-input:focus ~ .left {
  transform-origin: top left;
  transform: scaleY(1);
}
</style>