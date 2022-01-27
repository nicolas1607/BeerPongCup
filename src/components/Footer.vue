<template>
  <div class="footer-menu">
    <router-link class="footer-active" to="/">
      <font-awesome-icon :icon="['fa', 'home']" class="font-awesome-icon" />
    </router-link>
    <a>
      <font-awesome-icon :icon="['fa', 'trophy']" class="font-awesome-icon" />
    </a>
    <router-link to="/settings">
      <font-awesome-icon :icon="['fa', 'cogs']" class="font-awesome-icon" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Footer",
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
  padding: 1rem 2.5rem;
}

.footer-menu a:hover {
  transform: scale(1.2);
}
</style>
