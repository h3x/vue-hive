<template>
    <div class="background">
        <LoginComponent v-on:usernameChange="username=$event"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from '@/components/Login.vue';

@Component({
    components: {
        LoginComponent,
    },
})
export default class Login extends Vue {}
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
