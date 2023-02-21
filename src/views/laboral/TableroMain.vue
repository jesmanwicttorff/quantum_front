<template>
    <b-container fluid class="px-4 py-0" style="background-color: #F2F2F2">
        <v-row>
            <v-col md="12">
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn   small outlined color="white"  class="py-4 mr-5" @click="downloadPDF()" >PDF</v-btn>
                        <v-btn  color="success" :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn>    
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias class="mt-3" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-card>
            <v-card-text class="pdf">
                <v-tabs v-model="tabTablero" background-color="accent-4" centered>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#tab-1">Resumen</v-tab>
                    <v-tab href="#tab-2">Audiencias</v-tab>
                    <v-tab href="#tab-3">Agenda</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabTablero">
                    <v-tab-item id="tab-1">
                        <Tablero />
                    </v-tab-item>
                    <v-tab-item id="tab-2">
                        <TableroAudiencias /> 
                    </v-tab-item>
                    <v-tab-item id="tab-3">
                        <TableroAgenda /> 
                    </v-tab-item>
                </v-tabs-items>
            </v-card-text>
        </v-card>
        <br/>
    </b-container>
</template>


    
<script>
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import { url } from '../../config/api'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import exporting from 'highcharts/modules/exporting'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import Tablero from '../../views/laboral/Tablero'
import TableroAudiencias from '../../views/laboral/TableroAudiencias'
import TableroAgenda from '../../views/laboral/TableroAgenda'
import countTo from 'vue-count-to'
import jsPDF  from "jspdf"
import html2canvas from 'html2canvas'
import { quantum } from '../../config/quantum'

export default {
    name: 'TableroMain',
    data () {
        return {
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            tabTablero: null,
            urlquauntum: quantum + '/laboral_controller/totalesCorte/'+ store.get('cod_corte')
        }
    },
    methods: { 
        ...mapMutations(['setModal']),
	    downloadPDF(){
            // window.scrollTo(0,0) // Desplaza hacia arriba
                
            html2canvas(document.querySelector('.pdf')).then(canvas => {
                let image = canvas.toDataURL('image/png')
                let doc = new jsPDF('p', 'pt', 'a1');
                doc.addImage(image, 'PNG', 10, 10, 1500, 1000)
                doc.save('Dashboard.pdf')
            })       
        },
    },
    computed: {
        ...mapState(['fechas'])
    },
    watch: {
        fechas () {
           
        }
    },
    components: {
        FiltrosCompetencias
        ,ModalLoading
        ,Tablero
        ,TableroAudiencias
        ,TableroAgenda
    }
}
</script>
    
<style scoped>
 
</style>