<template>
  <div class="rxcanvas">    
    <canvas id='game' v-canvas="$route.params.id" ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import HiveApp from '@/game/HiveApp';
Vue.directive('canvas', {
    bind(el, binding, vnode) {
        const hive = new HiveApp(el, binding.value);
        hive.setup();
    },
});
export default class HiveGame extends Vue {}
</script>

<style scoped>
#game{
    margin-left: 2%;
    display:block;
}
</style>