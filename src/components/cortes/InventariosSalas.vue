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
            <b-col sm="4">
              <span class="count_top">Total Ingresos</span>
              <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>
            </b-col>
            <b-col sm="4">
              <span class="count_top">Total sin PR16</span>
              <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>
            </b-col>
            <b-col sm="4">
              <span class="count_top">Total PR16</span>
              <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></b-col>                  
            </b-col>
          </b-row>
        </b-container>
        <br>
        <b-container>
          <h3>Cortes de Apelaciones</h3>
        </b-container>
        <b-container>
          <br>
          <highcharts :options="chartOptions" :constructor-type="'chart'" />
          <br>
        </b-container>
        <b-container>
          <br>
          <highcharts :options="chartOptions2" :constructor-type="'chart'" />
          <br>
        </b-container>
        <b-container>
          <br>
          <highcharts :options="chartOptions3" :constructor-type="'chart'" />
          <br>
        </b-container>
      </b-container>
    </b-container>
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
  name: 'Ingresos',
  data () {
    return {
		urlquauntum: '',
      change: false,
      startVal: 0,
      endVal: [0, 0, 0],
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Inventario Cortes Apelaciones de 1 Sala Ordinaria'
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
          text: 'Inventario Cortes Apelaciones de 2 Sala Ordinarias'
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
      chartOptions3: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Inventario Cortes Apelaciones de 5 Sala Ordinarias'
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
  computed: {
    ...mapState([
      'active'
    ])
  },
  watch: {
    active () {
      this.change = true
      this.update(this.dateRange)
    }
  },
  methods: {
    requestData: function (dateRange) {
      this.dateRange = dateRange
      this.chartOptions.series = []
      this.chartOptions2.series = []
      this.chartOptions3.series = []

      const axios = require('axios')
      const ing_url = url + '/apelaciones/cortesInventariosSalas'

      const get = async ing_url => {
        try {
          const response = await axios.get(ing_url, {
            params: {
              dateRange: this.dateRange
            }
          })
          const data = response.data

          const inventarios_salas1_anterior = []
          const inventarios_salas1_actual = []

          const inventarios_salas2_anterior = []
          const inventarios_salas2_actual = []

          const inventarios_salas3_anterior = []
          const inventarios_salas3_actual = []

          Object.values(data.recordset).map((type) => {
            if (type.salas == 1) {
              inventarios_salas1_anterior.push({ name: type.gls_corte, y: (type.cantidad_anterior) })
              inventarios_salas1_actual.push({ name: type.gls_corte, y: (type.cantidad_actual) })
              this.endVal[0] += (type.cantidad_anterior)
            } else if (type.salas == 2) {
              inventarios_salas2_anterior.push({ name: type.gls_corte, y: (type.cantidad_anterior) })
              inventarios_salas2_actual.push({ name: type.gls_corte, y: (type.cantidad_actual) })
              this.endVal[1] += (type.cantidad_anterior)
            } else {
              inventarios_salas3_anterior.push({ name: type.gls_corte, y: (type.cantidad_anterior) })
              inventarios_salas3_actual.push({ name: type.gls_corte, y: (type.cantidad_actual) })
              this.endVal[2] += (type.cantidad_anterior)
            }
          })

          this.chartOptions.series.push({
            data: inventarios_salas1_anterior,
            name: 'Inventario Anterior',
            color: '#1ABB9C'
          })

          this.chartOptions.series.push({
            data: inventarios_salas1_actual,
            name: 'Inventario Actual',
            color: '#2A3F54'
          })

          this.chartOptions2.series.push({
            data: inventarios_salas2_anterior,
            name: 'Inventario Anterior',
            color: '#1ABB9C'
          })

          this.chartOptions2.series.push({
            data: inventarios_salas2_actual,
            name: 'Inventario Actual',
            color: '#2A3F54'
          })

          this.chartOptions3.series.push({
            data: inventarios_salas3_anterior,
            name: 'Inventario Anterior',
            color: '#1ABB9C'
          })

          this.chartOptions3.series.push({
            data: inventarios_salas3_actual,
            name: 'Inventario Actual',
            color: '#2A3F54'
          })

          this.$forceUpdate()
        } catch (error) {
          console.log(error)
        }
      }

      get(ing_url)
    },
    update (value) {
      this.startVal = 0
      this.endVal = [0, 0, 0]
      this.requestData(value)
    },
    settingDate (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
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
