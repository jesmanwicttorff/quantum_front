<template>
  <b-container fluid>
    <RightSidebar @clicked="update" v-bind:dateRange="dateRange" />
	<b-container class="py-3">
		<v-row>
			<v-col md="6">
				<v-btn  color="primary" :href="this.urlquauntum" style="float:left;text-decoration:none">Volver</v-btn>   
			</v-col>
			<v-col md="6">
				<b-button b-button variant="primary" v-b-toggle.sidebar-right style="float:right;background: #2A3F54">
              		<b-icon icon="search"></b-icon>
        		</b-button>
			</v-col>
		</v-row>
	</b-container> 

    <b-container>
      <h3 class="p">Cortes de Apelaciones</h3>
    </b-container>

    <b-container>
      <br>
      <highcharts :options="chartOptions" :constructor-type="'chart'" />
      <br>
    </b-container>

  </b-container>
  

</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import countTo from 'vue-count-to'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import RightSidebar from '../RightSidebar'

exporting(HighCharts)

export default {
  name: 'CausasVistas',
  data () {
    return {
		urlquauntum: '',
      startVal: 0,
      endVal: 0,
      endVal2: 0,
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Promedio de ingresos y terminos por salas'
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
          decimalPoint: ''
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
    this.requestData(this.dateRange)
  },
  mounted () {
  },
  methods: {
    requestData: function (dateRange) {
      this.dateRange = dateRange
      this.chartOptions.series = []
      const axios = require('axios')
      const ing_url = url + '/apelaciones/cortesIngresosSalas'
      const ter_url = url + '/apelaciones/cortesTerminosSalas'
      const ingresos = []
      const terminos = []

      axios.all([
        axios.get(ing_url, {
          params: {
            dateRange: this.dateRange
          }
        }),
        axios.get(ter_url, {
          params: {
            dateRange: this.dateRange
          }
        })
      ]).then(axios.spread((...responses) => {
        const data1 = responses[0].data
        const data2 = responses[1].data

        Object.values(data1.recordset).map((type) => {
          ingresos.push({ name: type.gls_corte, y: Math.round(type.cantidad / type.salas) })
          // this.endVal += Math.round(type.cantidad / type.salas);
        })

        Object.values(data2.recordset).map((type) => {
          terminos.push({ name: type.gls_corte, y: Math.round(type.cantidad / type.salas) })
          // this.endVal2 += Math.round(type.cantidad / type.salas);
        })

        this.chartOptions.series.push({
          data: ingresos,
          name: 'Ingresos promedio por salas ',
          color: '#1ABB9C'
        })

        this.chartOptions.series.push({
          data: terminos,
          name: 'Terminos promedio por salas ',
          color: '#2A3F54'
        })
      })).catch(errors => {

      })
    },
    update (value) {
      this.startVal = 0
      this.endVal = 0
      this.endVal2 = 0
      this.requestData(value)
    }
  },
  components: {
    highcharts: Chart,
    countTo,
    url,
    RightSidebar
  }
}
</script>
