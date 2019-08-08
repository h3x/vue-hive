<template>
<div>
  <div class="navbar-brand">
    <div class="nav" v-bind:class="{change: menuToggle}" @click="showMenu">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>
  </div>

  <div class="modal modal-mask modal-container" v-bind:class="{hidden: !menuToggle}">
  <div class="modal-card">
    <header class="modal-card-head">
      <router-link to="/"><h1 class="modal-card-title">Hive</h1></router-link>
    </header>
    <section class="modal-card-body">
      <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><router-link to="/login">Login</router-link></li>
        </ul>
        <p class="menu-label">Game</p>
        <ul class="menu-list">
            <li><a>Current Games</a></li>
            <li><a class="is-active" @click=newGameMenu>New Game</a></li>
            <li><a class="is-active" @click=joinMenu>Join Game</a></li>
            <li><a class="is-active">Replays</a></li>
        </ul>
      </aside>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger  is-outlined" @click="showMenu">X</button>
    </footer>
  </div>
</div>  

<div class="modal modal-mask modal-container" v-bind:class="{hidden: !newGameToggle}">
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="menu-label">New Game</p>
    </header>
    <section class="modal-card-body">
      <aside class="menu">
        <ul class="menu-list">
            <li><a>Single Player</a></li>
            <li><a>Pass and Play</a></li>
            <li><a>Online</a></li>
        </ul>
      </aside>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger  is-outlined" @click="newGameMenu"><</button>
    </footer>
  </div>
</div> 


<div class="modal modal-mask modal-container" v-bind:class="{hidden: !joinGameToggle}">
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="menu-label">Join Game</p>
    </header>
    <section class="modal-card-body">
      <aside class="menu">
        <ul class="menu-list">
            <li><a>Enter Game Code</a></li>
            <li><a>Friends List</a></li>
        </ul>
      </aside>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger  is-outlined" @click="joinMenu"><</button>
    </footer>
  </div>
</div> 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
 
@Component({components: {
    Menu,
  }})
export default class extends Vue {

    menuToggle:boolean = false;
    newGameToggle:boolean = false;
    joinGameToggle:boolean = false;

    showMenu(){
        this.menuToggle =! this.menuToggle;
        this.newGameToggle = false;
        this.joinGameToggle = false;
    }
 
    joinMenu(){
        this.joinGameToggle = !this.joinGameToggle;
        if(this.joinGameToggle) {
            this.menuToggle = false;
            this.newGameToggle = false;
        } else{
            this.menuToggle = true;
        }
    }

    newGameMenu(){
        this.newGameToggle = !this.newGameToggle;
        if(this.newGameToggle) {
            this.menuToggle = false;
            this.joinGameToggle = false;
        }else{
            this.menuToggle = true;
        }
    }
}
</script>


<style>

.navbar-brand{
    background: #0b0c10;
}
.nav {
    margin-left: 15px;
    margin-top: 15px;
    display: inline-block;
    cursor: pointer;
}

.bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: #66fcf1;
    margin: 6px 0;
    transition: 0.4s;
}

.change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
}

.change .bar2 {opacity: 0;}

.change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
}

.modal{
    margin: auto;
    padding-bottom: 20px;
    padding-top:20px;
    position: fixed;
    left:15px;
    z-index: 9998;
    width: 20%;
    background-color: rgba(31, 40, 51, .5);
    border: 1px solid #45a29e;
}
.hidden{
    display: none;
}

.modal-card-title{
    font-size: 2em;
    color: #66fcf1;
}

.modal-card-foot > button {
    margin-top: 20px;
}


.menu-label{
    color:orange;
    margin-top: 5px;
}

.new-game-menu, .join-game-menu{
    text-align: left;
    margin-left: 50%;
}

.is-active {
    color: #66fcf1;
}

.new-game-model {
    margin: auto;
    padding-bottom: 20px;
    padding-top:20px;
    position: fixed;
    left:50px;
    z-index: 9998;
    width: 20%;
    background-color: rgba(31, 40, 51, .5);
    border: 1px solid #45a29e;
}


</style>
