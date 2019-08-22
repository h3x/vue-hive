<template>
    <div class='container'>
       <div id="messages" >
          <span v-for="msg in messages" :key="msg"><label class="otherMsg" >{{msg.user}}:</label><label class="msg"> {{msg.message}}</label></span>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import {Getter, namespace} from 'vuex-class';
import io from 'socket.io-client';

@Component
export default class extends Vue {

    @Getter('getLogin') getLogin:any;
    user:string = '';
    message:string = '';
    socket:any = io('localhost:3001');

    room = 'lobby';    
    messages:Array<string> = [];

    sendMessage(e:any){
        e.preventDefault();
        this.socket.emit('sendmsg' + this.room, {
            user: this.getLogin.isLoggedin ? this.getLogin.username.username : 'Anon',
            message: this.message
        });
        this.message = '';
    }

    mounted(){
        this.user = this.getLogin.username
        this.socket.on('connect', () => {
            // Connected, let's sign-up for to receive messages for the lobby
            this.socket.emit('room', this.room);
        });

        this.socket.on('msg', (data:any) => {
            this.messages.push(data);
        })

        
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
    color: #45a29e;
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
}
.msg {
    margin-right: 4px;
    margin-left: 20px;
    text-align: left;
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
