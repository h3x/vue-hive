<template>
    <div>
        <section id='chat'></section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    
  },
})
export default class Chat extends Vue {}
  
</script>

<style scoped>
#chat{
    height:90vh;
    width: 90%;
    background: #444;
    display:block;
}
</style>
