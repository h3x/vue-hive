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
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <h1 class="modal-card-title">Hive</h1>
    </header>
    <section class="modal-card-body">
      <aside class="menu">
        <p class="menu-label">
            General
        </p>
        <ul class="menu-list">
            <li><a>Dashboard</a></li>
            <li><a>Logout</a></li>
        </ul>
        <p class="menu-label">
            Game
        </p>
        <ul class="menu-list">
            <li><a>Current Games</a></li>
            <li>
            <a class="is-active">New Game</a>
            <ul class="new-game-menu">
                <li><a>>Single Player</a></li>
                <li><a>>Pass and Play</a></li>
                <li><a>>Online</a></li>
            </ul>
            </li>
            <li><a>Join Game</a>
                <ul class="join-game-menu">
                <li><a>>Game Code</a></li>
                
            </ul>
            </li>
            
        </ul>
        
        </aside>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger  is-outlined" @click="showMenu">X</button>
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
    showMenu(){
        this.menuToggle =! this.menuToggle
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
</style>
