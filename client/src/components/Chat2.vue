<template>
<div>
    <div>
        <a class="nav button is-primary is-outlined" id='chat' @click='showChat' >Chat</a>
    </div>

  <div id="chatWindow" class="modal modal-mask modal-container" v-bind:class="{hidden: !chatToggle}">
  <div class="modal-card">
    
    <section class="modal-card-body">
         <div class='msgContainer'>
            <div id="messages" >
                <span v-for="msg in messages"><label class="msg">{{msg.message}}</label><label class="otherMsg" >{{msg.user}}:</label></span>
            </div>
        </div>
     </section>
    <footer class="modal-card-foot">
        <form @submit.prevent="sendMessage">
            <textarea id='msgText' v-model="message" class="textarea has-fixed-size" rows='3' placeholder="Enter chat message"></textarea>
            <button type='submit' class="button is-primary is-outlined">></button>
            <button class="button is-danger  is-outlined" @click="showChat">X</button>
   
        </form>
      </footer>
  </div>
</div>  

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu.vue';
import io from 'socket.io-client';
import {Getter, namespace} from 'vuex-class';

import { Socket } from 'vue-socket.io-extended';

@Component
export default class extends Vue {

    @Getter('getLogin') private getLogin: any;
    private user: string = '';
    private message: string = '';

    // this has to have the local socket defined for some reason TODO: find out why when not on a deadline
    private socket: any = io('localhost:3001');
    private messages: Array<{user: string, message: string, room: string}> = [];
    private chatToggle: boolean = false;
    private room = '';

    @Socket('msg')
    private onMsg(data: {user: string, message: string, room: string}) {
        this.messages.unshift(data);
    }

    private sendMessage(e: Event) {
        e.preventDefault();
        this.socket.emit('sendmsg', {
            user: this.getLogin.isLoggedin ? this.getLogin.username : 'Anon',
            message: this.message,
            room: this.$router.currentRoute.params.id,
        });
        this.message = '';
    }

    private showChat() {
        this.chatToggle = !this.chatToggle;
    }

    private closeChat() {
        this.chatToggle = false;
    }
}
</script>


<style scoped>


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
    bottom: 0px;
    width:100%;
   
}

form > button {

    margin:auto;
    margin-left: 10px;
    margin-top: 10px;
}


#msgText {
    margin: auto;
    margin-top:10px;
    background:#0b0c10;
    color: #45a29e;
    border: 1px solid #66fcf1;
}

.msg {
    margin-right: 20px;
    margin-left: 20px;
    text-align: left;
    display: block;
    color:#66fcf1;
    margin-top: 5px;
    transform: rotate(180deg);
}

.otherMsg {
    text-align: left;
    margin-left: 4px;
    margin-right: 4px;
    display: block;
    color:orange;
    margin-top: 5px;
    transform: rotate(180deg);
}

.msgContainer{
    position: absolute;
    top: 0;
    height: 60%;
    width:100%;
    transform: rotate(180deg);

    
    
    
}

#messages {
    display: block;
    height: 60vh;
    overflow-y: auto;
    overflow-x: 0;
    margin-bottom: 10px;
    padding:1px;
    flex-grow: 1;
    word-wrap: break-word;
    scrollbar-color:  #1f2833 rgba(0,0,0,0);
    
}

</style>
