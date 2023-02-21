<template>
    <div class="container-fluid" >
        <div class="col-xs-12 col-md-12">
			<v-row>
				<v-col md="6">
					<h3>Cortes de Apelaciones</h3>
				</v-col>
				<v-col md="6">
					<v-btn  color="primary" :href="this.urlquauntum" style="float:right;text-decoration:none">Volver</v-btn>   
				</v-col>
			</v-row>
            <v-row style="background: #f7f7f7">
				<v-col md="3">
					<label for="Cortes">Cortes</label>
                    <select v-model="selected" class="form-control" id="Cortes">
                        <option v-for="option in options" :key="option.value" v-bind:value="option.value">
                            {{ option.text }}
                        </option>
                    </select>
				</v-col>
				<v-col md="9">
					<button @click="update()" type="button" class="btn btn-info mt-8">
                        Actualizar
                    </button>
				</v-col>
            </v-row>
			<v-row style="background: #f7f7f7">
				<v-col>
					<br>
					<highcharts :options="chartOptions" :constructor-type="'chart'" />
					<br>
				</v-col>
			</v-row>
			<v-row style="background: #f7f7f7">
				<v-col>
					<br>
					<highcharts  :options="chartOptions2" :constructor-type="'chart'" />
					<br>
				</v-col>
			</v-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import countTo from 'vue-count-to'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import RightSidebar from '../RightSidebar'
import { mapState } from 'vuex'

exporting(HighCharts)

export default {
  name: 'InventariosRetardos',
  data () {
    return {
		urlquauntum: '',
      startVal: 0,
      endVal: [0, 0, 0],
      fechas: [],
      selected: '90',
      options: [
        { text: 'Antofagasta', value: 15 },
        { text: 'Arica', value: 10 },
        { text: 'Chillan', value: 45 },
        { text: 'Concepción', value: 46 },
        { text: 'Copiapó', value: 20 },
        { text: 'Coyhaique', value: 60 },
        { text: 'Iquique', value: 11 },
        { text: 'La Serena', value: 25 },
        { text: 'Puerto Montt', value: 56 },
        { text: 'Punta Arenas', value: 61 },
        { text: 'Rancagua', value: 35 },
        { text: 'San Miguel', value: 91 },
        { text: 'Santiago', value: 90 },
        { text: 'Talca', value: 40 },
        { text: 'Temuco', value: 50 },
        { text: 'Valdivia', value: 55 },
        { text: 'Valparaíso', value: 30 }
      ],
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Inventario'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          },
          labels: {
            format: '{value:,.0f}'
          },
          gridLineWidth: 0
        },
        legend: {
          enabled: true
        },
        tooltip: {
          pointFormat: '{point.y}'
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function (element) {
                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
            }
          }
        },
		series: [],
		credits: false,
        lang: {
          loading: 'Cargando...',
          months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          exportButtonTitle: 'Exportar',
          printButtonTitle: 'Importar',
          rangeSelectorFrom: 'Desde',
          rangeSelectorTo: 'Hasta',
          rangeSelectorZoom: 'Período',
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
          thousandsSep: '.',
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
                'downloadXLS'
              ]
            }
          }
        }
      },
      chartOptions2: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Retardo (Artículo 62 COT)'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          labels: {
            rotation: -45,
            style: {
              fontSize: '10px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        },
        yAxis: {
          // min: 0,
          title: {
            text: ''
          },
          labels: {
            format: '{value:,.0f}'
          },
          gridLineWidth: 0
        },
        legend: {
          enabled: true
        },
        tooltip: {
          pointFormat: '{point.y}'
        },
        credits: false,
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function (element) {
                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
              }
            }
          }
        },
        series: [],
        lang: {
          loading: 'Cargando...',
          months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
          weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
          shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          exportButtonTitle: 'Exportar',
          printButtonTitle: 'Importar',
          rangeSelectorFrom: 'Desde',
          rangeSelectorTo: 'Hasta',
          rangeSelectorZoom: 'Período',
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
          thousandsSep: '.',
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
                'downloadXLS'
              ]
            }
          }
        }
      }
    }
  },
  created () {
	this.urlquauntum = quantum + '/corte_controller/'
    this.requestData()
  },
  mounted () {
  },
  computed: {
    ...mapState([
      'active'
    ])
  },
  watch: {
    active () {
      this.change = true
      this.update()
    }
  },
  methods: {
    requestData: function () {

      	this.chartOptions.series = []
		this.chartOptions2.series = []
		this.fechas = this.$setDate(3); // Menos tres

      	const axios = require('axios')
      	const inv_url = url + '/apelaciones/cortesInventarios'
      	const invret_url = url + '/apelaciones/cortesInventariosRetardos'

      	axios.all([
			axios.get(inv_url, {
			params: {
				cod_corte: this.selected,
				anoInicio: this.fechas.anoInicio,
				mesInicio: this.fechas.mesInicio,
				anoFin: this.fechas.anoFin,
				mesFin: this.fechas.mesFin
			}
			}),
			axios.get(invret_url, {
			params: {
				cod_corte: this.selected,
				anoInicio: this.fechas.anoInicio,
				mesInicio: this.fechas.mesInicio,
				anoFin: this.fechas.anoFin,
				mesFin: this.fechas.mesFin
			}
			})
      	]).then(axios.spread((...responses) => {
        	const data1 = responses[0].data
        	const data2 = responses[1].data

        	const inventarios = []
        	const inventarios_retardo = []

			Object.values(data1.recordset).map((type) => {
			inventarios.push({ name: type.mes + ' ' + type.ano, y: type.cantidad })
			})

			Object.values(data2.recordset).map((type) => {
			inventarios_retardo.push({ name: type.mes + ' ' + type.ano, y: Math.round((type.cantidad / type.salas) - 100) })
			})

			this.chartOptions.series.push({
			data: inventarios,
			name: 'Inventario',
			color: '#1ABB9C'
			})

			this.chartOptions2.series.push({
			data: inventarios_retardo,
			name: 'Retardo por salas ordinarias',
			color: '#2A3F54'
			})

        	this.$forceUpdate()
      	})).catch(errors => {

      	})
    },
    update () {
      this.startVal = 0
      this.endVal = [0, 0, 0]
      this.requestData()
    }
  },
  components: {
    //    AppVersion,
    //    DeviceUsage,
    highcharts: Chart,
    countTo,
    url,
    RightSidebar
    //  QuickSettings,
    //  RecentActivities,
    //  TodoList
  }
}
</script>
