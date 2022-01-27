<template>
  <div class="content">
    <div class="background">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (localStorage.darkMode == "true") {
      document.documentElement.style.setProperty("--primary-color", "#2c3e50");
    } else {
      document.documentElement.style.setProperty("--primary-color", "#ef476f");
    }
  },
};
</script>


<style>
:root {
  --primary-color: #ef476f;
  --secondary-color: #f8f7f7;
}

/* Transition Router */
.fade-enter-from,
.fade-leave-to {
  opacity: 0.4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

/* Générique */
html {
  max-height: 100vh;
}

main {
  position: relative;
  min-height: 40vw;
}

hr {
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
}

p {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

a {
  cursor: pointer;
  color: white;
  text-decoration: none;
}

a:hover {
  color: white;
}

ul {
  padding: 0 !important;
}

li {
  list-style-type: none;
}

button {
  font-size: 1rem;
  border-radius: 0.2rem;
  color: #bbb4b5;
  z-index: 1;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

button:hover {
  cursor: pointer;
  animation: jelly 0.5s;
  box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.2);
  opacity: 1;
}

button[disabled] {
  background-color: white;
  opacity: 0.4;
}

button:not[disabled]:hover {
  color: #3d3d3d;
  background-color: #ecd7d9;
  opacity: 1;
  transform: scale(1.1);
}

input,
select {
  width: 10rem;
  padding: 0.5rem;
  font-size: 1rem;
}

.font-awesome-icon {
  cursor: pointer;
}

/* Animation */
@keyframes blink {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}

/* Container */
.container {
  padding-left: 2rem;
  padding-right: 2rem;
}

@media screen and (min-width: 36em) {
  .container {
    padding-left: 12rem;
    padding-right: 12rem;
  }
}

/* Typographie */
body {
  font-family: Raleway, sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.5;
  color: black;
  background-color: var(--primary-color);
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 100%;
  }
  100% {
    transform: translateY(-1400px);
    opacity: 0.4;
    border-radius: 100%;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: var(--primary-color);
  overflow: hidden;
  z-index: -100;
}
.background li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 57px;
  background: hsla(0, 0%, 100%, 0.2);
  animation: animate 4s ease-in infinite;
}

.background li:nth-child(1) {
  left: 70%;
  width: 24px;
  height: 24px;
  bottom: -31px;
  animation-delay: 4s;
}
.background li:nth-child(2) {
  left: 47%;
  width: 40px;
  height: 40px;
  bottom: -52px;
  animation-delay: 3s;
}
.background li:nth-child(3) {
  left: 70%;
  width: 39px;
  height: 39px;
  bottom: -72px;
  animation-delay: 2s;
}
.background li:nth-child(4) {
  left: 35%;
  width: 39px;
  height: 39px;
  bottom: -121px;
  animation-delay: 12s;
}
.background li:nth-child(5) {
  left: 78%;
  width: 35px;
  height: 35px;
  bottom: -99px;
  animation-delay: 9s;
}
.background li:nth-child(6) {
  left: 42%;
  width: 26px;
  height: 26px;
  bottom: -26px;
  animation-delay: 5s;
}

h1 {
  font-weight: 900;
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

h2 {
  font-weight: 800;
  font-size: 1.4rem;
  color: white;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h3 {
  font-weight: bold;
  font-size: 1.6rem;
}

@media screen and (min-width: 36em) {
  h1 {
    font-size: 3rem;
    line-height: 6.4rem;
  }
  h2 {
    font-size: 2.8rem;
  }
  h3 {
    font-size: 2.6rem;
  }
}

/* Table */
table {
  border-collapse: unset;
}

table tr {
  display: grid;
  grid-template-columns: 2rem 3fr 3fr 4rem;
}

td,
th {
  text-align: center;
  font-size: 0.7rem;
  margin: auto;
  height: 100%;
  width: 100%;
}

th {
  padding: 0.8rem 0.8rem;
}

td {
  padding: 0.4rem 0.8rem;
}

tbody tr:hover {
  background-color: rgba(175, 175, 175, 0.1);
}

table.sortable thead {
  background-color: #eee;
  color: #666666;
  font-weight: bold;
  cursor: pointer;
}

thead th:hover {
  color: #000;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border-style: none;
}

#table-team {
  display: flex;
  flex-direction: column-reverse;
}

.table {
  border-radius: 0.3rem;
  background-color: white;
}

.table-players p {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}
</style>