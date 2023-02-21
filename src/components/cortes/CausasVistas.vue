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
        <b-container class="tile_count">
          <b-row class="tile_stats_count">
            <b-col sm="6">
              <span class="count_top">Total sin PR16</span>
              <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal" separator="." :duration="3000"></countTo></b-col>
            </b-col>
            <b-col sm="6">
              <span class="count_top">Total PR16</span>
              <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal2" separator="." :duration="3000"></countTo></b-col>
            </b-col>
          </b-row>
        </b-container>
      </b-container>

      <br>   
      
      <b-container class="p">
        <h3>Cortes de Apelaciones</h3>
      </b-container>
      <b-container class="px-4">
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
          text: 'Causas promedio por salas'
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
      },
      chartOptions2: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Causas Vistas'
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
          enabled: false
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
    this.requestData(this.dateRange)
  },
  mounted () {
  },
  methods: {
    requestData: function (dateRange) {
      this.dateRange = dateRange
      this.chartOptions.series = []
      this.chartOptions2.series = []
      const axios = require('axios')
      const ing_url = url + '/apelaciones/cortesCausasTablas'
      const get = async ing_url => {
        try {
          const response = await axios.get(ing_url, {
            params: {
              dateRange: this.dateRange
            }
          })

          const data = response.data

          const vista = []
          const no_vista = []

          Object.values(data.recordset).map((type) => {
            vista.push({ name: type.gls_corte, y: Math.round(type.vista / type.salas) })
            no_vista.push({ name: type.gls_corte, y: Math.round(type.no_vista / type.salas) })
            this.endVal += Math.round(type.vista / type.salas)
            this.endVal2 += Math.round(type.no_vista / type.salas)
          })

          this.chartOptions.series.push({
            data: vista,
            name: 'Causas vistas promedio por salas ',
            color: '#1ABB9C'
          })

          this.chartOptions.series.push({
            data: no_vista,
            name: 'Causas no vistas promedio por salas ',
            color: '#2A3F54'
          })
        } catch (error) {
          console.log(error)
        }
      }

      get(ing_url)
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
