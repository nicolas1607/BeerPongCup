<template>
  <div>
    <Header title="Qualification" />

    <div id="menu">
      <div class="nav-title">
        <font-awesome-icon
          :icon="['fa', 'bars']"
          style="margin-left: 0; margin-right: 1rem"
          class="font-awesome-icon"
          @click="this.hiddenMenu()"
        />
        <img class="nav-img" :src="require(`../assets/logo.png`)" />
      </div>
      <ul class="menu-list">
        <li class="menu-item">
          <router-link to="/" class="menu-link">Nouvelle partie</router-link>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Tableau des scores</a>
        </li>
        <li class="menu-item">
          <a href="" class="menu-link">Changer les équipes</a>
        </li>
      </ul>
    </div>

    <div class="container">
      <div id="div-title">
        <h1 class="score-title">Tableau des scores</h1>
      </div>
      <div id="table-qualif">
        <div class="div-table">
          <table class="table table-striped table-hover sortable">
            <thead>
              <tr>
                <th>#</th>
                <th>Équipe</th>
                <th>Joueurs</th>
                <th id="score-sortable">Score</th>
              </tr>
            </thead>
            <tbody v-for="team in teams" :key="team">
              <tr id="1" class="tr-elem">
                <td>{{ team.name }}</td>
                <td>{{ team.value[0] }}</td>
                <td v-if="team.value[1].length != 0">
                  <span v-for="player in team.value[1]" :key="player">
                    {{ player }} /
                  </span>
                </td>
                <td v-else>/</td>
                <td v-if="team.value[2]" id="score-sortable">
                  {{ team.value[2] }}
                </td>
                <td v-else id="score-sortable">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      teams: {},
    };
  },
  mounted() {
    if (localStorage.getItem("teams")) {
      this.teams = JSON.parse(localStorage.getItem("teams"));
    }

    // JS_SORTABLE
    let sortableScript = document.createElement("link");
    sortableScript.setAttribute(
      "src",
      "https://www.kryogenix.org/code/browser/sorttable/sorttable.js"
    );
    document.head.appendChild(sortableScript);

    this.sortedData();
  },
  methods: {
    sortedData() {
      this.teams.sort(function (a, b) {
        return a["value"][2] > b["value"][2] ? -1 : 1;
      });
    },
    hiddenMenu() {
      const menu = document.querySelector("#menu");
      menu.className = "animate__animated animate__fadeOutLeft";
      menu.style.display = "none";
      menu.style.display = "block";
    },
  },
};
</script>

<style>
.table {
  width: 100%;
}

#div-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8rem;
  margin-bottom: 4rem;
}

#div-title h1 {
  margin-bottom: 0;
}

#div-title svg {
  margin-left: 2rem;
  margin-top: 0.5rem;
  color: white;
}

#go-qualification {
  cursor: pointer;
  width: 3rem;
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 4rem;
}

table.sortable thead {
  background-color: #eee;
  color: #666666;
  font-weight: bold;
  cursor: pointer;
}
</style>