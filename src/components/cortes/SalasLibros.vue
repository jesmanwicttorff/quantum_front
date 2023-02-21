<template>
    <div class="container-fluid" >
        <div class="col-xs-12 col-md-12">
			<v-row>
				<v-col md="6">
					<h3>Cortes de Apelaciones</h3>
                    <span class="pull-right">Periodo de Análisis: {{this.dateRange[0]}} al {{this.dateRange[1]}} </span>
				</v-col>
				<v-col md="6">
					<v-btn  color="primary" :href="this.urlquauntum" style="float:right;text-decoration:none">Volver</v-btn>   
				</v-col>
			</v-row>
            <div class="col-xs-12 col-md-12" style="background: #f7f7f7">
				<v-row>
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
            </div>
			<div>
				<v-row>
					<v-col md="12">
						<highcharts :options="chartOptions" :constructor-type="'chart'" />
					</v-col>
				</v-row>
				<v-row>
					<v-col md="4" sm="12">
						<highcharts :options="chartOptions2" :constructor-type="'chart'" />
					</v-col>
					<v-col md="4" sm="12">
						<highcharts :options="chartOptions3" :constructor-type="'chart'" />
					</v-col>
					<v-col md="4" sm="12">
						<highcharts :options="chartOptions4" :constructor-type="'chart'" />
					</v-col>
				</v-row>
			</div>
            <div class="col-xs-12 col-md-12 table-responsive" style="background: #f7f7f7">
                <br>
                <table class="table table-sm">
                    <thead >
                        <tr>
                        <th scope="col">Libro</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in divTable" :key="item.libro">
                            <template>
                                <td >{{ item.libro }}</td>
                                <td >{{ item.cantidad }}</td>
                                <td >{{ item.porcentaje }}</td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-xs-12 col-md-12" style="background: #f7f7f7">
                <br>
                <highcharts :options="chartOptions5" :constructor-type="'chart'" />
                <br>
            </div>
        </div>
    </div>
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

exporting(HighCharts)

export default {
  name: 'SalasLibros',
  data () {
    return {
		urlquauntum: '',
      startVal: 0,
      endVal: [0, 0, 0],
      endVal2: [0, 0, 0],
      divTable: [],
      dateRange: [this.setYear(1), this.setYear(0)],
      selected: 90,
      msg: 'hola',
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
          text: 'Promedio mensual de causa vista y no vistas por sala Ultimos 12 meses'
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
          type: 'pie',
          renderTo: 'chart'
        },
        title: {
          text: 'Estado de causas vistas',
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
      },
      chartOptions3: {
        chart: {
          type: 'pie',
          renderTo: 'chart'
        },
        title: {
          text: 'Estado de causas no vistas',
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
      },
      chartOptions4: {
        chart: {
          type: 'pie',
          renderTo: 'chart'
        },
        title: {
          text: 'Causas vistas por libro',
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
      },
      chartOptions5: {
        chart: {
          type: 'column',
          renderTo: 'chart'
        },
        title: {
          text: 'Carga de trabajo por salas'
        },
        accessibility: {
          announceNewData: {
            enabled: true
          }
        },
        xAxis: {
          type: 'category',
          categories: [],
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
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
          shared: true
        },
        credits: false,
        plotOptions: {
          column: {
            stacking: 'percent'
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
      this.chartOptions4.series = []
      this.chartOptions5.series = []
      this.chartOptions5.xAxis.categories = []

      const axios = require('axios')
      const ing_url = url + '/apelaciones/cortesSalasCantidades'
      const ing_lib = url + '/apelaciones/cortesTablasEstados'
      const ter_url = url + '/apelaciones/cortesTablasEstadosNoVistas'
      const ing_lib_v2 = url + '/apelaciones/cortesTablasLibrosVistas'
      const ing_sala_lib = url + '/apelaciones/cortesTablasSalasVistas'

      const promedio_vista = []
      const promedio_no_vista = []
      const tabla_estado = []
      const tabla_estado_no_vista = []
      const tabla_estado_libros = []
      let cantidad_estado_otros = 0
      const ingresos_lib = []
      const ingresos_lib_totales = []
      let ingresos_lib_aux = 0
      let cantidad = []
      let libro = ''
      const sala = []

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
        }),
        axios.get(ing_sala_lib, {
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
        const data5 = responses[4].data

        Object.values(data1.recordset).map((type) => {
          promedio_vista.push({ name: type.sala, y: Math.round(type.promedio_vista) })
          promedio_no_vista.push({ name: type.sala, y: Math.round(type.promedio_no_vista) })
        })

        Object.values(data2.recordset).map((type) => {
          if (Number(type.correlativo) <= 4) {
            tabla_estado.push({ name: type.estado_tabla, y: Math.round(type.vista) })
          } else {
            cantidad_estado_otros += type.vista
          }
        })

        tabla_estado.push({ name: 'Otros', y: Math.round(cantidad_estado_otros) })

        cantidad_estado_otros = 0

        Object.values(data3.recordset).map((type) => {
          if (Number(type.correlativo) <= 4) {
            tabla_estado_no_vista.push({ name: type.estado_tabla, y: Math.round(type.vista) })
          } else {
            cantidad_estado_otros += type.vista
          }
        })

        tabla_estado_no_vista.push({ name: 'Otros', y: Math.round(cantidad_estado_otros) })

        cantidad_estado_otros = 0

        Object.values(data4.recordset).map((type) => {
          ingresos_lib_totales.push({ name: type.gls_libro, cantidad: Math.round(type.vista) })
          ingresos_lib_aux += type.vista

          if (Number(type.correlativo) <= 4) {
            tabla_estado_libros.push({ name: type.gls_libro, y: Math.round(type.vista) })
          } else {
            cantidad_estado_otros += type.vista
          }
        })

        tabla_estado_libros.push({ name: 'Otros', y: Math.round(cantidad_estado_otros) })

        ingresos_lib_totales.forEach(element => {
          this.divTable.push({ libro: element.name, cantidad: this.thousandSeprator(element.cantidad), porcentaje: Math.round((element.cantidad * 100) / ingresos_lib_aux) })
        })

        this.divTable.push({ libro: 'Total', cantidad: this.thousandSeprator(ingresos_lib_aux), porcentaje: '100%' })

        Object.values(data5.recordset).map((type) => {
          if (libro != '' && libro != type.libro) {
            this.chartOptions5.series.push({ name: libro, data: cantidad })
            cantidad = []
          }

          if (this.chartOptions5.xAxis.categories.includes(type.sala) === false) {
            this.chartOptions5.xAxis.categories.push(type.sala)
          }

          libro = type.libro
          cantidad.push(type.vista)
        })

        this.chartOptions.series.push({
          data: promedio_vista,
          name: 'Promedio mensual de causas vistas por salas',
          color: '#1ABB9C'
        })

        this.chartOptions.series.push({
          data: promedio_no_vista,
          name: 'Promedio mensual de causas no vistas por salas',
          color: '#2A3F54'
        })

        this.chartOptions2.series.push({
          data: tabla_estado,
          name: 'Estado causas Vistas'
        })

        this.chartOptions3.series.push({
          data: tabla_estado_no_vista,
          name: 'Estado causas No Vistas'
        })

        this.chartOptions4.series.push({
          data: tabla_estado_libros,
          name: 'Estado causas No Vistas'
        })

        this.chartOptions4.series.push({
          data: tabla_estado_libros,
          name: 'Estado causas No Vistas'
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
    },
    setYear (year) {
      var value = new Date()
      var date = value.getDate()
      var month = value.getMonth() + 1
      var year = value.getFullYear() - year
      var dateOutput = year + '-' + month + '-' + date
      return dateOutput
    }
  },
  components: {
    highcharts: Chart,
    countTo,
    url,
    RightSidebar,
    DatePicker
  }
}
</script>
