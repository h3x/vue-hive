<template>
    <div class='container'>
        <div class='msgContainer'>
            <div id="messages" >
                <span v-for="msg in messages">
                    <router-link :to="'/game/' + msg.game"><label class="otherMsg" v-if="msg.game">Go to Game</label></router-link>
                    <label class="msg">{{msg.message}}</label>
                    <label class="otherMsg" >{{msg.user}}:</label>
                    </span>
                
            </div>
        </div>
        <div>
        <form @submit.prevent="sendMessage" class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
                <textarea id='msgText' v-model="message" class="textarea has-fixed-size" rows='3' placeholder="Enter chat message"></textarea>   
            </div>
            <button type='submit' class="button is-primary is-outlined ">></button>
            <div class="column"></div>
        </form>
    </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {Getter, namespace} from 'vuex-class';
import { origin } from '../service';
import io from 'socket.io-client';

@Component
export default class extends Vue {

    @Getter('getLogin') private getLogin: any;
    private user: string = '';
    private loggedIn: boolean = false;
    private message: string = '';

    // this has to have the local socket defined for some reason
    private socket: any = io.connect(origin());
    // private socket: any = io('https://boiling-wildwood-41441.herokuapp.com');
    private room = 'lobby';
    private messages: Array<{room: string, message: string, sender: string, game: string}> = [];

    private sendMessage(e: any) {
        e.preventDefault();
        if ( this.message === '/clear') {
            this.messages = [];
        } else {
            this.socket.emit('sendmsg', {
                user: this.getLogin.isLoggedin ? this.getLogin.username : 'Anon',
                message: this.message,
                room: 'lobby',
            });
        }

        this.message = '';
    }

    private mounted() {
        this.user = this.getLogin.username;
        this.socket.on('connect', () => {
            // Connected, let's sign-up for to receive messages for the lobby
            this.socket.emit('subscribe', this.room);
        });

        this.socket.on('msg', (data: any) => {
            this.messages.unshift(data);
        });

        this.socket.on('inv', (data: {room: any, message: string, sender: string, game: string}) => {
            if (data.room === this.getLogin.username || data.room.name === this.getLogin.username || data.sender === this.getLogin.username) {
                this.$socket.client.emit('subscribe', data.game );
                this.messages.unshift(data);
            }
        });
    }
}
</script>

<style scoped>
.container{
    padding: 10px;
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
.msgContainer{
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
.msg {
    text-align: left;
    margin-right:20px;
    display: block;
    color:#66fcf1;
    margin-top: 5px;
    
    transform: rotate(180deg);
    
}

.otherMsg {
    text-align: left;
    margin-right:4px;
    display: block;
    color:orange;
    margin-top: 5px;
    
    transform: rotate(180deg);
}
</style>
