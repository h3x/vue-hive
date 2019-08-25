<template>
  <div class="columns">
        <div class="column">    
            <HiveGame />
        </div>
        
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HiveGame from "@/components/HiveGame.vue"; 
import Chat2 from "@/components/Chat2.vue"; 
import { Socket } from 'vue-socket.io-extended'

@Component({
  components: {
    HiveGame,
    Chat2,
  },
})
export default class Game extends Vue {
  @Socket()
    connect(){
      this.$socket.client.emit('subscribe', this.$router.currentRoute.params.id)
    }
}
  
</script>

<style scoped>
</style>
