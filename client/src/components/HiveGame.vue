<template>
  <div class="rxcanvas">    
    <canvas id='game' v-canvas="$route.params.id" ></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import HiveApp from '@/game/HiveApp';
import {Getter} from 'vuex-class';

Vue.directive('canvas', {
    bind(el, binding, vnode) {
        const username = localStorage.getItem('name');
        const hive = new HiveApp(el, binding.value, username);
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