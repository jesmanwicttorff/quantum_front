<template>
  <b-container fluid>
    <!---<RightSidebar @clicked="update" v-bind:dateRange="dateRange" /> -->
    <b-container>
		<v-row>
			<v-col md="12">
				<v-btn  color="primary" :href="this.urlquauntum" style="float:right;text-decoration:none">Volver</v-btn>   
			</v-col>
		</v-row>
      <b-container class="tile_count">
        <b-row class="tile_stats_count">
          <b-col sm="2">
            <span class="count_top">Total Ingresos</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>
          </b-col>
                  
          <b-col sm="2">
            <span class="count_top">Ingresos Sin PR16</span>
            <b-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>
          </b-col>

          <b-col sm="2">
            <span class="count_top">Ingresos PR16</span>
            <b-col class="count"><countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></b-col>                  
          </b-col>

          <b-col sm="2">
            <span class="count_top">Total Terminos</span>
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
      	<br>
		<b-container>
			<h3>Cortes de Apelaciones</h3>
		</b-container>
		<br>
		<v-row>
			<v-col md="6" sm="12">
				<b-form-group id="lblCortes" label="Cortes" label-for="Cortes">
					<b-form-select  id="Cortes" v-model="selected">
						<option v-for="option in options" :key="option.value" v-bind:value="option.value">
						{{ option.text }}
						</option>
					</b-form-select>
				</b-form-group>
			</v-col>
			<v-col  md="6" sm="12">
				<button @click="update(this.dateRange)" type="button" class="btn btn-info mt-7">
					Actualizar
				</button>
			</v-col>
		</v-row>
		<b-container>
			<br>
			<highcharts :options="chartOptions" :constructor-type="'chart'" />
			<br>
		</b-container>

      <b-container>
        <br>
        <highcharts :options="chartOptions3" :constructor-type="'chart'" />
        <br>
      </b-container>

      <b-container>
        <br>
        <highcharts :options="chartOptions2" :constructor-type="'chart'" />
        <br>
      </b-container>

      <b-container>
        <b-table striped hover :items="divTable"></b-table>
      </b-container>



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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/es'
import Bigtooltip from '../elementos/Bigtooltip'

exporting(HighCharts)

export default {
  name: 'IngresosTerminosComparativas',
  data () {
    return {
		urlquauntum: '',
      startVal: 0,
      endVal: [0, 0, 0],
      endVal2: [0, 0, 0],
      divTable: [],
      dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
      selected: 0,
      options: [
        { text: 'Todas', value: 0 },
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
      text: [
        'Se visualiza el total de recursos ingresos vs recursos terminados por cortes'
      ],
      position: 'right:0;',
      chartOptions: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Ingresos Vs Terminos Sin PR16'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
          decimalPoint: ','
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
          text: 'Ingresos Vs Terminos PR16'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
          type: 'pie',
          renderTo: 'chart'
        },
        title: {
          text: 'Ingresos Libros'
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
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
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
    this.update(this.dateRange, this.selected)
  },
  mounted () {
  },
  methods: {
    requestData: function (dateRange, selected) {
      this.dateRange = dateRange
      this.chartOptions.series = []
      this.chartOptions2.series = []
      this.chartOptions3.series = []

      const axios = require('axios')
      const ing_url = url + '/apelaciones/cortesIngresosMeses'
      const ing_lib = url + '/apelaciones/cortesIngresosLibrosAgrupados'
      const ter_url = url + '/apelaciones/cortesTerminosMeses'
      const ing_lib_v2 = url + '/apelaciones/cortesIngresosLibros'

      const ingresos = []
      const terminos = []
      const ingresos_pr = []
      const terminos_pr = []

      const ingresos_lib = []
      const ingresos_lib_totales = []
      let ingresos_lib_aux = 0

      axios.all([
        axios.get(ing_url, {
          params: {
            dateRange: this.dateRange,
            cod_corte: this.selected
          }
        }),
        axios.get(ing_lib, {
          params: {
            dateRange: this.dateRange,
            cod_corte: this.selected

          }
        }),
        axios.get(ter_url, {
          params: {
            dateRange: this.dateRange,
            cod_corte: this.selected
          }
        }),
        axios.get(ing_lib_v2, {
          params: {
            dateRange: this.dateRange,
            cod_corte: this.selected
          }
        })
      ]).then(axios.spread((...responses) => {
        const data1 = responses[0].data
        const data2 = responses[1].data
        const data3 = responses[2].data
        const data4 = responses[3].data

        Object.values(data1.recordset).map((type) => {
          ingresos.push({ y: Math.round(type.cantidad) })
          ingresos_pr.push({ y: Math.round(type.cantidad_pr) })
          this.endVal[0] += type.cantidad + type.cantidad_pr
          this.endVal[1] += type.cantidad
          this.endVal[2] += type.cantidad_pr
        })

        Object.values(data2.recordset).map((type) => {
          ingresos_lib.push({ name: type.libro, y: Math.round(type.cantidad) })
        })

        Object.values(data3.recordset).map((type) => {
          terminos.push({ y: Math.round(type.cantidad) })
          terminos_pr.push({ y: Math.round(type.cantidad_pr) })
          this.endVal2[0] += type.cantidad + type.cantidad_pr
          this.endVal2[1] += type.cantidad
          this.endVal2[2] += type.cantidad_pr
        })

        Object.values(data4.recordset).map((type) => {
          ingresos_lib_totales.push({ name: type.libro, cantidad: Math.round(type.cantidad) })
          ingresos_lib_aux += type.cantidad
        })

        ingresos_lib_totales.forEach(element => {
          this.divTable.push({ libro: element.name, cantidad: this.thousandSeprator(element.cantidad), porcentaje: Math.round((element.cantidad * 100) / ingresos_lib_aux) })
        })

        this.divTable.push({ libro: 'Total', cantidad: this.thousandSeprator(ingresos_lib_aux), porcentaje: '100%' })

        for (let index = ingresos.length; index <= 11; index++) {
          ingresos.push({ y: 0 })
        }

        for (let index = terminos.length; index <= 11; index++) {
          terminos.push({ y: 0 })
        }

        for (let index = ingresos_pr.length; index <= 11; index++) {
          ingresos_pr.push({ y: 0 })
        }

        for (let index = terminos_pr.length; index <= 11; index++) {
          terminos_pr.push({ y: 0 })
        }

        this.chartOptions.series.push({
          data: ingresos,
          name: 'Ingresos',
          color: '#1ABB9C'
        })

        this.chartOptions.series.push({
          data: terminos,
          name: 'Terminos',
          color: '#2A3F54'
        })

        this.chartOptions2.series.push({
          data: ingresos_pr,
          name: 'Ingresos',
          color: '#1ABB9C'
        })

        this.chartOptions2.series.push({
          data: terminos_pr,
          name: 'Terminos',
          color: '#2A3F54'
        })

        this.chartOptions3.series.push({
          data: ingresos_lib,
          name: 'Ingresos Libros',
          color: '#1ABB9C'
        })

        this.$forceUpdate()
      })).catch(errors => {

      })
    },
    selectNextWeek (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      const date = [start, end]
      emit(date)
    },
    selectNextMonth (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 30)
      const date = [start, end]
      emit(date)
    },
    selectNextSixMonth (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 60)
      const date = [start, end]
      emit(date)
    },
    update () {
      this.startVal = 0
      this.endVal = [0, 0, 0]
      this.endVal2 = [0, 0, 0]
      this.divTable = []
      this.requestData(this.dateRange, this.selected)
    },
    thousandSeprator (amount) {
      if (amount !== '' || amount !== undefined || amount !== 0 || amount !== '0' || amount !== null) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    }
  },
  components: {
    highcharts: Chart,
    countTo,
    url,
    RightSidebar,
    DatePicker,
    Bigtooltip
  }
}
</script>
