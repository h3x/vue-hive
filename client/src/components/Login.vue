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
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Getter, Action, namespace} from 'vuex-class';
import { Socket } from 'vue-socket.io-extended';

@Component
export default class extends Vue {
    private username: string = '';
    private password: string = '';

    // @ts-ignore
    @Action('userLogin') private userLogin: any;
    // @ts-ignore
    @Action('addLogin') private addLogin: any;
    private login(e: Event) {
        e.preventDefault();
        this.userLogin(this.username);
        // this.addLogin(this.username);

        // event to parent element
        this.$emit('usernameChange', this.username);

        // socket
        this.$socket.client.emit('newuser', this.username);
        this.$socket.client.emit('subscribe', this.username);

        this.username = '';
        this.password = '';
    }
}
</script>




<style scoped>

form{
    padding-top: 20%;
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
