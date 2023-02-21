<template>
    <v-dialog max-width="85%" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn small color="primary" v-bind="attrs" v-on="on" @click="requestData">
                Visualizar
            </v-btn>
        </template>
        <v-card>
        <v-row md="12" class="white px-3 py-3 mx-auto">
            <v-card hover height="50" width="100%" color="primary" class="cardAction white--text text-right">
                <v-btn outlined dense color="white" class="mr-7 py-6" small @click="dialog = false"> Cerrar </v-btn>
            </v-card>
        </v-row>
        <v-row>
            <v-tabs   v-model="tab"  background-color="accent-4"  class="ml-3 mx-auto"  centered >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">Dashboard</v-tab>
                <v-tab href="#tab-2">Observación</v-tab>
            </v-tabs>
        </v-row>
        </v-card>
        <v-tabs-items v-model="tab">
            <v-tab-item id="tab-1">
                <v-row md="12" class="white mt-0 px-1 py-1" >
                    <v-col md="5">
                        <highcharts :options="chartOptions" :constructor-type="'chart'" />
                    </v-col>
                    <v-col md="2" class="mt-0">
                        <v-row justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary" class="cardAction">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Ingresos</h6>
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                        <v-row class="py-2" justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Escritos</h6>
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                        <v-row class="py-2" justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Sentencias</h6>
                                        <!-- <br/> -->
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                    </v-col>
                    <v-col md="4" offset-md="1">
                        <!--INI-Sentencias-->
                        <v-row dense>
                            <v-col md="12">
                                <v-card class="mx-auto">
                                    <v-card-title primary-title class="primary white--text">
                                        <h6>Sentencias</h6>
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white">Detalle</v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row dense>
                                            <v-col md="3" offset-md="9" class="text-center primary--text"><b>Cantidad</b></v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col md="4" class="text-left primary--text"><b>Absolutorias</b></v-col>
                                            <v-col md="3" offset-md="5" class="text-center primary--text"><b>35</b></v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col md="4" class="text-left primary--text"><b>Condenatorias</b></v-col>
                                            <v-col md="3" offset-md="5" class="text-center primary--text"><b>75</b></v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col md="12">
                                <v-card class="mx-auto">
                                    <v-card-title primary-title class="primary white--text">
                                        <h6>Escritos por Plazos</h6>
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white">Detalle</v-btn>
                                    </v-card-title>
                                    <ModalEscritos :fechasEscrito="{cod_corte: this.fechasConsulta.cod_corte, cod_tribunal: this.fechasConsulta.cod_tribunal , ano: this.fechasConsulta.ano, mes: this.fechasConsulta.mes , exhorto: 1}" />
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row md="12" class="white mt-0">
                    <ModalAudienciasEstados :fechasAudiencia="{cod_corte: this.fechasConsulta.cod_corte, cod_tribunal: this.fechasConsulta.cod_tribunal , ano: this.fechasConsulta.ano, mes: this.fechasConsulta.mes , exhorto: 1}" />
                </v-row>
            </v-tab-item>
            <v-tab-item id="tab-2">
                 <v-card>
                     <v-card-text>
                          <v-row>
                          <v-col md="12" >
                                <v-textarea :rows="10"  :auto-grow="autoGrow" v-model="userForm[1][0].descripcion" solo label="Observación" ></v-textarea>
                                <v-alert v-if="this.msg === true" dense text type="success">Observación <strong>guardado exitosamente</strong></v-alert>
                          </v-col>
                         <v-col md="6">
                                <v-btn  small color="primary" v-if="this.add===true" :disabled="desabilitado()" @click="save()" >Guardar</v-btn>
                                <v-btn style="margin: 10px;" class="text-white" v-if="this.add===true" :disabled="desabilitado()" small color="red" @click="elimObs()">Borrar</v-btn>
                         </v-col>
                        </v-row>
                          </v-card-text>
                 </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-dialog>
</template>


<script>
    import store from "store";
    import { url } from "../../config/api";
    import { quantum } from "../../config/quantum";
    import { Graph } from "../../config/Highcharts";
    import { Chart } from "highcharts-vue";
    import exporting from "highcharts/modules/exporting";
    import HighCharts from "highcharts";
    import loadDrillDown from "highcharts/modules/drilldown";
    import stockInit from "highcharts/modules/stock";
    import { mapState, mapMutations } from "vuex";
    import countTo from "vue-count-to";
    import FiltrosCompetencias from "../../components/elementos/FiltrosCompetencias";
    import ModalLoading from "../../components/elementos/ModalLoading";
    import ModalAudienciasEstados from "../suprema/ModalAudienciaEstados";
    import ModalEscritos from "../suprema/ModalEscritos";

    loadDrillDown(HighCharts);
    stockInit(HighCharts);
    exporting(HighCharts);

    export default {
        name: "TableroPenal",
        props: ['fechasConsulta'],
        data() {
            return {
                dialog: false,
                 tab: null,
                 msg:false,
                 userForm:{ 1: [ { id: 1 , descripcion: ''}]},
                 e1:1,
                textloading: true,
                 autoGrow: true,
                 add: true,
                user: {
                    usuario_id: store.get("user_usuario_id"), // Los parametros que obtenemos de la url
                    cod_corte: store.get("cod_corte"),
                    cod_tribunal: store.get("cod_tribunal"),
                    ano: store.get("ano"),
                    mes: store.get("mes"),
                    rango: store.get("rango"),
                    exhorto: store.get("exhorto"),
                    tipo: this.$route.params.tipo,
                },
                urlquauntum: quantum + "/penal_controller/totalesCorte/" + store.get("cod_corte"),
                startVal: 0,
                endVal: [0, 0, 0],
                chartOptions: JSON.parse(JSON.stringify(Graph["pie"][0])),
            };
        },
        created() {
            this.requestData()
            this.show_agendamiento_tribunales()
      
        },
        watch:{
            fechasConsulta: function(){
               // this.requestData()
            }
        },        
        methods: {
            ...mapMutations(["setModal"]), // Mutations no Borrar
            ...mapState(["fechas"]), // Valores Guardados
            submit() {
                this.requestData();
            },
            requestData: function () {
                this.setModal(true); // Aqui Manipulamos el modal
                const axios = require("axios");
                const req1 = url + "/penal/indicadores";
                this.endVal = [0, 0, 0];
                this.msg=false

               // console.log(this.fechasConsulta);

                let params = {
                    cod_corte: this.fechasConsulta.cod_corte,
                    cod_tribunal: this.fechasConsulta.cod_tribunal,
                    anoInicio: this.fechasConsulta.ano - 1,
                    mesInicio: this.fechasConsulta.mes,
                    anoFin: this.fechasConsulta.ano,
                    mesFin: this.fechasConsulta.mes,
                    exhorto: this.fechasConsulta.exhorto
                };

                axios
                    .all([
                        axios.get(req1, {
                            params,
                        }),
                    ])
                    .then(
                        axios.spread((...responses) => {
                            const data1 = responses[0].data;
                            const ingresos = [];
                            const exhorto = [];
                            const ingresoexhorto = [];

                            this.chartOptions = JSON.parse(JSON.stringify(Graph["lines"][0]));
                            this.chartOptions.xAxis.categories = this.fechas().calendario;
                            this.chartOptions.chart.height = 350;
                            this.chartOptions.series = []; // Limpiamos las Series

                            this.chartOptions.title.text = "Comparativa Ingresos Vs Exhortos"; // Titulo del grafico de lineas
                            this.chartOptions.title.align = "left"; // Centramos el titulo de Grafico

                            // this.chartOptions.xAxis.categories = this.fechas().calendario

                            Object.values(data1.recordset).map((type) => {
                                ingresos.push({ name: "Ingresos", y: type.ingresos, color: "#2979ff" });
                                exhorto.push({ name: "Exhortos", y: type.ingresos_exhorto, color: "#2A3F54" });
                                ingresoexhorto.push({ name: "Ingresos", y: type.ingresos, color: "#2979ff" }, { name: "Exhortos", y: type.ingresos_exhorto, color: "#2A3F54" });
                                this.endVal[0] += type.ingresos;
                                this.endVal[1] += type.escritos;
                                this.endVal[2] += type.sentencias;
                            });

                            if (this.fechas().TipoBusqueda != "Mensual") {
                                this.chartOptions.series.push(
                                    {
                                        data: ingresos,
                                        name: "Ingresos",
                                    },
                                    {
                                        data: exhorto,
                                        name: "Exhortos",
                                    }
                                );
                            } else {
                                this.chartOptions.series.push({
                                    data: ingresoexhorto,
                                });
                            }

                            // this.setModal(false) // Aqui Manipulamos el modal
                            this.setModal(false); // Aqui Manipulamos el modal
                        })
                        
                    )
                    .catch((errors) => {});
            },
            show_agendamiento_tribunales() { // Metodo Para mostar la observacion en textarea
                    const axios = require('axios')
                    const req2 = url + '/suprema/list_agendamientos_tribunales_observaciones' // Link de la llamada
                    // Consulta para mostrar las observaciones de agendamiento en el modal
                    axios.all([
                        axios.get(req2, {
                            params: {
                                        flag_obs: 1,
                                        cod_corte: this.fechasConsulta.cod_corte,
                                        cod_tribunal: this.fechasConsulta.cod_tribunal,
                                        obs_id : 1
                                    
                            }
                        })
                        ]).then(axios.spread((...responses) => {

                            const obj = responses[0].data

                            Object.values(obj.recordset).map((type) => {
                                const newObj = this.userForm[type.obs_id].filter(item => item.id === type.obs_id);  

                                const pos = this.userForm[type.obs_id].map(function(e) { 
                                                return e.id; 
                                            }).indexOf(newObj[0].id);

                                if(pos == 0){
                                this.userForm[type.obs_id][pos].descripcion = type.obs_gestion_tribunales 
                                }
                            });                      
                    
                            
                        })).catch(errors => {
                    })
        },
        desabilitado(){ // Metodo para bloquear el boton si no ha escrito ninguna observacion donde no permite guardar
            if(this.add == true){
                return  this.userForm[1][0].descripcion == '' 
            }
           
        },
            save(){
                this.msg=true
                 this.userForm[this.e1].map((type) => {
                const axios = require('axios')
                const ing_url = url + '/suprema/insertup_agendamientos_tribunales_observaciones'

                const get =  ing_url => {
                    try {
                    const response = axios.get(ing_url, {
                        params: {
                            usuario_id : this.user.usuario_id,
                            cod_corte: this.fechasConsulta.cod_corte,
                            cod_tribunal: this.fechasConsulta.cod_tribunal,
                            obs_id : 1,
                            flag_obs : 1,
                            obs_gestion_tribunales: (type.descripcion.length == 0) ? 'Sin Observación': type.descripcion 
                            
                        }
                        
                    })
                        
                    

                    } catch (error) {
                        console.log(error)
                    }
                }
                get(ing_url)  

                 })

            },
            elimObs(){
                     const axios = require('axios')     // Query para borrar la observacion      
                    const request1 = url + '/suprema/elimi_agendamientos_tribunales_observaciones'   
                        const get = async request1 => {
                            try {
                                const response = await axios.get(request1, {
                                    params: 
                                    {
                            
                                        cod_corte: this.fechasConsulta.cod_corte,
                                        cod_tribunal: this.fechasConsulta.cod_tribunal,
                                        flg_elimina : 0,
                                        obs_id: 1
                                    }      
                                        
                            })
                            this.msg=false
                            this.userForm[1][0].descripcion=''
                            
                          
                           // this.descObs= this.descObsII 
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        
                     get(request1)
            }
        },
        components: {
            FiltrosCompetencias,
            highcharts: Chart,
            countTo,
            ModalLoading,
            ModalAudienciasEstados,
            ModalEscritos,
        },
    };
</script>
