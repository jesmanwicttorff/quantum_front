<template>
  <b-container fluid class="py-3">      
    <v-row dense>
        <v-col>
            <v-card>
                <v-card-title class="primary white--text">
                    <v-row dense>
                        <v-col cols="1">
                        Filtros
                        </v-col>
                        <v-col cols="1" offset-md="8">
                          <v-btn   class="ml-16" @click="downloadPDF()" variant="outline-primary">PDF</v-btn>
                        </v-col>
                        <v-col >
                            <v-btn cols="1" class="ml-16" color="success" :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn> 
                        </v-col>                        
                    </v-row>                      
                </v-card-title>
                <v-card-text>
                    <FiltrosCompetencias  v-on:buscar="requestData" class="mt-1"/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>             
    <v-card class="py-2">
        <v-card-title class="primary">
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline white--text">{{this.$attrs.gls_tribunal}}</v-list-item-title>
                    <v-list-item-subtitle class="font-italic white--text" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ this.fechas().periodo}} </v-list-item-subtitle>                         
                </v-list-item-content>
            </v-list-item>
        </v-card-title>
        <v-card-text class="pdf">                     
          <v-row xs="12" class="px-3" dense>
              <Modal v-bind:graph="graph" v-bind:api="api" v-bind:title="title" v-bind:option="option" />
          </v-row>
          <v-row sm="12" class="mt-3" dense>
              <v-col md="5">
                <highcharts  :options="chartOptions" :constructor-type="'chart'" v-if="this.option != 1 "/>
                <highcharts  :options="chartOptions2" :constructor-type="'chart'" v-if="this.option == 1 "/>
              </v-col>
              <v-col md="2" class="ml-0">
                <v-row justify="center">
                    <v-hover>
                        <v-card hover height="100" width="100%" color="primary"   class="cardAction" @click="changeGraph(option,'/familia/ingresosMaterias','Ingresos por Materias')"  v-b-modal.modal-1> 
                            <v-card-text class="white--text text-center">
                                <h6>Total Ingresos</h6>
                                <h4><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></h4>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-row>
                <v-row class="py-2" justify="center">
                    <v-hover>
                        <v-card hover height="100" width="100%" color="primary"   @click="changeGraph(option,'/familia/terminosMaterias','Terminos por Materias')" v-b-modal.modal-1> 
                            <v-card-text class="white--text text-center">
                                <h6>Total T&eacute;rminos</h6>
                                <h4><countTo  class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></h4>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-row>
                <v-row class="py-2" justify="center">
                    <v-hover>
                        <v-card hover height="100" width="100%" color="primary"   v-b-modal.modal-resoluciones> 
                            <v-card-text class="white--text text-center">
                                <h6>Total Resoluciones</h6>
                                <!-- <br/> -->
                                <h4><countTo class="count" :startVal="startVal" :endVal="endVal[3]" separator="." :duration="3000"></countTo></h4>
                            </v-card-text>
                        </v-card>
                    </v-hover>
                </v-row>
              </v-col>
              <v-col md="4" offset-md="1">
              <!--INI-Resoluciones por juez-->   
                <v-card class="mx-auto">
                  <v-card-title primary-title class="primary white--text">
                    <h6>TOP 5 Resoluciones por Juez</h6>
                    <v-spacer></v-spacer>
                    <v-btn small outlined color="white" @click="setTipoModal('resJuez')"  v-b-modal.modalJuezTerminos>Detalle</v-btn>
                  </v-card-title>
                  <v-card-text>
                     <v-data-table
                    :items="Query_Resolucion" 
                    :sort-by="['cantidad']"
                    :sort-desc="[true]"
                    hide-default-footer
                    disable-sort
                    >
                   <!-- <v-row>
                        <v-col md="6" class="primary--text"><b>Juez</b></v-col>
                        <v-col md="6" class="text-right primary--text"><b>Resoluciones</b></v-col>
                    </v-row>                  
                    <v-row v-for="(juez, index) in resJuez" v-bind:key="juez.cantidadRes" dense>
                      <v-col md="12" v-if="index <= 4" class="p-0 pl-0">
                        <v-col md="12" class="primary--text">
                            <b>{{ juez.name | capitalize }}</b> 
                            <countTo class="float-right"  :startVal="startVal" :endVal="juez.cantidadRes" separator="." :duration="3000"></countTo>
                        </v-col>                      
                      </v-col>
                    </v-row>-->
                    <template v-slot:[`body`]="{  }">
                        <tbody>
                            <tr v-for="(juez, index) in resJuez" v-bind:key="juez.cantidadRes" dense>
                                <td style ="width:50%;" class="primary--text" v-if="index <= 4"><b>{{ juez.name | capitalize }}</b></td>
                                <td style ="width:50%; text-align: center" v-if="index <= 4"><countTo class="count" :startVal="startVal" :endVal="juez.cantidadRes" separator="." :duration="1000"></countTo></td>
                            </tr>
                        </tbody>
                    </template>
                  </v-data-table>                                 
                  </v-card-text>
                </v-card>
              </v-col>
            <!--FIN-Resoluciones por juez-->
          </v-row>
          <!--INI-Audiencias-->
          <v-row md="12" dense>
            <v-col md="8">
              <Audiencias :fechasConsulta="this.fechasotras" v-bind:option="option"/>     
            </v-col>
            <v-col md="4">
              <!--INI-Resoluciones por juez-->   
                <v-card class="mx-auto">
                  <v-card-title primary-title class="primary white--text">
                    <h6>Top 5 Terminos por Tipos</h6>
                    <v-spacer></v-spacer>
                    <v-btn small outlined color="white" @click="setTipoModal('terminosTipos')"  v-b-modal.modalJuezTerminos>Detalle</v-btn>                  
                  </v-card-title>
                  <v-card-text>
                    <v-data-table
                    :items="Query_terTipos" 
                    :sort-by="['cantidad']"
                    :sort-desc="[true]"
                    hide-default-footer
                    disable-sort
                    >
                    <template v-slot:[`body`]="{  }">
                        <tbody>
                            <tr v-for="(ter, index) in terTipos" v-bind:key="index" dense>
                                <td style ="width:50%;" class="primary--text" v-if="index <= 4"><b>{{ ter.gls_tipfallada | capitalize }}</b></td>
                                <td style ="width:50%; text-align: center" v-if="index <= 4"><countTo class="count" :startVal="0" :endVal="ter.cantidad" separator="." :duration="1000"></countTo></td>
                            </tr>
                        </tbody>
                    </template>
                    </v-data-table>
                   <!-- <v-row v-for="(ter, index) in terTipos" v-bind:key="index" dense>
                      <v-col md="12" v-if="index <= 4" class="p-0 pl-0">
                        <v-col md="12" class="primary--text">
                            <b>{{ ter.gls_tipfallada | capitalize }}</b> 
                            <countTo class="float-right"  :startVal="startVal" :endVal="ter.cantidad" separator="." :duration="3000"></countTo>
                        </v-col>                      
                      </v-col>
                    </v-row>  --->                                
                  </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <ModalLoading/>  
        </v-card-text>
    </v-card>
    <!--FIN-Audiencias-->
    <Modal v-if="IsVisibility"/>
    <ModalJuezTermino :resJuez="this.resJuez" :tipoModal="this.tipoModal" :terTipos="this.terTipos" :fechas="this.fechas"/>
    <ModalEscritos :option="this.option"/>
    <ModalResoluciones :option="this.option"/>
    <ModalComparativas v-if="MostrarComparativa"/> 
  </b-container>
</template>
<script>
import ModalLoading from '../../../components/elementos/ModalLoading'
import Vue from 'vue'
import { url } from '../../../config/api'
import store from 'store'
import countTo from 'vue-count-to'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import { mapState , mapMutations } from 'vuex'
import Bigtooltip from '../../../components/elementos/Bigtooltip'
import RightSidebar from '../../RightSidebar'
import Modal from '../familia/Modal'
import ModalJuezTermino from '../familia/ModalJuezTerminos'
import ModalEscritos from '../familia/ModalEscritos'
import ModalResoluciones from '../familia/ModalResoluciones'
import Audiencias from '../familia/Audiencias'
import html2canvas from 'html2canvas'
import jsPDF  from "jspdf"
import FiltrosCompetencias from '../../elementos/FiltrosCompetencias'
import { quantum } from '../../../config/quantum'
import ModalComparativas from '../../../components/elementos/ModalComparativas'

stockInit(HighCharts)
exporting(HighCharts)


export default {
  name: 'Gestiones',
  data () {
    return {
        urlquauntum: '',
        IsVisibility: false,
         headerjuez: [
            { text: 'Juez',  align: 'center', value: 'nombre_funcionario', class : 'primary white--text', width: '13%'},
            { text: 'Resoluciones', align: 'center', value: 'cantidad', class : 'primary white--text', width: '19%' }
            ],
        graph: '',
        api: '',
        title: '',
        startVal: 0,
        endVal: [0, 0, 0, 0], 
        resJuez: [],
        terTipos: [],
        Query_terTipos:[],
        Query_Resolucion:[],
        tipoModal: '',
		tipoGrafico: '',
		MostrarComparativa: false,
        user: [{
          usuario_id : store.get('user_usuario_id'),
          cod_corte : store.get('cod_corte'),
          cod_tribunal : store.get('cod_tribunal'),
          ano : store.get('ano'),
          mes : store.get('mes')
        }],
        option: 1,
        fechasotras: [],
        dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
        chartOptions: {
            chart: {
              height: 340,
              type: 'line'
            },
            title: {
                align: 'left',  
                text: 'Comparativa Ingresos Vs Términos'
            },
            subtitle: {
                text: ''
            },        
            xAxis: {
                categories: []
            },
            yAxis: {
                labels: {
                    format: '{value}',
                },             
                title: {
                    text: 'Cantidades'
                },
            },
            legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
            },        
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true                  
                    },
                    enableMouseTracking: false
                }
            },
            credits: {
            enabled: false
            },      
            series: [],
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: 'Descargas',                    
                        menuItems: [
                        'printChart',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        ]
                    }
                }
            }
        },
        chartOptions2: {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
              minHeight: 300,
              height: 300
            },
            title: {
              align: 'left',  
              text: 'Comparativa Ingresos Vs Términos'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.0f}'
                },
                colors: ['#2979ff','#2A3F54']
              }
            },
            credits: {
                enabled: false
            },      
            series: [],
            lang: {
                loading: 'Cargando...',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                exportButtonTitle: "Exportar",
                printButtonTitle: "Importar",
                rangeSelectorFrom: "Desde",
                rangeSelectorTo: "Hasta",
                rangeSelectorZoom: "Período",
                drillUpText: 'Regresar a {series.name}',
                downloadPNG: 'Descargar imagen PNG',
                downloadJPEG: 'Descargar imagen JPEG',
                downloadPDF: 'Descargar imagen PDF',
                downloadSVG: 'Descargar imagen SVG',
                downloadCSV: 'Descargar CSV',
                downloadXLS: 'Descargar EXCEL',            
                printChart: 'Imprimir',
                resetZoom: 'Reiniciar zoom',
                resetZoomTitle: 'Reiniciar zoom',
                thousandsSep: ".",
                exitFullscreen: 'Salir pantalla completa',
                viewFullscreen: 'Ver pantalla completa',
                decimalPoint: '.'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        text: 'Descargas',                    
                        menuItems: [
                        'printChart',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS',
                        ]
                    }
                }
            }
        }
    }
  },
  created () {
	this.requestData()
	this.ValidarPermiso()
  },
  computed: {
    ...mapState(['active'])
  },
  watch: {
    active () {
      this.change = true
      this.update()
    }
  },  
  methods: {
    ...mapMutations(['setModal']), // Mutations no Borrar
    ...mapState(['fechas']), // Valores Guardados
    requestData: function (option = 1) {
      this.setModal(true)      

      console.log(this.fechas())
      switch (this.fechas().TipoBusqueda) {
        case 'Mensual':
            this.option = 1
          break;
         case 'Trimestre':
            this.option = 2
          break; 
         case 'CuatrimestreFijo':
            this.option = 4
          break; 
         case 'CuatrimestreMovil':
            this.option = 5
          break; 
         case 'AñoFijo':
            this.option = 6
          break;       
         case 'AñoMovil':
            this.option = 3
          break; 
        default:
            this.option = 1
          break;
      }

      this.fechasotras = this.$setDate(option); 
      
      this.chartOptions.series = []
      this.chartOptions2.series = []
      this.endVal   = [0,0,0,0]
      this.resJuez  = []
      this.terTipos = []
      this.Query_terTipos = []
      
      const axios = require('axios')
      const req1 = url + '/familia/indicador_cantidad_ingreso'
      const req2 = url + '/familia/resolucionesFuncionarios'
      const req3 = url + '/familia/terminosTipos'

      this.chartOptions.xAxis.categories = this.fechas().calendario

      axios.all([
        axios.get(req1, {
          params: {
            cod_corte: this.user[0].cod_corte,
            cod_tribunal: this.user[0].cod_tribunal,
            anoInicio: this.fechas().anoInicio || this.$route.params.ano,
            mesInicio: this.fechas().mesInicio || this.$route.params.mes,
            anoFin: this.fechas().anoFin || this.$route.params.ano,
            mesFin: this.fechas().mesFin || this.$route.params.mes,
            flag_exhorto: this.fechas().exhorto || 1
          }
        }),
        axios.get(req2, {
          params: {
            cod_corte: this.user[0].cod_corte,
            cod_tribunal: this.user[0].cod_tribunal,
            anoInicio: this.fechas().anoInicio || this.$route.params.ano,
            mesInicio: this.fechas().mesInicio || this.$route.params.mes,
            anoFin: this.fechas().anoFin || this.$route.params.ano,
            mesFin: this.fechas().mesFin || this.$route.params.mes,
            tipo_cargo_id: 1
          }
        }),
        axios.get(req3, {
          params: {
            cod_corte: this.user[0].cod_corte,
            cod_tribunal: this.user[0].cod_tribunal,
            anoInicio: this.fechas().anoInicio || this.$route.params.ano,
            mesInicio: this.fechas().mesInicio || this.$route.params.mes,
            anoFin: this.fechas().anoFin || this.$route.params.ano,
            mesFin: this.fechas().mesFin || this.$route.params.mes
          }
        })  
      ]).then(axios.spread((...responses) => {

        const data1 = responses[0].data
        const ingresos = []
        const terminos = []
        const ingresosTerminos = []
        const resoluciones = []
        const resolucionesJueces = []
      
        Object.values(data1.ListaCortes[0].ListaTribunalDto[0].ListaIndicadores).map((type) => {   
          
          ingresosTerminos.push({ name: 'Ingresos', y: type.cantidad_ingresos })
          ingresosTerminos.push({ name: 'Terminos', y: type.cantidad_terminos })
          ingresos.push({ name: 'Ingresos', y: type.cantidad_ingresos })
          terminos.push({ name: 'Terminos', y: type.cantidad_terminos })
          
          this.endVal[0] += type.cantidad_ingresos
          this.endVal[1] += type.cantidad_terminos
          this.endVal[2] += type.cantidad_escritos
          this.endVal[3] += type.cantidad_resoluciones
          
        })
        
        this.chartOptions2.series.push({
            name: 'Ingresos vs Terminos',
            colorByPoint: true, 
            data: ingresosTerminos
        })

        this.chartOptions.series.push({
                data: ingresos,
                name: 'Ingresos',
                color: '#2979ff'
        })

        this.chartOptions.series.push({
                data: terminos,
                name: 'Terminos',
                color: '#2A3F54'
        }) 
        

        //Obtener data desde la API y recorrerla
         let objresol
         this.Query_Resolucion = []
        const dataResolucionesJueces =  responses[1].data
        Object.values(dataResolucionesJueces.recordset).map((type) => {
            objresol = new Object()
            objresol.nombre_funcionario =  type.nombre_funcionario
            objresol.cantidad =  type.cantidad
             this.resJuez.push({"name": type.nombre_funcionario, "cantidadRes": type.cantidad})
             this.Query_Resolucion.push(objresol)
         })

        //Obtener data desde la API y recorrerla
        const dataTerminosTipos =  responses[2].data
         let objtipo
         this.Query_terTipos = []
        Object.values(dataTerminosTipos.recordset).map((type) => {

            objtipo = new Object()
            objtipo.gls_tipfallada =  type.gls_tipfallada
            objtipo.cantidad =  type.cantidad

            this.terTipos.push({"gls_tipfallada": type.gls_tipfallada, "cantidad": type.cantidad})
            this.Query_terTipos.push(objtipo)
         }) 
         
        

        this.$forceUpdate()
        this.setModal(false) // Aqui Manipulamos el modal 

      })).catch(errors => {

      })
    },
    toggleModal(){
      this.IsVisibility = !this.IsVisibility;
    },

    setTipoModal(value){
      this.tipoModal = value
     
    },

    update (value) {
      this.startVal = 0
      this.endVal = [0, 0, 0]
      this.requestData(value)
       
    },
    changeGraph(value,value2,value3){

      //console.log(value);
      
       
      switch(value){
        case 1:
          this.graph = 'pie' 
            
          break;
        default:
          
          this.graph = 'column';
          break;
      }

      this.api = value2
      this.title = value3
     
	},
	ValidarPermiso(){
            const axios = require('axios')
			const req1 = url + '/familia/permisosComparativas' 

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                            id_usuario: this.user[0].usuario_id
                        }        
					})
					
					const data = response.data

					if(data.estado == 'ACEPTADO')
					{
						this.MostrarComparativa = true
					}else{
						this.MostrarComparativa = false
					}

                } 
                catch (error) {
                    console.log(error)
                }
            }

            get(req1)
    },
    downloadPDF(){
        window.scrollTo(0,0) // Desplaza hacia arriba
        html2canvas(document.querySelector('.pdf')).then(canvas => {
          let image = canvas.toDataURL('image/png')
          let doc = new jsPDF('l');
          let options = {
              align: 'justify'
            }       
          doc.text(120, 10, this.$attrs.gls_tribunal,options);
          doc.line(10, 15,290,15);        
          doc.addImage(image, 'png', 10, 20, 280, 200)
          doc.save('Dashboard.pdf')
        })       
    }    
  },
  components: {
    highcharts: Chart,
    countTo,
    url,
    FiltrosCompetencias,
    Bigtooltip,
    Modal,
    Audiencias,
    ModalJuezTermino,
    ModalEscritos,
    ModalResoluciones,
	ModalLoading,
	ModalComparativas
  }
}
</script>

<style lang="scss">
.arial, .btn, tspan, li {
  font-family: Arial, Helvetica, sans-serif;
}
.blue{
    color: #2979ff;
}
.quitarBordes{
  border: none;
}

label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
} 

</style>
