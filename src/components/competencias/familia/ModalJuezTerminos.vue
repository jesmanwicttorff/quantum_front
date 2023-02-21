<template>
    <b-container fluid class="px-4">
         <!-- MODAL PARA RESOLUCIONES POR JUEZ -->
        <b-modal id="modalJuezTerminos" class="modal-lg" title="Resoluciones por Juez"  scrollable ok-only v-if="tipoModal == 'resJuez'">
            <b-row class="ml-2">
                <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
            </b-row>
            <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
              <b-row v-for="juez in resJuez" v-bind:key="juez.name">
                <b-col sm="2" class="float-left px-1" style="margin-top: -3px;">
                  <img class="float-left rounded-circle" src="../../../assets/imagen_usuario_desconocidov2.png" alt="juez">
                </b-col>
                <b-col sm="10" class="p-1">
                  <label class="">{{ juez.name | capitalize }}</label> 
                  <label class="float-right blue"><b><countTo class="count" :startVal="0" :endVal="juez.cantidadRes" separator="." :duration="3000"></countTo></b></label>
                </b-col>
              </b-row>
          </b-card>
        </b-modal>
        <!-- MODAL PARA TERMINOS POR TIPOS-->
        <b-modal id="modalJuezTerminos" class="modal-lg" title="Términos por Tipos"  scrollable ok-only v-if="tipoModal == 'terminosTipos'">
            <b-row class="ml-2">
              <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
              <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
              <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
            </b-row>
            <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
            <v-data-table
                    :items="terTipos" 
                    :sort-by="['cantidad']"
                    :sort-desc="[true]"
                    hide-default-footer
                    disable-sort
                    >
                    <template v-slot:[`body`]="{  }">
                        <tbody>
                            <tr v-for="(ter, index) in terTipos" v-bind:key="index" dense>
                                <td style ="width:50%;" class="primary--text" ><b>{{ ter.gls_tipfallada | capitalize }}</b></td>
                                <td style ="width:50%; text-align: center"><countTo class="count" :startVal="0" :endVal="ter.cantidad" separator="." :duration="1000"></countTo></td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
          </b-card>
        </b-modal>
    </b-container>
</template>

<script>

    import Vue from 'vue'
    import { url, report } from '../../../config/api'
    import store from 'store'
    import countTo from 'vue-count-to'

    export default {
        name: "ModalResJuezTerminos",
        data(){
            return{

            }
        },
        components: {
            countTo
        },
        props: ['resJuez','tipoModal','terTipos','fechas']
    }
</script>

<style>
.modal-lg {
    max-width: auto !important;
   }
</style>