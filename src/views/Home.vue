<template>
  <div>
    <Header />

    <div id="hero" class="container">
      <h1 class="hero-title">
        N'attendez plus pour dévoiler vos talents,<br />
        <span class="hero-subtitle">défiez vos amis dès maintenant !</span>
      </h1>
      <div id="hero-btn-div">
        <span>
          <router-link id="hero-btn" class="magictime swashIn" to="/choices"
            >Nouvelle partie</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
  },
};
</script>

<style scoped>
@import url("../../node_modules/magic.css/dist/magic.min.css");
.magictime {
  -webkit-animation-duration: 3s;
  animation-duration: 3s;
}

.hero-title {
  margin-top: 8rem;
}

.hero-subtitle {
  position: relative;
  z-index: 1;
}

.hero-subtitle::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: -0.25em;
  right: -0.25em;
  background-color: white;
  transform-origin: center right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.hero-subtitle:hover {
  color: #ef476f;
}

.hero-subtitle:hover::before {
  transform: scaleX(1);
  transform-origin: center left;
}

#hero-btn-div {
  display: flex;
  justify-content: center;
}

#hero-btn {
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  background-color: white;
  color: #ef476f;
  opacity: 0.1;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.1);
}

#hero-btn:hover {
  box-shadow: 6px 6px 6px 4px rgba(0, 0, 0, 0.2);
  opacity: 1;
}
</style>