<template>
<div class="background">
    
    <form @submit.prevent='register'>
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
    <p class="control has-icons-left">
        <input class="input" type="password"  v-model="passwordCon" placeholder="Confirm Password">
        <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
        </span>
    </p>
    </div>
    <div class="field">
    <p class="control">
        <button  type="submit" class="button is-success  is-outlined">
        Register
        </button>
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
import { Getter, Action, namespace} from 'vuex-class';
import { INewUser } from '../../../types';
import axios from 'axios';
import { newUserService } from '../service';


@Component
export default class extends Vue {
    private username: string = '';
    private password: string = '';
    private passwordCon: string = '';
    private error = '';

    // @Action('userLogin') private userLogin: any;

     private register(e: Event) {
        e.preventDefault();

        const newUser: INewUser = {
            name: this.username,
            password: this.password,
            token: '',
        };

        if (this.password === this.passwordCon) {
            newUserService(newUser)
              .then( () => this.$router.push('/'))
              .catch((err: string) => this.error = err);

        } else {
            this.error = 'Passwords do not match';
        }

        this.username = '';
        this.password = '';
        this.passwordCon = '';
     }
}


</script>




<style scoped>

form{
    padding-top: 20%;
    margin-bottom: 20px;
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

.notification{
    width:50%;
    margin: auto;
}
</style>
