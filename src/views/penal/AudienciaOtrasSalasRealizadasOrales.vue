<template>
    <b-container fluid class="px-4">
        <v-row sm="12">
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                         <v-btn v-if="this.ruta==1" color="success" :href="this.urlquauntum" style="text-decoration: none;">Volver</v-btn>
                        <v-btn v-else-if="this.ruta==2" color="success" :href="this.urlquauntum2" style="text-decoration: none;">Volver</v-btn>                       
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>        
        <ModalLoading />
    </b-container>    
</template>
<script>
import { url } from '../../config/api'
import { url2 } from '../../config/api'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import exporting from 'highcharts/modules/exporting'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'PenalAudienciasSalasRealizadasOrales',
    data(){
        return {
            urlquauntum: url2 + '/indicadoresPenal/Tablero/'+ store.get('token') + '/' + store.get('cod_corte') + '/' + store.get('cod_tribunal') + '/' + store.get('ano') + '/' + store.get('mes') + '/' + 0 + '/' + store.get('exhorto') + '/' + store.get('tipo') ,
            urlquauntum2: url2 + '/indicadoresPenal/AudienciasEstados',
            ruta: store.get('ruta'),
            tab: null,
            dialog: false,
            user: {
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto'),
                tipo: store.get('tipo')
            }            
                    
        }      
    },
    beforeCreate(){
        if(this.$route.params.ano){
            store.set('ano',this.$route.params.ano)
            store.set('mes',this.$route.params.mes)
            store.set('tipo',Number(this.$route.params.tipo))
        }
    },
    created(){
      
    },
    methods:{
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        submit(){
           // this.sentRequest()
        }
    },
    components:{
        ModalLoading,
        FiltrosCompetencias
      
    }                
}
</script>