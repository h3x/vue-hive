<template>
    <div class='container'>
        <h2>Users Online</h2>
       
        <ul v-if="onlineUsers">
            <li v-for="names in onlineUsers" class='online'>{{names}}
            <input  type="button" class="button is-success  is-outlined" @click="invite(names)" value="Invite">
            </li>
        </ul>
</div>
        
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import {Getter, Action, State} from 'vuex-class';
import { Socket } from 'vue-socket.io-extended';


@Component
export default class extends Vue {
    @Getter('getUsers') private getUsers: any;
    @Getter('getLogin') private getUserName: any;
    @State('usersOnline') private usersState: any;

    private onlineUsers: string[] = [];
    private existing = [];

    // fetch all online users on login
     @Socket('newuser')
      private onNewuser(data: any) {
          this.onlineUsers = this.getUsers;
     }

     private invite(user: string) {
         const gameroom = Math.random().toString(36).substring(7);
         this.$socket.client.emit('invite', {
            user: 'Admin',
            message: 'You have been invited to a game',
            room: user,
            game: gameroom,
            sender: this.getUserName.username,
        });
     }
}
</script>

<style scoped>

h2{
    text-align: left;
    color: #45a29e;
}

.online{
    color: orange;
}
</style>
