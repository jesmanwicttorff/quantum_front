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
        <v-tab href="#tab-1">Tipo T&eacute;rmino</v-tab>
        <v-tab href="#tab-2">Tipo Materia</v-tab>
        <v-tab href="#tab-3">Tipo Procedimiento</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="py-1">
        <v-tab-item id="tab-1">
            <TerminosTipos />
        </v-tab-item>
        <v-tab-item id="tab-2">
            <TerminosMaterias />
        </v-tab-item> 
        <v-tab-item id="tab-3">
            <TerminosProcedimientos />
        </v-tab-item>
    </v-tabs-items>
  </b-container>
</template>
<script>
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import { quantum } from '../../config/quantum'
import TerminosTipos from '../../views/laboral/TerminosTipos'
import TerminosMaterias from '../../views/laboral/TerminosMaterias'
import TerminosProcedimientos from '../../views/laboral/TerminosProcedimientos'


export default {
    name: 'TerminosMain',
    data () {
        return {
            tab: null
            ,urlquauntum: quantum + '/laboral_controller/totalesCorte/'+ store.get('cod_corte')
        }
    },
    components: {
        FiltrosCompetencias,
        TerminosTipos,
        TerminosMaterias,
        TerminosProcedimientos
    }
} 
</script>