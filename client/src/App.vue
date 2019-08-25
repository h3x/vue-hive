<template>
  <div id="app">
    <Header />
    <router-view/>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue'; // @ is an alias to /src
import {Action} from 'vuex-class';
import { Socket } from 'vue-socket.io-extended'

  




@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {  
  
  // socket:any = io('localhost:3001');
  @Action('addLogin') addUser:any;
  
  // tell everyone your here
  @Socket('newuser')
      onNewuser(data:any){
        this.addUser(data)
  }
}
</script>





<style>



#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  height:100vh;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#game{
  display: none;
}

</style>