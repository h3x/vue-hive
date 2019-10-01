<template>
<div>
    <form @submit.prevent='login'>
    <div class="field">
    <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" v-model="username" placeholder="Username">
        <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
        <i class="fas fa-check"></i>
        </span>
    </p>
    </div>
    <div class="field">
    <p class="control has-icons-left">
        <input class="input" type="password"  v-model="password"  placeholder="Password">
        
    </p>
    </div>
    <div class="field">
    <p class="control">
        <button  type="submit" class="button is-success  is-outlined">
        Login
        </button>
        <router-link to="/register">  <a type="button" class="button is-danger  is-outlined">Register</a></router-link>
    </p>
    </div>
    </form>
    <div v-if="error" class="notification is-danger">
       
        {{error}}
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Socket } from 'vue-socket.io-extended';
import {Getter, Action, namespace} from 'vuex-class';
import axios from 'axios';
import { ConnectionOptions } from 'tls';
import { setNewTokenService } from '../service';
import { INewUser } from '../../../types';
import Axios from 'axios';

@Component
export default class LoginComponent extends Vue {
    private username: string = '';
    private password: string = '';
    private error: string = '';
    private server = process.env.SERVER as ConnectionOptions;

    // @ts-ignore
    @Action('userLogin') private userLogin: any;
    // @ts-ignore
    @Action('addLogin') private addLogin: any;


    private login(e: Event) {
        e.preventDefault();
        // console.log('login component')
        this.error = '';
        const user: INewUser = {
            name: this.username,
            password: this.password,
        };

        setNewTokenService(user)
        .then( (res) => {
            // set local token
            localStorage.setItem('token', res.token);
            localStorage.setItem('name', this.username);
            // emit usename change to parent component
            this.$emit('usernameChange', this.username);

            // save verified username to local state TODO: make better
            this.userLogin(this.username);

            // socket
            this.$socket.client.emit('newuser', this.username);
            this.$socket.client.emit('subscribe', this.username);

            // reset fields
            this.username = '';
            this.password = '';
            if (this.$route.path !== '/') {
                this.$router.push('/');
            }
        })
        .catch((err) => {
            this.error = err;
        });
    }
}
</script>
<style scoped>

form{
    padding-top: 20%;
}

.notification {
    width: 70%;
    margin: auto;
    margin-top: 10px;
}

input[type="text"], input[type="password"] {
    background: #1f2833;
    color: #66fcf1;
}

button, a[type="button"]{

    margin-left:10px;
}
.field {
    width: 50%;
    margin: auto;
    margin-top: 10px;
}
</style>
