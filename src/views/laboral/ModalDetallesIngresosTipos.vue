<template>
        <v-dialog max-width="1000px" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn  color="primary"  v-bind="attrs"  v-on="on" @click="requestData">
                    Ver Detalles
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="primary white--text">
                    Detalle ingresos tipos
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error"
                        @click="dialog = false"
                        large
                    > 
                        x
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <vue-excel-xlsx class="my-2 btn btn-primary"
                                    :data="detalleIngresos"
                                    :columns="excelHead"
                                    :filename="'DetallesTipos'"
                                    :sheetname="'Hoja1'"
                                >
                                <b-icon-cloud-download>     
                                </b-icon-cloud-download>
                                </vue-excel-xlsx>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    v-model="search"
                                    append-icon=""
                                    label="Buscar"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-data-table 
                                    :headers="headers"
                                    :items="detalleIngresos"
                                    :search="search"
                                    dense
                                    class="mt-4">
                                </v-data-table>
                            </v-col>
                        </v-row>
                         <ModalLoading/>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
</template>

<script>
import ModalLoading from '../../components/elementos/ModalLoading'
import { mapState,mapMutations } from 'vuex'
import Vue from 'vue'
import store from 'store'
import { url } from '../../config/api'

export default {
        name: "DetalleIngresosMateria",
        data: () => ({
            dialog: false
            ,detalleIngresos: []
            ,search: ''
            ,headers: [
                {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '15%'},
                {text: 'RUC', align: 'center', value: 'ruc', class : 'primary white--text', width: '15%'},
                {text: 'Tipo Causa', align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%'},
                {text: 'Fecha de ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%'},
                {text: 'Tipo ingreso', align: 'center', value: 'gls_ing_causa', class : 'primary white--text', width: '15%'},
                {text: 'Funcionario', align: 'center', value: 'nombre_funcionario', class : 'primary white--text', width: '21%'}
            ]
            ,user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }]
            ,excelHead :[
                 { label: "#",field: "increment" }
                ,{ label: "RIT",field: "rit" }
                ,{ label: "RUC",field: "ruc" }
                ,{ label: "Tipo Causa",field: "gls_tipo_causa" }
                ,{ label: "Fecha de ingreso",field: "fec_ingreso" }
                ,{ label: "Tipo ingreso",field: "gls_ing_causa" }
                ,{ label: "Funcionario",field: "nombre_funcionario" }
            ]
        }),
         components: {
        ModalLoading
        },
        methods:{
             ...mapMutations(['setModal']), // Mutations no Borrar
            requestData: function(){
                const axios = require('axios')
                const req1 = url + '/laboral/detalle_ingresos_causas' 
                this.detalleIngresos = []
                this.setModal(true) // Para cargar la ventana Modal

                axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user[0].cod_corte,
                            cod_tribunal: this.user[0].cod_tribunal,
                            anoInicio: this.fechas.anoInicio,
                            mesInicio: this.fechas.mesInicio,
                            anoFin: this.fechas.anoFin,
                            mesFin: this.fechas.mesFin
                        }
                    })

                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    let objdetIngreso;
                    let increment = 1

                    Object.values(data1.recordset).map((type) => {

                        objdetIngreso = new Object();
                        objdetIngreso.rit = type.rit
                        objdetIngreso.ruc = type.ruc
                        objdetIngreso.gls_tipo_causa = type.gls_tipo_causa
                        objdetIngreso.fec_ingreso = type.fec_ingreso
                        objdetIngreso.gls_ing_causa = type.gls_ing_causa
                        objdetIngreso.nombre_funcionario = type.nombre_funcionario
                        objdetIngreso.increment = increment

                        this.detalleIngresos.push(objdetIngreso)
                        increment ++
                    })
                    this.setModal(false) // Para apagar el loaddin modal
            
                })).catch(errors => {

                })

            }
        },
        computed: {
            ...mapState(['fechas'])
        }
}
</script>

<style scoped>

</style>