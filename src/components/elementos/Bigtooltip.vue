<template>
    <div class="panel panel-default" id="informacion" :style="position">
        <div class="panel-heading">Caracteristicas</div>
        <div class="panel-body">
           {{text}}
        </div>
    </div>
    <!-- <div class="informacion">
        <h3 class="panel">Caracteristicas</h3>
        <p>{{text}}</p>
    </div> -->
</template>
<script>
import Vue from 'vue'
export default {
  name: 'Bigtooltip',
  data () {
    return {
      text: this.$attrs.text,
      position: this.$attrs.position || 'left:0;'
    }
  }
}
</script>
