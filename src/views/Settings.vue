<template>
  <div>
    <Header title="Paramètres" />

    <div class="container">
      <div class="settings animate__animated animate__fadeInLeft">
        <h2>Options avancées</h2>
        <div class="form-check form-switch setting">
          <label class="form-check-label" for="dark-mode"
            >Choisir la langue</label
          >
          <select class="langage">
            <option value="french" selected>Français</option>
            <option value="english">English</option>
          </select>
        </div>
        <div class="form-check form-switch setting">
          <label class="form-check-label" for="dark-mode"
            >Activer le mode nuit</label
          >
          <input
            v-if="this.darkMode == true"
            id="dark-mode"
            class="form-check-input"
            type="checkbox"
            checked
          />
          <input
            v-else
            id="dark-mode"
            class="form-check-input"
            type="checkbox"
          />
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Settings",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      langage: "french",
    };
  },
  mounted() {
    const darkMode = document.querySelector("#dark-mode");
    if (localStorage.darkMode == "true") darkMode.checked = "checked";
    darkMode.addEventListener("change", () => {
      if (localStorage.darkMode == true) darkMode.checked = true;
      if (darkMode.checked) {
        document.documentElement.style.setProperty(
          "--primary-color",
          "#2c3e50"
        );
        this.$store.commit("setDarkMode", true);
      } else {
        document.documentElement.style.setProperty(
          "--primary-color",
          "#ef476f"
        );
        this.$store.commit("setDarkMode", false);
      }
      localStorage.darkMode = this.$store.getters.getDarkMode;
    });
  },
};
</script>

<style scoped>
.settings {
  margin-top: 8rem;
}

.setting {
  font-size: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.form-switch {
  padding-left: 1rem !important;
}

.langage {
  width: 5.5rem;
  padding: 0;
  background-color: transparent;
  color: white;
  border: transparent;
}
</style>
