<template>
    <div class='container'>
        <h2>Users Online</h2>
       
        <ul v-if="onlineUsers">
            <li v-for="names in onlineUsers"  class='online'>{{names.name}}
            <input  type="button" class="button is-success  is-outlined" @click="invite(names)" value="Invite">
            </li>
        </ul>
</div>
        
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import {Getter, Action, State} from 'vuex-class';
import { Socket } from 'vue-socket.io-extended';
import { IUser, IUserShort } from '../../../types';
import axios, { AxiosResponse } from 'axios';
import { getOnlineUsersService, getMyUsernameService} from '../service';


@Component
export default class extends Vue {
    @Getter('getUsers') private getUsers: any;
    @Getter('getLogin') private getUserName: any;
    @State('usersOnline') private usersState: any;
    @Action('userLogin') private userLogin: any;

    private onlineUsers: string[] = [];
    private existing = [];
    private token: string | null = null ;
    private username: string | null = '';
    // private server = process.env.IP + process.env.PORT;

    public mounted() {
        if (localStorage.getItem('token') && localStorage.getItem('name')) {
            this.username = localStorage.getItem('name'); // insecure and silly i know. but ive spend 5 hrs trying to fix it so
            this.refreshOnline();
        }
        //     getMyUsernameService(this.token)
        //       .then( res => console.log('get my username: ' + JSON.stringify(res)))

    }
    // fetch all online users on login
     @Socket('newuser')
      private onNewuser(data: any) {
        this.refreshOnline();
     }

     @Socket('logout')
        private onLogout(data: any) {
            this.refreshOnline();
        }

     private refreshOnline() {
        getOnlineUsersService(this.getUserName.username)
          .then( (res: any) => {
              // const username = this.getUserName.username;
              this.$socket.client.emit('subscribe', this.username);
              this.onlineUsers = res.filter((el: IUserShort) => el.name !== this.username);
          })
          .catch(); // err => console.log('Error in onNewUser: ' + err));
     }

     private invite(user: string) {
         const gameroom = Math.random().toString(36).substring(7);
         this.$socket.client.emit('invite', {
            user: 'Admin',
            message: 'You have been invited to a game',
            room: user,
            game: gameroom,
            sender: this.username, // this.getUserName.username,
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
