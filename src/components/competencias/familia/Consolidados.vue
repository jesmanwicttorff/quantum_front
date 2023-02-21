<template>
  <b-container fluid class="px-4">
      <!-- <b-container fluid class="px-0 py-4">
        <span class="badge badge-primary small" style="font-size: 150%;margin-bottom: 20px;">{{this.gls_tribunal}}</span>
        <v-btn  color="primary" :href="this.urlquauntum" style="float:right;text-decoration:none">Volver</v-btn>     
      </b-container> -->
      <b-tabs content-class="mt-3" justified>
        <b-tab title="Gestión" active>
          <Gestiones v-bind:gls_tribunal="gls_tribunal" />
        </b-tab>
        <b-tab title="Infancia">
         <Infancias />
        </b-tab>
        <b-tab title="Audiencias">
          <AudienciasMaterias />
        </b-tab>
        <b-tab title="Inventario">
          <Inventarios />
        </b-tab>
        <b-tab title="Trámites">
          <Tramites />
        </b-tab>        
      </b-tabs>
  </b-container>
</template>
<script>
import Vue from 'vue'
import { url } from '../../../config/api'
import { quantum } from '../../../config/quantum'
import store from 'store'
// import countTo from 'vue-count-to'
import VueCarousel from '@chenfengyuan/vue-carousel'
import Infancias from '../familia/Infancias'
import Gestiones from '../familia/Gestiones'
import AudienciasMaterias from '../familia/AudienciasMaterias'
import Inventarios from '../familia/Inventarios'
import Tramites from '../familia/Tramites'

export default {
  name: 'Consolidados',
  data () {
    return {
      urlquauntum: '',
      user: [{
        usuario_id : store.get('usuario_id'),
        cod_corte : store.get('cod_corte'),
        cod_tribunal : store.get('cod_tribunal')
      }],
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      gls_tribunal: ''
    }
  },
  created () {
    this.requestData(this.dateRange)
  },
  methods: {
    requestData: function (dateRange) {
      this.dateRange = dateRange

      const axios = require('axios')
      const ing_url = url + '/familia/tribunal'
      this.urlquauntum = quantum + '/familia_controller/totalesCorte/'+ this.user[0].cod_corte

      const get = async ing_url => {
        try {
          const response = await axios.get(ing_url, {
            params: {
              cod_tribunal: this.user[0].cod_tribunal
            }
          })
          const data = response.data
          this.gls_tribunal = data.recordset[0].gls_tribunal;

        } catch (error) {
          console.log(error)
        }
      }

      get(ing_url)
    },    
  },
  components: {
    Infancias,
    Gestiones,
    AudienciasMaterias,
    Inventarios,
    Tramites
  }
}
</script>
<style>
.arial, .btn, span,tspan, li, h5, h6, text  {
  font-family: Arial, Helvetica, sans-serif;
}
.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #ffff;
    background-color: #007bff;
    border-color: #dee2e6 #dee2e6 #fff;
}


</style>
