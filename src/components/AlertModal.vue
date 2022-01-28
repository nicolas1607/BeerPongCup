<template>
  <div
    id="modal-danger"
    class="overlap animate__fadeIn animate__delay-0.5s"
    hidden
  >
    <div
      id="modal"
      class="alert danger animate__animated animate__zoomIn animate__delay-0.5s"
    >
      <font-awesome-icon
        :icon="['fa', 'times']"
        id="close-modal"
        class="font-awesome-icon"
        @click="closeModalAlert()"
      />
      <div class="alert-title">
        <h2>{{ this.title }}</h2>
      </div>
      <div class="alert-btn">
        <router-link class="alert-submit" to="/">Confirmer </router-link>
        <button class="alert-cancel" @click="closeModalAlert()">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertModal",
  props: {
    title: String,
  },
  methods: {
    closeModalAlert() {
      const modal = document.querySelector("#modal-danger");
      modal.hidden = true;
    },
  },
};
</script>

<style scoped>
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
  background-color: var(--primary-color);
  position: absolute;
  top: 35%;
  bottom: 35%;
  left: 8%;
  width: 84%;
  padding: 0 2rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

#close-modal {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0;
  color: white;
  opacity: 0.4;
  font-size: 1.2rem;
}

#close-modal:hover {
  transform: scale(1.2);
  opacity: 1;
}

.alert-title h2 {
  margin-top: 4rem;
  font-size: 1.2rem !important;
}

.alert-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.alert-submit {
  font-size: 1rem;
  border-radius: 0.2rem;
  color: #bbb4b5;
  background-color: white;
  z-index: 1;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.alert-submit:hover {
  cursor: pointer;
  animation: jelly 0.5s;
  box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.2);
  opacity: 1;
}
</style>
