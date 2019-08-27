<template>
<div class="background">
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
        <input class="input" type="password"  v-model="password" placeholder="Password">
        <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
        </span>
    </p>
    </div>
    <div class="field">
    <p class="control">
        <button  type="submit" class="button is-success  is-outlined">
        Login
        </button>
    </p>
    </div>
    </form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Getter, Action, namespace} from 'vuex-class';


@Component
export default class extends Vue {
     private username: string = '';
     private password: string = '';

    // @ts-ignore
     @Action('userLogin') private userLogin;

     private login(e: Event) {
        e.preventDefault();
        this.userLogin({ username: this.username});
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

.field {
    width: 50%;
    margin: auto;
    margin-top: 10px;
}


</style>
