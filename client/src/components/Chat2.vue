<template>
<div>
    <div>
        <a class="nav button is-primary is-outlined" id='chat' @click='showChat' >Chat</a>
    </div>

  <div id="chatWindow" class="modal modal-mask modal-container" v-bind:class="{hidden: !chatToggle}">
  <div class="modal-card">
    
    <section class="modal-card-body">
      <label class="msg">Hi how are you?</label>
      <label class="otherMsg">Hi how are you?</label>
      
      <label class="msg">Thats great to hear. are we going to play a game or are you busy?</label>
      <label class="otherMsg">Yeah sure i can play a game if your free. remember i won last time hehe</label>
    </section>
    <footer class="modal-card-foot">
        <textarea id='msgText' class="textarea has-fixed-size" rows='3' placeholder="Enter chat message"></textarea>
        <button class="button is-primary is-outlined">></button>
      <button class="button is-danger  is-outlined" @click="showChat">X</button>
    </footer>
  </div>
</div>  

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
 
@Component
export default class extends Vue {

    chatToggle:boolean = false;

    showChat(){
        this.chatToggle = !this.chatToggle;
        console.log(this.chatToggle)
    } 
    
    closeChat(){
        this.chatToggle = false;
    }
}
</script>


<style>


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

.is-active {
    color: #66fcf1;
}

#chatWindow {
    padding-bottom: 20px;
    padding-top:20px;
    position: fixed;
    right:15px;
    z-index: 9998;
    width: 20%;
    height: 80%;
    border: 1px solid #45a29e;
    background:rgba(31, 40, 51, .95);
}

footer {
    position: absolute;
    bottom: 15px;
    width:95%;
    margin-left:2%;
}

footer > button {

    margin:auto;
    margin-left: 10px;
}

#msgText {
    margin: auto;
    background:#0b0c10;
    color: #45a29e;
    border: 1px solid #66fcf1;
}

.msg {
    margin-right: 4px;
    margin-left: 20px;
    text-align: right;
    display: block;
    color:#66fcf1;
    margin-top: 5px;
}

.otherMsg {
    text-align: left;
    margin-left: 4px;
    margin-right: 20px;
    display: block;
    color:orange;
    margin-top: 5px;
}
</style>
