<template>
  <section>
    <div class="skewed">
      <nav class="nav">
        <div class="nav-title">
          <font-awesome-icon
            v-if="title != 'Paramètres'"
            :icon="['fa', 'bars']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="visibleMenu()"
          />
          <font-awesome-icon
            v-else-if="title == 'Paramètres'"
            :icon="['fa', 'chevron-left']"
            style="margin-left: 0; margin-right: 1rem"
            class="font-awesome-icon"
            @click="preview()"
          />
          <h1>{{ title }}</h1>
        </div>
        <div v-if="linkText" class="nav-list">
          <router-link :to="href">{{ linkText }}</router-link>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    linkText: String,
    href: String,
  },
  methods: {
    visibleMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeInLeft";
      menu.style.display = "block";
    },
    preview() {
      history.back();
    },
  },
};
</script>

<style>
.skewed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: 100%;
  height: 3em;
  background-color: var(--primary-color);
  z-index: 100;
  transform: skewY(-1deg);
  transform-origin: top left;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 2rem 1.5rem 0 1.5rem;
  z-index: 1000;
  transform: skewY(1deg);
}

.nav h1 {
  font-size: 1.4rem;
}

.nav-title {
  display: flex;
  align-items: center;
}

.nav-list {
  font-size: 1.2rem;
}

/* MENU */
#menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 5rem;
  bottom: 0;
  background-color: var(--primary-color);
  z-index: 100;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem;
  color: white;
  border-right: solid 1px rgba(0, 0, 0, 0.1);
  box-shadow: 8px 8px 8px 10px rgba(0, 0, 0, 0.1);
  display: none;
}

.nav-title {
  display: flex;
}

.nav-title img {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 30%;
}

.menu-list {
  margin-top: 4rem;
}

.menu-item {
  padding: 0.5rem 1rem;
}

.menu-item:hover {
  background-color: white;
}

.menu-item:hover .menu-link {
  color: var(--primary-color);
}

.menu-link {
  font-size: 1rem;
}
</style>
