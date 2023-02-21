<template>
        <v-dialog max-width="1000px" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn  color="primary"  v-bind="attrs"  v-on="on" @click="requestData">
                    {{btnLabel}}
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="primary white--text">
                    {{tituloLabel}}
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
                                    :data="detalleData"
                                    :columns="excelHead"
                                    :filename="'Detalles'"
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
                                    :items="detalleData"
                                    :search="search"
                                    dense
                                    class="mt-4">
                                </v-data-table>
                            </v-col>
                        </v-row>
                         <!-- <ModalLoading/> -->
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
</template>

<script>
// import ModalLoading from '../../components/elementos/ModalLoading'
import { mapState,mapMutations } from 'vuex'
import Vue from 'vue'
import store from 'store'
import { url } from '../../config/api'

export default {
        name: "ModalDetalles",
        data: () => ({
            dialog: false
            ,detalleData: []
            ,search: ''
            ,headers: []
            ,user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }]
            ,excelHead :[],
            btnLabel: "Ver Detalles",
            tituloLabel: ""
        }),
         components: {
        // ModalLoading
        },
        methods:{
             ...mapMutations(['setModal']), // Mutations no Borrar
            requestData: function(){

                switch(this.tipoModal){
                    case "terminosTipos":
                        this.terminosTiposData()
                        break
                    case "terminosMaterias":
                        this.terminosMaterias()
                        break
                    case "terminosProcedimientos":
                        this.terminosProcedimientos()
                        break
                    default:
                        console.log("Props no identificado ModalDetalles")
                        break
                }



            },
            terminosProcedimientos: function(){
                const axios = require('axios')
                const req1 = url + '/laboral/detalles_procedimientos_terminos' 
                this.detalleData = []
                this.setModal(true) // Para cargar la ventana Modal
                //cabecera de la tabla
                this. tituloLabel= "Detalles Procedimientos"

                this.headers = [
                    {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                    {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '16%'},
                    {text: 'Tipo Término', align: 'center', value: 'gls_tipfallada', class : 'primary white--text', width: '16%'},
                    {text: 'Procedimiento', align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '16%'},
                    {text: 'Fec. Ingreso', align: 'center', value: 'fecha_ingreso_causa', class : 'primary white--text', width: '16%'},
                    {text: 'Fec. Término', align: 'center', value: 'fecha_firma', class : 'primary white--text', width: '16%'},
                    {text: 'Duración dias', align: 'center', value: 'duracion', class : 'primary white--text', width: '16%'}
                ]
                //cabecera del excel
                this.excelHead =[
                     { label: "#",field: "increment" }
                    ,{ label: "RIT",field: "rit" }
                    ,{ label: "Tipo Término",field: "gls_tipfallada" }
                    ,{ label: "Procedimiento",field: "gls_procedimiento" }
                    ,{ label: "Fec. Ingreso",field: "fecha_ingreso_causa" }
                    ,{ label: "Fec. Término",field: "fecha_firma" }
                    ,{ label: "Duración dias",field: "duracion" }
                ]

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
                    let objDetTermino;
                    let increment = 1

                    Object.values(data1.recordset).map((type) => {

                        objDetTermino = new Object();
                        objDetTermino.rit = type.rit
                        objDetTermino.gls_tipfallada = type.gls_tipfallada
                        objDetTermino.gls_procedimiento = type.gls_procedimiento
                        objDetTermino.fecha_ingreso_causa = type.fecha_ingreso_causa
                        objDetTermino.fecha_firma = type.fecha_firma
                        objDetTermino.duracion = type.duracion
                        objDetTermino.increment = increment

                        this.detalleData.push(objDetTermino)
                        increment ++
                    })
                    this.setModal(false) // Para apagar el loaddin modal
            
                })).catch(errors => {
                    this.setModal(false)
                    console.log(errors)
                })



            },
            terminosMaterias: function(){
                const axios = require('axios')
                const req1 = url + '/laboral/detalles_materias_terminos' 
                this.detalleData = []
                this.setModal(true) // Para cargar la ventana Modal
                //cabecera de la tabla
                this. tituloLabel= "Detalles Materias"

                this.headers = [
                    {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                    {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '13%'},
                    {text: 'Tipo Término', align: 'center', value: 'gls_tipfallada', class : 'primary white--text', width: '14%'},
                    {text: 'Procedimiento', align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '13%'},
                    {text: 'Materias', align: 'center', value: 'gls_materia', class : 'primary white--text', width: '17%'},
                    {text: 'Fec. Ingreso', align: 'center', value: 'fecha_ingreso_causa', class : 'primary white--text', width: '13%'},
                    {text: 'Fec. Término', align: 'center', value: 'fecha_firma', class : 'primary white--text', width: '13%'},
                    {text: 'Duración dias', align: 'center', value: 'duracion', class : 'primary white--text', width: '13%'}
                ]
                //cabecera del excel
                this.excelHead =[
                     { label: "#",field: "increment" }
                    ,{ label: "RIT",field: "rit" }
                    ,{ label: "Tipo Término",field: "gls_tipfallada" }
                    ,{ label: "Procedimiento",field: "gls_procedimiento" }
                    ,{ label: "Materias",field: "gls_materia" }
                    ,{ label: "Fec. Ingreso",field: "fecha_ingreso_causa" }
                    ,{ label: "Fec. Término",field: "fecha_firma" }
                    ,{ label: "Duración dias",field: "duracion" }
                ]

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
                    let objDetTermino;
                    let increment = 1

                    Object.values(data1.recordset).map((type) => {

                        objDetTermino = new Object();
                        objDetTermino.rit = type.rit
                        objDetTermino.gls_tipfallada = type.gls_tipfallada
                        objDetTermino.gls_procedimiento = type.gls_procedimiento
                        objDetTermino.gls_materia = type.gls_materia
                        objDetTermino.fecha_ingreso_causa = type.fecha_ingreso_causa
                        objDetTermino.fecha_firma = type.fecha_firma
                        objDetTermino.duracion = type.duracion
                        objDetTermino.increment = increment

                        this.detalleData.push(objDetTermino)
                        increment ++
                    })
                    this.setModal(false) // Para apagar el loaddin modal
            
                })).catch(errors => {
                    this.setModal(false)
                    console.log(errors)
                })



            },
            terminosTiposData: function(){
                
                const axios = require('axios')
                const req1 = url + '/laboral/detalles_tipos_terminos' 
                this.detalleData = []
                this.setModal(true) // Para cargar la ventana Modal
                //cabecera de la tabla
                this. tituloLabel= "Detalles Términos Tipos"
                this.headers = [
                    {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                    {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '16%'},
                    {text: 'Tipo Término', align: 'center', value: 'gls_tipfallada', class : 'primary white--text', width: '16%'},
                    {text: 'Procedimiento', align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '16%'},
                    {text: 'Fec. Ingreso', align: 'center', value: 'fecha_ingreso_causa', class : 'primary white--text', width: '16%'},
                    {text: 'Fec. Término', align: 'center', value: 'fecha_firma', class : 'primary white--text', width: '16%'},
                    {text: 'Duración dias', align: 'center', value: 'duracion', class : 'primary white--text', width: '16%'}
                ]
                //cabecera del excel
                this.excelHead =[
                     { label: "#",field: "increment" }
                    ,{ label: "RIT",field: "rit" }
                    ,{ label: "Tipo Término",field: "gls_tipfallada" }
                    ,{ label: "Procedimiento",field: "gls_procedimiento" }
                    ,{ label: "Fec. Ingreso",field: "fecha_ingreso_causa" }
                    ,{ label: "Fec. Término",field: "fecha_firma" }
                    ,{ label: "Duración dias",field: "duracion" }
                ]


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
                    let objDetTermino;
                    let increment = 1

                    Object.values(data1.recordset).map((type) => {

                        objDetTermino = new Object();
                        objDetTermino.rit = type.rit
                        objDetTermino.gls_tipfallada = type.gls_tipfallada
                        objDetTermino.gls_procedimiento = type.gls_procedimiento
                        objDetTermino.fecha_ingreso_causa = type.fecha_ingreso_causa
                        objDetTermino.fecha_firma = type.fecha_firma
                        objDetTermino.duracion = type.duracion
                        objDetTermino.increment = increment

                        this.detalleData.push(objDetTermino)
                        increment ++
                    })
                    this.setModal(false) // Para apagar el loaddin modal
            
                })).catch(errors => {
                    console.log(errors)
                })
            }
        },
        computed: {
            ...mapState(['fechas'])
        },
        props: ['tipoModal']
}
</script>

<style scoped>

</style>