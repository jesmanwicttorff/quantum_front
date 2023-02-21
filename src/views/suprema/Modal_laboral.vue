<template>
<v-dialog max-width="95%" v-model="dialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn small color="primary" v-bind="attrs" v-on="on">
                Visualizar
            </v-btn>
        </template>
    <b-container fluid class="px-3 py-3 mx-auto" style="background-color: #F2F2F2">
        <v-row>
            <v-col md="12">
                <v-card hover height="50" width="100%" color="primary" class="cardAction white--text text-right">
                        <v-btn outlined color="white" class="mr-7 py-6" small @click="dialog = false"> Cerrar </v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-card>
            <v-card-text class="pdf">
                <v-tabs v-model="tabTablero" background-color="accent-4" centered>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#tab-1">Resumen</v-tab>
                    <v-tab href="#tab-2">Audiencias</v-tab>
                    <v-tab href="#tab-3">Observación</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabTablero">
                    <v-tab-item id="tab-1">
                        <Tablero :fechasTablero="{cod_corte: this.fechasConsulta.cod_corte, cod_tribunal: this.fechasConsulta.cod_tribunal , ano: this.fechasConsulta.ano, mes: this.fechasConsulta.mes , exhorto: 1}"/>
                    </v-tab-item>
                    <v-tab-item id="tab-2">
                        <TableroAudiencias :fechasAudiencia="{cod_corte: this.fechasConsulta.cod_corte, cod_tribunal: this.fechasConsulta.cod_tribunal , ano: this.fechasConsulta.ano, mes: this.fechasConsulta.mes , exhorto: 1}" /> 
                    </v-tab-item>
                     <v-tab-item id="tab-3">
                       <v-card>
                            <v-card-text>
                                <v-row>
                                <v-col md="12" >
                                        <v-textarea :rows="10"  :auto-grow="autoGrow" v-model="userForm[3][0].descripcion" solo label="Observación" ></v-textarea>
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
            </v-card-text>
        </v-card>
        <br/>
    </b-container>
 </v-dialog>
</template>


    
<script>
import ModalLoading from '../../components/elementos/ModalLoading'
import { url } from '../../config/api'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import exporting from 'highcharts/modules/exporting'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import Tablero from '../../views/suprema/Modal_Tablero'
import TableroAudiencias from '../../views/suprema/Modal_Tablero_Audiencia'
import countTo from 'vue-count-to'
import jsPDF  from "jspdf"
import html2canvas from 'html2canvas'

export default {
    name: 'TableroMain',
    props: ['fechasConsulta'],
    data () {
        return {
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : this.fechasConsulta.cod_tribunal,
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            tabTablero: null,
            dialog: false,
             add: true,
            autoGrow: true,
            userForm:{ 3: [ { id: 3 , descripcion: ''}]},
            msg:false,
            e1:3,
        }
    },
    created() {
        this.show_agendamiento_tribunales()
        },
     watch: {
        fechasConsulta: function(){
            // this.requestData()  
            }
    },
    methods: { 
        ...mapMutations(['setModal']),
         desabilitado(){ // Metodo para bloquear el boton si no ha escrito ninguna observacion donde no permite guardar
            if(this.add == true){
                return  this.userForm[3][0].descripcion == '' 
            }
        },
	    downloadPDF(){
            // window.scrollTo(0,0) // Desplaza hacia arriba
                
            html2canvas(document.querySelector('.pdf')).then(canvas => {
                let image = canvas.toDataURL('image/png')
                let doc = new jsPDF('p', 'pt', 'a1');
                doc.addImage(image, 'PNG', 10, 10, 1500, 1000)
                doc.save('Dashboard.pdf')
            })       
        },
         show_agendamiento_tribunales() { // Metodo Para mostar la observacion en textarea
        
                    const axios = require('axios')
                    const req2 = url + '/suprema/list_agendamientos_tribunales_observaciones' // Link de la llamada
                    // Consulta para mostrar las observaciones de agendamiento en el modal
                    axios.all([
                        axios.get(req2, {
                            params: {
                                        flag_obs: 1, // Observacion Laboral
                                        cod_corte: this.fechasConsulta.cod_corte,
                                        cod_tribunal: this.fechasConsulta.cod_tribunal,
                                        obs_id : 3
                                    
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
        save(){

            
                this.msg=true
                 this.userForm[this.e1].map((type) => {
                const axios = require('axios')
                const ing_url = url + '/suprema/insertup_agendamientos_tribunales_observaciones'

               

                const get =  ing_url => {
                    try {
                    const response = axios.get(ing_url, {
                        params: {
                            usuario_id : this.user[0].usuario_id,
                            cod_corte: this.fechasConsulta.cod_corte,
                            cod_tribunal: this.fechasConsulta.cod_tribunal,
                            obs_id : 3, 
                            flag_obs : 1,
                            obs_gestion_tribunales: (type.descripcion.length == 0) ? 'Sin Observación': type.descripcion 
                            
                        }
                        
                    })
                        
                     console.log(response);

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
                                        obs_id: 3 
                                    }      
                                        
                            })
                            this.msg=false
                            this.userForm[3][0].descripcion=''
                            
                          
                           // this.descObs= this.descObsII 
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        
                     get(request1)
            }
    },
    computed: {
        ...mapState(['fechas'])
    },
    components: {
       
        ModalLoading
        ,Tablero
        ,TableroAudiencias
    }
}
</script>
    
<style scoped>
 
</style>