<template>
  <div class="checkboxes">
    <div class="checkbox">
      <input type="checkbox" name="return" checked />
      <label for="return">Match aller-retour</label>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="return" checked />
      <label for="return">Série d'élimination</label>
    </div>
    <div class="checkbox">
      <input type="checkbox" name="return" />
      <label for="return">Republique demo</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamTournament",
};
</script>

<style scoped>
input[type="checkbox"] {
  width: 2rem;
}

.checkboxes {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  box-shadow: 3px 3px 3px 1px grey;
  width: 70%;
  color: #842029;
  border-radius: 1rem;
  padding: 0.5rem 1rem 0.8rem 1rem;
}

.checkboxes label {
  font-size: 1rem;
}
</style>