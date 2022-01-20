<template>
  <nav class="nav">
    <div class="nav-logo">
      <img class="nav-img" :src="require(`../assets/logo.png`)" />
    </div>
    <div v-if="linkText" class="nav-list">
      <router-link :to="href">{{ linkText }}</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {
    linkText: String,
    href: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 2rem 4rem 0 4rem;
}

.nav-img {
  width: 10rem;
}

.nav-list {
  font-size: 1.4rem;
}
</style>
