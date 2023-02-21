<template>
    <b-container fluid class="px-4">
        <Garantia v-if="Number(this.$route.params.tipo) == 13 || Number(this.user.tipo) == 13" />
        <Oral v-if="Number(this.$route.params.tipo) == 14 || Number(this.user.tipo) == 14" />
    </b-container>
</template>
<script>
import { url } from '../../config/api'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import Garantia from '../penal/AudienciasDetallesRealizadasGarantias'
import Oral from '../penal/AudienciasDetallesRealizadasOrales'

export default {
    name: 'PenalAudienciasDetallesRealizadas',
    data(){
        return {
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
        ...mapMutations(['setModal'])
    },
    components:{
        Garantia,
        Oral
    }                
}
</script>