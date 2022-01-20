<template>
  <div>
    <Header />

    <div class="container">
      <div id="div-title">
        <h1 class="score-title">Lancer les séries d'éliminations</h1>
        <font-awesome-icon
          :icon="['fa', 'chevron-right']"
          class="font-awesome-icon"
        />
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
                <td v-if="team.value[1]">
                  <span v-for="player in team.value[1]" :key="player">
                    {{ player }} /
                  </span>
                </td>
                <td v-else></td>
                <td id="score-sortable">
                  {{ team.value[2] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    Header,
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