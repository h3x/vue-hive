<template>
  <div class="rxcanvas">    
    <canvas v-canvas></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import HiveApp from "@/game/HiveApp"; 


Vue.directive('canvas',{
    bind(el, binding,vnode){
        const hive = new HiveApp(el);
        hive.setup();
    }
})
export default class Game extends Vue {}
  
  
//   canvas:HTMLCanvasElement = document.getElementById('game') as HTMLCanvasElement;
//   ctx:CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

//   draw(){
//     this.ctx.fillStyle = '#444';
//     this.ctx.fillRect(0,0,100, 50);
//   }
  //hive = new HiveApp(this.canvas);
  

  // computed property
//   get app(): HiveApp {
//     return new HiveApp();
//   }

</script>

<style scoped>
#game{
    display:block;
}
</style>
