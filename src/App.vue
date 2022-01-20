<template>
  <div class="background">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


<style>
main {
  position: relative;
  min-height: 40vw;
}

hr {
  width: 80%;
  margin: auto;
}

a {
  cursor: pointer;
  color: white;
  text-decoration: none;
}

a:hover {
  color: white;
}

li {
  list-style-type: none;
}

table {
  border-radius: 10rem;
}

button {
  border-radius: 0.2rem;
  color: #bbb4b5;
  z-index: 1;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  box-shadow: 3px 3px 3px 1px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  opacity: 0.8;
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
  margin-left: 1rem;
  margin-top: 0.1rem;
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

@keyframes bounce {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
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

/* Remove Arrow Input type Number */
/* input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
    -moz-appearance: textfield;
  } */

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
  background-color: #ef476f;
  /* background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='28' height='28' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform='rotate(135)'%3E%3Crect width='100%25' height='100%25' fill='rgba(239, 71, 111, 1)'/%3E%3Cpath d='M0 9.5a 10.5 10.5 0 0 1 10.5 10.5a 9.5 9.5 0 0 0 9.5 9.5v1a-10.5-10.5 0 0 1-10.5-10.5a-9.5-9.5 0 0 0-9.5-9.5z' fill='rgba(255, 255, 255, 1)'/%3E%3Cpath d='M20 9.5a 9.5-9.5 0 0 0 9.5-9.5a 10.5-10.5 0 0 1 10.5-10.5v1a-9.5 9.5 0 0 0-9.5 9.5a-10.5 10.5 0 0 1-10.5 10.5zM20 49.5a 9.5-9.5 0 0 0 9.5-9.5a 10.5-10.5 0 0 1 10.5-10.5v1a-9.5 9.5 0 0 0-9.5 9.5a-10.5 10.5 0 0 1-10.5 10.5z' fill='rgba(255, 245, 245, 1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E "); */
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 100%;
  }
  100% {
    transform: translateY(-900px);
    opacity: 0.2;
    border-radius: 100%;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #ef476f;
  overflow: hidden;
}
.background li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 4s linear infinite;
}

.background li:nth-child(0) {
  left: 65%;
  width: 28px;
  height: 28px;
  bottom: -28px;
  animation-delay: 1s;
}
.background li:nth-child(1) {
  left: 26%;
  width: 29px;
  height: 29px;
  bottom: -80px;
  animation-delay: 6s;
}
.background li:nth-child(2) {
  left: 29%;
  width: 22px;
  height: 22px;
  bottom: -66px;
  animation-delay: 5s;
}
.background li:nth-child(3) {
  left: 25%;
  width: 37px;
  height: 37px;
  bottom: -79px;
  animation-delay: 92s;
}
.background li:nth-child(4) {
  left: 68%;
  width: 25px;
  height: 25px;
  bottom: -25px;
  animation-delay: 180s;
}
.background li:nth-child(5) {
  left: 66%;
  width: 28px;
  height: 28px;
  bottom: -28px;
  animation-delay: 33s;
}
.background li:nth-child(6) {
  left: 54%;
  width: 24px;
  height: 24px;
  bottom: -66px;
  animation-delay: 66s;
}
.background li:nth-child(7) {
  left: 78%;
  width: 26px;
  height: 26px;
  bottom: -104px;
  animation-delay: 99s;
}
.background li:nth-child(8) {
  left: 85%;
  width: 37px;
  height: 37px;
  bottom: -88px;
  animation-delay: 11s;
}
.background li:nth-child(9) {
  left: 93%;
  width: 39px;
  height: 39px;
  bottom: -102px;
  animation-delay: 22s;
}
.background li:nth-child(10) {
  left: 30%;
  width: 31px;
  height: 31px;
  bottom: -46px;
  animation-delay: 32s;
}
.background li:nth-child(11) {
  left: 47%;
  width: 40px;
  height: 40px;
  bottom: -67px;
  animation-delay: 46s;
}
.background li:nth-child(12) {
  left: 52%;
  width: 20px;
  height: 20px;
  bottom: -80px;
  animation-delay: 75s;
}
.background li:nth-child(13) {
  left: 78%;
  width: 39px;
  height: 39px;
  bottom: -56px;
  animation-delay: 12s;
}
.background li:nth-child(14) {
  left: 35%;
  width: 39px;
  height: 39px;
  bottom: -90px;
  animation-delay: 45s;
}
.background li:nth-child(15) {
  left: 16%;
  width: 30px;
  height: 30px;
  bottom: -30px;
  animation-delay: 17s;
}
.background li:nth-child(16) {
  left: 89%;
  width: 35px;
  height: 35px;
  bottom: -35px;
  animation-delay: 55s;
}
.background li:nth-child(17) {
  left: 85%;
  width: 26px;
  height: 26px;
  bottom: -26px;
  animation-delay: 34s;
}
.background li:nth-child(18) {
  left: 92%;
  width: 37px;
  height: 37px;
  bottom: -37px;
  animation-delay: 80s;
}
.background li:nth-child(19) {
  left: 5%;
  width: 31px;
  height: 31px;
  bottom: -115px;
  animation-delay: 72s;
}
.background li:nth-child(21) {
  left: 21%;
  width: 33px;
  height: 33px;
  bottom: -72px;
  animation-delay: 96s;
}
.background li:nth-child(22) {
  left: 31%;
  width: 32px;
  height: 32px;
  bottom: -30px;
  animation-delay: 80s;
}
.background li:nth-child(23) {
  left: 75%;
  width: 25px;
  height: 25px;
  bottom: -220px;
  animation-delay: 88s;
}
.background li:nth-child(24) {
  left: 89%;
  width: 27px;
  height: 27px;
  bottom: -27px;
  animation-delay: 66s;
}
.background li:nth-child(25) {
  left: 4%;
  width: 28px;
  height: 28px;
  bottom: -28px;
  animation-delay: 57s;
}
.background li:nth-child(26) {
  left: 67%;
  width: 22px;
  height: 22px;
  bottom: -22px;
  animation-delay: 78s;
}
.background li:nth-child(27) {
  left: 57%;
  width: 21px;
  height: 21px;
  bottom: -21px;
  animation-delay: 53s;
}
.background li:nth-child(28) {
  left: 53%;
  width: 41px;
  height: 41px;
  bottom: -41px;
  animation-delay: 9s;
}
.background li:nth-child(30) {
  left: 32%;
  width: 40px;
  height: 40px;
  bottom: -40px;
  animation-delay: 13s;
}
.background li:nth-child(31) {
  left: 86%;
  width: 20px;
  height: 20px;
  bottom: -20px;
  animation-delay: 89s;
}
.background li:nth-child(32) {
  left: 50%;
  width: 19px;
  height: 19px;
  bottom: -19px;
  animation-delay: 122s;
}
.background li:nth-child(33) {
  left: 79%;
  width: 22px;
  height: 22px;
  bottom: -22px;
  animation-delay: 2s;
}
.background li:nth-child(34) {
  left: 81%;
  width: 37px;
  height: 37px;
  bottom: -37px;
  animation-delay: 59s;
}
.background li:nth-child(35) {
  left: 79%;
  width: 29px;
  height: 29px;
  bottom: -29px;
  animation-delay: 104s;
}
.background li:nth-child(38) {
  left: 56%;
  width: 29px;
  height: 29px;
  bottom: -29px;
  animation-delay: 76s;
}
.background li:nth-child(39) {
  left: 27%;
  width: 18px;
  height: 18px;
  bottom: -109px;
  animation-delay: 42s;
}
.background li:nth-child(40) {
  left: 7%;
  width: 19px;
  height: 19px;
  bottom: -27px;
  animation-delay: 119s;
}
.background li:nth-child(41) {
  left: 72%;
  width: 18px;
  height: 18px;
  bottom: -45px;
  animation-delay: 109s;
}
.background li:nth-child(43) {
  left: 8%;
  width: 40px;
  height: 40px;
  bottom: -88px;
  animation-delay: 89s;
}
.background li:nth-child(44) {
  left: 54%;
  width: 37px;
  height: 37px;
  bottom: -67px;
  animation-delay: 3s;
}
.background li:nth-child(45) {
  left: 30%;
  width: 42px;
  height: 42px;
  bottom: -42px;
  animation-delay: 180s;
}
.background li:nth-child(46) {
  left: 23%;
  width: 26px;
  height: 26px;
  bottom: -26px;
  animation-delay: 85s;
}
.background li:nth-child(47) {
  left: 81%;
  width: 36px;
  height: 36px;
  bottom: -36px;
  animation-delay: 120s;
}

h1 {
  font-weight: 900;
  font-size: 2rem;
  line-height: 6.4rem;
  color: white;
  text-align: center;
  margin-top: 0;
  margin-bottom: 4rem;
}

h2 {
  font-weight: 800;
  font-size: 1.8rem;
  color: white;
  text-align: center;
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
td,
th {
  padding: 0.8rem 1rem;
  text-align: center;
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

#table-team {
  display: flex;
  flex-direction: column-reverse;
}

#table-team,
#table-qualif {
  font-size: 1rem;
}

@media screen and (min-width: 36em) {
  #table-team {
    display: grid;
    grid-template-columns: 60% 50%;
    margin-bottom: 14rem;
  }
}

.table {
  border-radius: 0.5rem;
  background-color: white;
}
</style>