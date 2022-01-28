<template>
  <!-- ALERT DANGER -->
  <AlertModal title="Êtes vous sûr de vouloir quitter la partie en cours ?" />

  <div class="footer-menu">
    <a class="footer-trophy">
      <font-awesome-icon :icon="['fa', 'trophy']" class="font-awesome-icon" />
    </a>
    <a class="footer footer-home" @click="openModalAlert()">
      <font-awesome-icon :icon="['fa', 'home']" class="font-awesome-icon" />
    </a>
    <router-link class="footer-setting" to="/settings">
      <font-awesome-icon :icon="['fa', 'cogs']" class="font-awesome-icon" />
    </router-link>
  </div>
</template>

<script>
import AlertModal from "@/components/AlertModal.vue";

export default {
  name: "Footer",
  components: {
    AlertModal,
  },
  methods: {
    openModalAlert() {
      const modal = document.querySelector("#modal-danger");
      modal.hidden = false;
    },
  },
};
</script>

<style scoped>
.footer-menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: fixed;
  max-width: 100vw;
  overflow: hidden;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: var(--primary-color);
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}

.footer-menu a {
  margin: auto;
  padding: 1rem 1rem;
}

.footer-menu a:hover {
  transform: scale(1.2);
}

.footer-home {
  transform: scale(1.2);
}

.footer-settings {
  transform: scale(1.2);
}
</style>
