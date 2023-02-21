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
            <span class="count_top">Total Terminos</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>
          </b-col>
                  
          <b-col sm="4">
            <span class="count_top">Total sin PR16</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>
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
      <b-container class="px-4">
        <span style="float:right">Periodo de Análisis: {{this.settingDate(this.dateRange[0])}} al {{this.settingDate(this.dateRange[1])}} </span>
        <b-icon icon="info-circle-fill" scale="2" variant="info" id="ayuda"></b-icon>
        <Bigtooltip v-bind:text="text[0]"/>
      </b-container>

      <b-container>
        <br>
        <highcharts :options="chartOptions" :constructor-type="'chart'" />
        <br>
      </b-container>
      <b-container>
        <br>
        <span class="glyphicon glyphicon-question-sign" id="ayuda" style="font-size:250%;color:#FF8000;"></span>
        <Bigtooltip v-bind:text="text[1]"/>
      </b-container>
      <b-container>
        <br>
        <highcharts  :options="chartOptions2" :constructor-type="'chart'"/>
        <br>
      </b-container>
      <b-container>
        <br>
        <span class="glyphicon glyphicon-question-sign" id="ayuda" style="font-size:250%;color:#FF8000;"></span>
        <Bigtooltip v-bind:text="text[2]"/>
      </b-container>
      <b-container>
        <br>
        <highcharts  :options="chartOptions3" :constructor-type="'chart'"/>
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
import Bigtooltip from '../elementos/Bigtooltip'

exporting(HighCharts)

export default {
  name: 'Terminos',
  data () {
    return {
		urlquauntum: '',
      change: false,
      startVal: 0,
      endVal: [0, 0, 0],
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      text: [
        'Se visualiza el total de recursos terminados por Cortes',
        'Se visualiza el total de recursos terminados por Cortes, sin contar recursos “Protección-Isapre adecuación” y “Pleno y otros adm”',
        'Se visualiza el total de recursos terminados por Cortes contando solo  “Protección-Isapre adecuación” y “Pleno y otros adm”'
      ],
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Terminos Totales',
          align: 'left'
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
          text: 'Terminos Sin PR16',
          align: 'left'
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
          text: 'Terminos PR16',
          align: 'left'
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
      const ter_url = url + '/apelaciones/cortesTerminosAnuales'

      const get = async ter_url => {
        try {
          const response = await axios.get(ter_url, {
            params: {
              dateRange: this.dateRange
            }
          })
          const data = response.data

          const terminos = []
          const sinpr16 = []
          const pr16 = []

          Object.values(data.recordset).map((type) => {
            terminos.push({ name: type.gls_corte, y: (type.cantidad + type.cantidad_pr) })
            sinpr16.push({ name: type.gls_corte, y: type.cantidad })
            pr16.push({ name: type.gls_corte, y: type.cantidad_pr })
            this.endVal[0] += (type.cantidad + type.cantidad_pr)
            this.endVal[1] += type.cantidad
            this.endVal[2] += type.cantidad_pr
          })

          this.chartOptions.series.push({
            data: terminos,
            name: 'Terminos Totales',
            color: '#1ABB9C'
          })

          this.chartOptions2.series.push({
            data: sinpr16,
            name: 'Terminos sin PR16',
            color: '#1ABB9C'
          })

          this.chartOptions3.series.push({
            data: pr16,
            name: 'Terminos PR16',
            color: '#2A3F54'
          })

          this.$forceUpdate()
        } catch (error) {
          console.log(error)
        }
      }

      get(ter_url)
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
    RightSidebar,
    Bigtooltip
    //  QuickSettings,
    //  RecentActivities,
    //  TodoList
  }
}
</script>
