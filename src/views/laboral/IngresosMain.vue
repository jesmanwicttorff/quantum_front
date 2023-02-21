<template>
<b-container fluid class="px-4 py-0">

    <v-row>
        <v-col>
            <v-card>
                <v-card-title class="primary white--text">
                    Filtros
                    <v-spacer></v-spacer>
                    <v-btn  color="success" :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn>     
                </v-card-title>
                <v-card-text>
                    <FiltrosCompetencias class="mt-4"/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

    <v-tabs v-model="tab" background-color="accent-4" centered>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1">Ingresos Causas</v-tab>
        <v-tab href="#tab-2">Ingresos Materias</v-tab>
        <v-tab href="#tab-3">Ingresos Tipos</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
        <v-tab-item id="tab-1">
                <IngresosCausas />
        </v-tab-item>
        <v-tab-item id="tab-2">
                <IngresosMaterias />
        </v-tab-item> 
        <v-tab-item id="tab-3">
                <IngresosTipos />
        </v-tab-item>
    </v-tabs-items>
  </b-container>
</template>
<script>
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import store from 'store'
import IngresosCausas from '../../views/laboral/Ingresos'
import IngresosMaterias from '../../views/laboral/Ingresos_tipoMaterias.vue'
import IngresosTipos from '../../views/laboral/Ingresos_tipoIngresos.vue'
import { mapState, mapMutations } from 'vuex'
import { quantum } from '../../config/quantum'


export default {
    name: 'IngresosMain',
    data () {
        return {
            tab: null
            ,urlquauntum: quantum + '/laboral_controller/totalesCorte/'+ store.get('cod_corte')
        }
    },
    components: {
        IngresosCausas,
        IngresosMaterias,
        IngresosTipos,
        FiltrosCompetencias
    }
} 
</script>