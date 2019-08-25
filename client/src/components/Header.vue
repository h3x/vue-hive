<template>
<div>
  <div class="navbar-brand">
    <div class="nav" v-bind:class="{change: menuToggle}" @click="showMenu">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    <div id="chat" class="navbar-end" v-bind:class="{ hidden: $route.path!=='/game/'+this.$route.params.id}">
      <Chat2 />
    </div>
  </div>

  <div class="modal modal-mask modal-container" v-bind:class="{hidden: !menuToggle}">
  <div class="modal-card">
    <header class="modal-card-head">
      <router-link to="/"><h1 class="modal-card-title" @click=closeAllMenus>Hive</h1></router-link>
    </header>
    <section class="modal-card-body">
      <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li @click=closeAllMenus><router-link to="/login" >Login</router-link></li>
        </ul>
        <p class="menu-label">Game</p>
        <ul class="menu-list">
            <li><a>Current Games</a></li>
            <li><a @click=newGameMenu>New Game</a></li>
            <li><a @click=joinMenu>Join Game</a></li>
            <li><a >Replays</a></li>
        </ul>
      </aside>
    </section>
    
    <footer class="modal-card-foot">
      <button class="button is-danger  is-outlined menuButton" @click="showMenu">X</button>
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
            <li @click=closeAllMenus><router-link to="/game">Single Player</router-link></li>
            <li><a>Pass and Play</a></li>
            <li><a>Online</a></li>
        </ul>
      </aside>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger is-outlined menuButton" @click="newGameMenu"><</button>
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
      <button class="button is-danger  is-outlined menuButton" @click="joinMenu"><</button>
    </footer>
  </div>
</div> 
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
import Chat2 from '@/components/Chat2.vue';
 
@Component({components: {
    Menu,
    Chat2
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

    closeAllMenus(){
      this.newGameToggle = false;
      this.joinGameToggle = false;
      this.menuToggle = false;
    }
}
</script>


<style scoped>
#chat{
  margin-right: 15px;
  margin-top:auto;
  margin-bottom:auto;
}
#chat:hover {
  color: black;
}

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
    padding-top:20px;
    position: fixed;
    left:15px;
    z-index: 9998;
    width: 10%;
    background-color: rgba(31, 40, 51, .9);
    border: 1px solid #45a29e;
}

.modal-card-foot{
  margin-top:20px;
  position: relative;
}

.hidden{
    display: none;
}

.modal-card-title{
    font-size: 2em;
    color: #66fcf1;
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



.modal-card-body{
  display:block;
}





</style>
