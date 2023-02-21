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
          <b-col sm="2">
            <span class="count_top">Ingresos</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>
          </b-col>
                  
          <b-col sm="2">
            <span class="count_top">Ingresos sin PR16</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>
          </b-col>

          <b-col sm="2">
            <span class="count_top">Ingresos PR16</span>
            <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></b-col>                  
          </b-col>

          <b-col sm="2">
            <span class="count_top">Terminos</span>
            <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal2[0]" separator="." :duration="3000"></countTo></b-col>                  
          </b-col>

           <b-col sm="2">
            <span class="count_top">Terminos Sin PR16</span>
            <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal2[1]" separator="." :duration="3000"></countTo></b-col>                  
          </b-col>

          <b-col sm="2">
            <span class="count_top">Terminos PR16</span>
            <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal2[2]" separator="." :duration="3000"></countTo></b-col>                  
          </b-col>
        </b-row>
      </b-container>
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
    <b-container class="px-4">
      <b-icon icon="info-circle-fill" scale="2" variant="info" id="ayuda"></b-icon>
      <Bigtooltip v-bind:text="text[1]"/>
    </b-container>
      <b-container>
        <br>
        <highcharts  :options="chartOptions2" :constructor-type="'chart'"/>
        <br>
      </b-container>
      <b-container class="px-4">
        <b-icon icon="info-circle-fill" scale="2" variant="info" id="ayuda"></b-icon>
        <Bigtooltip v-bind:text="text[2]"/>
      </b-container>
      <b-container>
        <br>
        <highcharts  :options="chartOptions3" :constructor-type="'chart'"/>
        <br>
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
      endVal2: [0, 0, 0],
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      text: [
        'Se visualiza el total de recursos ingresos vs recursos terminados por cortes',
        'Se visualiza el total de recursos ingresos vs recursos terminados por cortes, sin contar recursos “Protección-Isapre adecuación” y “Pleno y otros adm”',
        'Se visualiza el total de recursos ingresos vs recursos terminados por cortes, contando solo  “Protección-Isapre adecuación” y “Pleno y otros adm”'
      ],
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Ingresos Vs Terminos'
					   
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
          text: 'Ingresos Vs Terminos sin PR16'
					   
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
          text: 'Ingresos Vs Terminos PR16'
					   
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
    this.update(this.dateRange)
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
      const ing_url = url + '/apelaciones/cortesIngresosCantidades'
      const ter_url = url + '/apelaciones/cortesTerminosAnuales'
      const ingresos_totales = []
      const terminos_totales = []
      const ingresos = []
      const terminos = []
      const ingresos_pr = []
      const terminos_pr = []

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
          ingresos_totales.push({ name: type.gls_corte, y: Math.round(type.cantidad + type.cantidad_pr) })
          ingresos.push({ name: type.gls_corte, y: Math.round(type.cantidad) })
          ingresos_pr.push({ name: type.gls_corte, y: Math.round(type.cantidad_pr) })
          this.endVal[0] += Math.round(type.cantidad + type.cantidad_pr)
          this.endVal[1] += Math.round(type.cantidad)
          this.endVal[2] += Math.round(type.cantidad_pr)
        })

        Object.values(data2.recordset).map((type) => {
          terminos_totales.push({ name: type.gls_corte, y: Math.round(type.cantidad + type.cantidad_pr) })
          terminos.push({ name: type.gls_corte, y: Math.round(type.cantidad) })
          terminos_pr.push({ name: type.gls_corte, y: Math.round(type.cantidad_pr) })
          this.endVal2[0] += Math.round(type.cantidad + type.cantidad_pr)
          this.endVal2[1] += Math.round(type.cantidad)
          this.endVal2[2] += Math.round(type.cantidad_pr)
        })

        this.chartOptions.series.push({
          data: ingresos_totales,
          name: 'Ingresos',
          color: '#1ABB9C'
        })

        this.chartOptions.series.push({
          data: terminos_totales,
          name: 'Terminos',
          color: '#2A3F54'
        })

        this.chartOptions2.series.push({
          data: ingresos,
          name: 'Ingresos',
          color: '#1ABB9C'
        })

        this.chartOptions2.series.push({
          data: terminos,
          name: 'Terminos',
          color: '#2A3F54'
        })

        this.chartOptions3.series.push({
          data: ingresos_pr,
          name: 'Ingresos',
          color: '#1ABB9C'
        })

        this.chartOptions3.series.push({
          data: terminos_pr,
          name: 'Terminos',
          color: '#2A3F54'
        })

        this.$forceUpdate()
      })).catch(errors => {

      })
    },
    update (value) {
      this.startVal = 0
      this.endVal = [0, 0, 0]
      this.endVal2 = [0, 0, 0]
      this.requestData(value)
	  
						
																					
    },
    settingDate (date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
  },
  components: {
					 
					  
    highcharts: Chart,
    countTo,
    url,
    RightSidebar,
    Bigtooltip
					  
						 
				
  }
}
</script>
