<template>
  <b-container fluid="xs" class="py-2">
    <b-container fluid>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Espera" active><Esperas  /></b-tab>
        <b-tab title="Cumplimientos"><Cumplimientos /></b-tab>
        <b-tab title="Egresado"><Egresos /></b-tab>
      </b-tabs>
    </b-container>
  </b-container>
</template>
<script>
import Vue from 'vue'
import { url } from '../../../config/api'
import store from 'store'
import Esperas from '../familia/Esperas'
import Cumplimientos from '../familia/Cumplimientos'
import Egresos from '../familia/Egresos'


export default {
  name: 'Infancias',
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
  
  },
  components: {
    Esperas,
    Cumplimientos,
    Egresos
  }
}
</script>

<style lang="scss">

</style>
