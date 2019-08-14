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
@Component({
  components: {
    HiveGame,
    Chat2,
  },
})
export default class Game extends Vue {}
  
</script>

<style scoped>
</style>
