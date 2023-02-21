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
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-card>
            <v-dialog v-model="dialog" max-width="90%">
                <v-card>
                    <v-card-title class="primary white--text">
                        Detalles de Juicio Oral Por Juez
                        <v-spacer></v-spacer>
                        <v-btn class="primary" @click="dialog = false"> Cerrar</v-btn>
                    </v-card-title>
                </v-card>
                <v-card class="py-2 px-3">
                    <v-data-table :headers="array_AudienciaOral" :items="Query_Jueces_Realizadas" :page.sync="page" :items-per-page="itemsPerPage" dense hide-default-footer @page-count="pageCount = $event"></v-data-table>
                    <v-row justify="center" class="py-0">
                        <v-col cols="6">
                            <v-pagination v-model="page" :length="pageCount"></v-pagination>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-card>
         <v-card>
            <v-dialog v-model="dialog2" max-width="90%">
                <v-card>
                    <v-card-title class="primary white--text">
                        Detalle Juez 
                        <v-spacer></v-spacer>
                        <v-btn class="primary" @click="dialog2 = false"> Cerrar</v-btn>
                    </v-card-title>
                </v-card>
                <v-card class="py-2 px-3">
                    <v-data-table :headers="array_AudienciaOral" :items="Query_Jueces" :page.sync="page" :items-per-page="itemsPerPage" dense hide-default-footer @page-count="pageCount = $event"></v-data-table>
                    <v-row justify="center" class="py-0">
                        <v-col cols="6">
                            <v-pagination v-model="page" :length="pageCount"></v-pagination>
                        </v-col>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-card>
        <v-card>
            <v-row sm="12" dense>
                <v-col md="6">
                    <highcharts :options="chartOptions" :constructor-type="'chart'" />
                </v-col>
                <v-col md="6">
                    <v-row sm="12" dense>
                        <v-col cols="2">
                            <vue-excel-xlsx class="mt-0 btn primary white--text text-center" :data="bodyExcelDetalles" :columns="headExcelDetalles" :filename="'AudienciasDetalles'" :sheetname="'Hoja1'">
                                <b-icon-cloud-download> </b-icon-cloud-download>
                            </vue-excel-xlsx>
                        </v-col>
                        <v-col cols="2" offset-md="7">
                            <v-btn class="mt-0 btn primary white--text text-center" @click="detallesAudienciaOral()">Ver detalle</v-btn>
                        </v-col>
                    </v-row>
                    <v-simple-table dense>
                        <template>
                            <thead>
                                <tr>
                                    <th v-for="item in head" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tableBody" :key="index">
                                    <td class="primary--text text-center">{{ item.correlativo }}</td>
                                    <td class="primary--text text-center">{{ item.gls_nombres }}</td>
                                    <td @click="detalle(item.crr_litigante_id)" class="text-center">
                                        <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: {id:item.crr_litigante_id } }"> {{item.cantidad}} </router-link>
                                        <!--<router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: {id:item.id } }"> {{item.cantidad}} </router-link>-->
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-card>
        <!-- <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn  color="success" :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn>                       
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row sm="12" class="mt-3" dense>
            <v-col md="12">
                <highcharts :options="chartOptions" :constructor-type="'chart'" />
            </v-col>
                       
        </v-row>
        <template>
            <v-row justify="center" dense>
                <v-dialog
                    v-model="modalDetalles"
                    max-width="95%"
                >
                <v-card>
                    <v-card-title class="headline"></v-card-title>
                    <v-card-actions class="px-6">
                        <v-row dense>
                            <v-col > 
                                <v-btn
                                    class="primary"
                                    @click="modalDetalles = false"
                                > Cerrar
                                </v-btn>
                            </v-col>
                            <v-col offset="10">        
                                <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                                :data="bodyExcelDetallesModal"
                                :columns="headExcelDetallesModal"
                                :filename="'AudienciasDetalles'"
                                :sheetname="'Hoja1'"
                                >
                                    <b-icon-cloud-download>     
                                    </b-icon-cloud-download>
                                </vue-excel-xlsx>
                            </v-col>
                        </v-row>                             
                    </v-card-actions>                        
                    <v-card-text>
                        <v-data-table 
                            :headers="tableDetalleHeader"
                            :items="tableDetalleBody"
                            :page.sync="pageDetalle"
                            :items-per-page="itemsPerPageDetalle"
                            dense
                            hide-default-footer
                            @page-count="pageCountDetalle = $event"                                
                            class="mt-10">
                        </v-data-table>
                        <v-row justify="center"> 
                            <v-col cols="6">
                                <v-pagination v-model="pageDetalle" :length="pageCountDetalle"></v-pagination>
                            </v-col>
                        </v-row>                            
                    </v-card-text>
                </v-card>
                </v-dialog>
            </v-row>
        </template>          
        <ModalLoading />         -->
        <ModalLoading />
    </b-container>
</template>
<script>
import { url } from '../../config/api'
import { url2 } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'PenalAudienciasJuecesRealizadasOrales',
    data(){
        return {
            urlquauntum: url2 + '/indicadoresPenal/Tablero/'+ store.get('token') + '/' + store.get('cod_corte') + '/' + store.get('cod_tribunal') + '/' + store.get('ano') + '/' + store.get('mes') + '/' + 0 + '/' + store.get('exhorto') + '/' + store.get('tipo') ,
            urlquauntum2: url2 + '/indicadoresPenal/AudienciasEstados',
            dialog: false,
            dialog2:false,
            tab: null,
            ruta: store.get('ruta'),
            user: {
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto'),
                tipo: store.get('tipo')
            },
            chartOptions: JSON.parse(JSON.stringify(Graph['barv'][0])),
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,            
            tableHeader: [
                { text: 'N°',  align: 'center', value: 'correlativo', class : 'primary white--text', width: '5%'},
                { text: 'Juez',  align: 'center', value: 'gls_nombres', class : 'primary white--text', width: '50%'},
                { text: 'Cantidad',  align: 'center', value: 'cantidad', class : 'primary white--text', width: '15%' }               
            ],
            tableBody: [],
            headExcelDetalles: [
                {
                    label: "N°",
                    field: "correlativo",
                },
                {
                    label: "Juez",
                    field: "gls_nombres",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                }                                                               
            ],
            head: [ { value: 'N°', index: 0}, 
                    { value: 'Juez', index: 1}, 
                    { value: 'Cantidad', index: 2}
            ],
            bodyExcelDetalles: [],
            modalDetalles: false,
            tableDetalleHeader: [
                { text: 'Tribunal',  align: 'center', value: 'gls_tribunal', class : 'primary white--text', width: '5%'},
                { text: 'T. Origen',  align: 'center', value: 'gls_tribunal_origen', class : 'primary white--text', width: '50%'},
                { text: 'T. Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%' },
                { text: 'F. Inicio',  align: 'center', value: 'gls_formainicio', class : 'primary white--text', width: '15%' },
                { text: 'Rit',  align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },
                { text: 'Fec. Ingreso',  align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%' },
                { text: 'Tip. Ingreso',  align: 'center', value: 'gls_tipo_ingreso', class : 'primary white--text', width: '15%' },
                { text: 'Tip. Audiencia',  align: 'center', value: 'gls_nombres', class : 'primary white--text', width: '15%' },
                { text: 'Fec. Audiencia',  align: 'center', value: 'fec_evento', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ini Prg',  align: 'center', value: 'fec_inicioprg', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ter Prg',  align: 'center', value: 'fec_terminoprg', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ini Real',  align: 'center', value: 'fec_inicioreal', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ter Real',  align: 'center', value: 'fec_terminoreal', class : 'primary white--text', width: '15%' },
                { text: 'VIF',  align: 'center', value: 'vif', class : 'primary white--text', width: '15%' },
                { text: 'RPA',  align: 'center', value: 'rpa', class : 'primary white--text', width: '15%' },
                { text: 'TTD',  align: 'center', value: 'ttd', class : 'primary white--text', width: '15%' }                
            ],
            tableDetalleBody: [],            
            pageDetalle: 1,
            pageCountDetalle: 0,
            itemsPerPageDetalle: 10,
            headExcelDetallesModal: [
                {
                    label: "Tribunal",
                    field: "gls_tribunal",
                },
                {
                    label: "T. Origen",
                    field: "gls_tribunal_origen",
                },
                {
                    label: "T. Causa",
                    field: "gls_tipo_causa",
                },
                {
                    label: "F. Inicio",
                    field: "gls_formainicio",
                },
                {
                    label: "Rit",
                    field: "rit",
                },
                {
                    label: "Fec. Ingreso",
                    field: "fec_ingreso",
                }, 
                {
                    label: "VIF",
                    field: "vif",
                }, 
                {
                    label: "RPA",
                    field: "rpa",
                }, 
                {
                    label: "TTD",
                    field: "ttd",
                }, 
                {
                    label: "Tip. Ingreso",
                    field: "gls_tipo_ingreso",
                }, 
                {
                    label: "Tip. Audiencia",
                    field: "gls_nombres",
                },
                {
                    label: "Fec. Audiencia",
                    field: "fec_evento",
                },
                {
                    label: "Hora. Ini Prg",
                    field: "fec_inicioprg",
                },
                {
                    label: "Hora. Ter Prg",
                    field: "fec_terminoprg",
                },
                {
                    label: "Hora. Ini Real",
                    field: "fec_inicioreal",
                },
                {
                    label: "Hora. Ter Real",
                    field: "fec_terminoreal",
                }                                                                                                                                                                                 
            ],
            bodyExcelDetallesModal: [],
             array_AudienciaOral:  [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '5%'},
                { text: 'Juez',  align: 'left', value: 'nombre', class : 'primary white--text', width: '60%' },
                { text: 'Tribunales', align: 'center', value: 'Tribunal', sortable: 0 , class : 'primary white--text', width: '7%' },
                { text: 'Despliegue', align: 'center', value: 'Despliegue', class : 'primary white--text', width: '7%' },
                { text: 'Causa', align: 'center', value: 'NombCausa', class : 'primary white--text', width: '7%' },
                { text: 'Tipo Causa', align: 'center', value: 'TipoCausa', class : 'primary white--text', width: '7%' },
                { text: 'Fecha Ingreso', align: 'center', value: 'FechaIngreso', class : 'primary white--text', width: '7%' },
                { text: 'Fecha Digitacion', align: 'center', value: 'Digitacion', class : 'primary white--text', width: '7%' },
                { text: 'Estrelacion', align: 'center', value: 'Estrelacion', class : 'primary white--text', width: '7%' },
                { text: 'Evento', align: 'center', value: 'Evento', class : 'primary white--text', width: '7%' },
                { text: 'Forma Inicio', align: 'center', value: 'FormaInicio', class : 'primary white--text', width: '7%' },              
              ], 
            Query_Jueces_Realizadas: [], 
            Query_Jueces: [], 
                            
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
        this.sentRequest()
    },
    methods:{
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        submit(){
            this.sentRequest()
        },
        detalle(id){
            
            this.setModal(true) // Aqui Manipulamos el modal
            this.dialog2 = true
             const axios = require('axios')
            const req1 = url + '/penal/JuezDetallesOrales' // Link de la llamada
            this.Query_Jueces=[]; 
            // Consulta para mostrar las observaciones de agendamiento en el modal
           
            const get = async req1 => {
                    try {
                        const response = await axios.get(req1, {
                            params: 
                            {
                                cod_corte:  this.user.cod_corte,
                                cod_tribunal: this.user.cod_tribunal,
                                anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                anoFin: this.fechas().anoFin || this.$route.params.ano,
                                mesFin: this.fechas().mesFin || this.$route.params.mes,
                                id: id
                    
                            }
                        })
                        
                        const data1 = response.data
                        let increment = 1
                        let objtribunal
                        
                       
                        Object.values(data1.recordset).map((type) => {
                            objtribunal = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objtribunal.nombre = type.nombre
                            objtribunal.Tribunal = type.Tribunal
                            objtribunal.Despliegue = type.Despliegue
                            objtribunal.NombCausa = type.NombCausa
                            objtribunal.FechaIngreso = type.FechaIngreso
                            objtribunal.Digitacion = type.Digitacion
                            objtribunal.Estrelacion = type.Estrelacion
                            objtribunal.Evento = type.Evento
                            objtribunal.TipoCausa = type.TipoCausa
                            objtribunal.FormaInicio = type.FormaInicio
                            objtribunal.increment = increment 
                            this.Query_Jueces.push(objtribunal) 
                            increment ++  
                          }) 
    
                    }catch(errors) {
                        console.log(errors);
                    }  // fin try

            } // fin get
  
             get(req1) 
          
            this.setModal(false) // Aqui Manipulamos el modal

        },
        detallesAudienciaOral(){
            this.setModal(true) // Aqui Manipulamos el modal
            this.dialog = true
             const axios = require('axios')
            const req2 = url + '/penal/AudienciaResultadosDetallesOrales' // Link de la llamada
            this.Query_Jueces_Realizadas=[]; 
            // Consulta para mostrar las observaciones de agendamiento en el modal
            const get = async req2 => {
                    try {
                        const response = await axios.get(req2, {
                            params: 
                            {
                                cod_corte:  this.user.cod_corte,
                                cod_tribunal: this.user.cod_tribunal,
                                anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                anoFin: this.fechas().anoFin || this.$route.params.ano,
                                mesFin: this.fechas().mesFin || this.$route.params.mes,
                    
                            }
                        })
                        const data1 = response.data
                        let increment = 1
                        let objtribunal
                       
                        Object.values(data1.recordset).map((type) => {
                            objtribunal = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objtribunal.nombre = type.nombre
                            objtribunal.Tribunal = type.Tribunal
                            objtribunal.Despliegue = type.Despliegue
                            objtribunal.NombCausa = type.NombCausa
                            objtribunal.FechaIngreso = type.FechaIngreso
                            objtribunal.Digitacion = type.Digitacion
                            objtribunal.Estrelacion = type.Estrelacion
                            objtribunal.Evento = type.Evento
                            objtribunal.TipoCausa = type.TipoCausa
                            objtribunal.FormaInicio = type.FormaInicio
                            objtribunal.increment = increment 
                            this.Query_Jueces_Realizadas.push(objtribunal) 
                            increment ++  
                          }) 

                    }catch(errors) {
                        console.log(errors);
                    }  // fin try

            } // fin get

             get(req2) 

            this.setModal(false) // Aqui Manipulamos el modal

        },
        sentRequest(){                        
            this.setModal(true) // Aqui Manipulamos el modal      
            const axios = require('axios')
            let req1 = url + '/penal/audienciasJuecesRealizadasOrales'            
            let params = {}
            if(this.$route.params.ano){
                params = {
                        cod_corte: this.user.cod_corte,
                        cod_tribunal: this.user.cod_tribunal,
                        anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                        mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                        anoFin: this.fechas().anoFin || this.$route.params.ano,
                        mesFin: this.fechas().mesFin || this.$route.params.mes,
                        exhorto: this.fechas().exhorto || this.$route.params.exhorto,
                        tipo: Number(this.$route.params.tipo)
                }
            }else{
                params = {
                        cod_corte: this.user.cod_corte,
                        cod_tribunal: this.user.cod_tribunal,
                        anoInicio: this.fechas().anoInicio || this.user.ano,
                        mesInicio: this.fechas().mesInicio || this.user.mes,
                        anoFin: this.fechas().anoFin || this.user.ano,
                        mesFin: this.fechas().mesFin || this.user.mes,
                        exhorto: this.fechas().exhorto || this.user.exhorto,
                        tipo: Number(this.user.tipo)
                }
            }
            axios.all([
                axios.get(req1, {
                    params
                })
            ]).then(axios.spread((...responses) => {

                this.chartOptions.title.text =  'Audiencias de Juicio oral por Juez.' // Titulo del grafico de lineas
                this.chartOptions.categories = []
                this.chartOptions.series = [] // Limpiamos las Series           
                this.tableBody = []  
                this.bodyExcelDetalles = []   

                const data1 = responses[0].data
                const audiencias = []
                const jueces = []
                let aux = 1  

                Object.values(data1.recordset).map((type) => {
                    audiencias.push(type.cantidad)
                    jueces.push(type.gls_nombres)
                    this.tableBody.push({
                        correlativo: aux,
                        path:'PenalAudienciasDetallesRealizadas',
                        gls_nombres: type.gls_nombres,
                        cantidad: this.$thousandSeparator(type.cantidad),
                        crr_litigante_id: type.crr_litigante_id
                    })
                    aux++                                           
                })
               

                this.chartOptions.xAxis.categories = jueces
                this.chartOptions.series.push({ data: audiencias }) 
                
                
                this.tableDetalleBody = data1.recordset
                this.bodyExcelDetalles = data1.recordset 

                this.setModal(false) // Aqui Manipulamos el modal
            })).catch(errors => {
                this.setModal(false) // Aqui Manipulamos el modal
            })  
        },
    },
    components:{
        ModalLoading,
        FiltrosCompetencias,
        highcharts: Chart
    }                
}
</script>