<template>
    <b-container fluid class="px-4">
        <b-modal id="modal-resoluciones" size="xl" title="Resoluciones por Tipo" ok-only>
            <b-tabs content-class="mt-3" align="center" >
                <b-tab title="Tipos" active>
                    <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
                        <b-row class="ml-4">
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                        </b-row>
                        <highcharts :options="chartOptions" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option != 1"/> 
                        <highcharts :options="chartOptionsTorta" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option == 1"/> 
                    <ModalLoading/> 
                    </b-card>                    
                </b-tab>
                <b-tab title="Detalle">
                    <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
                        <b-row class="ml-4">
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                        </b-row>
                    </b-card>                     
                    <b-container class="px-0 py-4">
                        <vue-excel-xlsx class="my-2 btn btn-info"
                                        :data="dataRes"
                                        :columns="columnsRes"
                                        :filename="'Resoluciones'"
                                        :sheetname="'Hoja1'"
                        >
                            <b-icon-cloud-download>     
                            </b-icon-cloud-download>
                        </vue-excel-xlsx>
                        <b-table striped hover bordered small 
                        :items="itemsRes" 
                        :fields="fieldsRes"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filterIncludedFields="filterOn"
                        >
                            <template v-slot:row-details="row">
                                <b-card>
                                <ul>
                                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
                                </ul>
                                </b-card>
                            </template>        
                        </b-table>
                        <b-col class="px-0">
                            <b-pagination
                                v-model="currentPage"
                                :total-rows="totalRows"
                                :per-page="perPage"
                                align="fill"
                                size="sm"
                                class="my-0"
                            ></b-pagination>
                        </b-col>
                        <template v-slot:cell(name)="row">
                            {{ row.value.first }} {{ row.value.last }}
                        </template>    
                    </b-container>    
                </b-tab> 
            </b-tabs>               
        </b-modal>
    </b-container>
</template>


<script>

import Vue from 'vue'
import ModalLoading from '../../../components/elementos/ModalLoading'
import countTo from 'vue-count-to'
import { mapState,  mapMutations } from 'vuex'
import HighCharts from 'highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import stockInit from 'highcharts/modules/stock'
import Bigtooltip from '../../../components/elementos/Bigtooltip'
import store from 'store'
import { url, report } from '../../../config/api'

stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: "ModalResoluciones",
    data(){
        return{
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            filterOn: [],  
            filter: null,
            items: [],
            itemsRes: [],
            perPage: 10,
            pageOptions: [10, 20, 30],
            fieldsRes: [],
            dataRes: [],
            currentPage: 1,
            totalRows: 1,
            columnsRes: [
                {
                    field: 'idf_nombres',
                    label: 'Nombre'
                },
                {
                    field: 'idf_paterno',
                    label: 'Ap Paterno'
                },
                {
                    field: 'idf_materno',
                    label: 'Ap Materno'
                },
                {
                    field: 'rit',
                    label: 'Rit'
                },
                {
                    field: 'ruc',
                    label: 'Ruc'
                },
                {
                    field: 'fecha_tramite',
                    label: 'Fecha Tramite'
                },
                {
                    field: 'fecha_firma',
                    label: 'Fecha Firma'
                },
                {
                    field: 'hora',
                    label: 'Hora'
                },
                {
                    field: 'gls_tipo_causa',
                    label: 'Tipo Causa'
                },
                {
                    field: 'procedimiento',
                    label: 'Nomenclatura'
                }
            ],
            chartOptions: {
                chart: {
                        borderColor: '#2979ff',
                        borderWidth: 2,
                        borderRadius: '10',                            
                        type: 'column',
                        height: 600,
                        renderTo: 'chart'
                },
                title: {
                    text: ''
                },
                accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                xAxis: {
                    type: 'category',
                    categories: '',//['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
                tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },       
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                        enabled: true
                        }
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
            chartOptionsTorta: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    minHeight: 600,
                    height: 600
                },
                title: {
                    text: ''
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
                        }
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
    props: ['option'],
     methods:{
         ...mapMutations(['setModal']), // Mutations no Borrar
            ...mapState(['fechas']),
        AgregaOTROS(data1){
                        
        }

    },
    mounted(){
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            if(modalId == 'modal-resoluciones'){
                this.setModal(true)
                this.chartOptionsTorta.series=[]
                this.chartOptions.series = []
                this.chartOptions.xAxis.categories = []      
                this.chartOptions.xAxis.categories = this.fechas().calendario
                const axios = require('axios')
                const req1 = url +  '/familia/resolucionesTipos'
                const req2 = url +  '/familia/resolucionesDetalles'
                let data1 = []
                let data2 = []

                switch(this.option){
                    case 1:
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            })
                            ,axios.get(req2, {
                                 params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin,
                                    funcionarioId: 0
                                }
                            })                   
                        ]).then(axios.spread((...responses) => {

                            data1 = responses[0].data
                            data2 = responses[1].data

                            let resolucionesTipArr = []
                            let resolucionesAux = []
                            let cantidad = 0

                            Object.values(data1.recordset).map((type) => {
                                resolucionesAux.push({ name: type.procedimiento, y: type.cantidad})
                            })

                            resolucionesAux = resolucionesAux.sort(function(a,b){ return(b.y - a.y)})

                            resolucionesAux.forEach(res => {
                                if(resolucionesTipArr.length < 9){
                                    resolucionesTipArr.push({ name: res.name, y: res.y})
                                }else {
                                    cantidad += res.y
                                }
                            });

                            resolucionesTipArr.push({name: 'Otros', y: cantidad})

                            //Grafico torta para escritos causas
                            this.chartOptionsTorta.series.push({
                                name: this.$attrs.title,
                                colorByPoint: true, 
                                data: resolucionesTipArr
                            });


                            //Grilla con datos
                            this.fieldsRes = report['/familia/resolucionesDetalles']
                            this.itemsRes = []
                            this.dataRes = []

                            Object.values(data2.recordset).map((type) => {
                                this.itemsRes.push(type);    
                                this.dataRes.push(type);  
                            })

                            this.totalRows = this.itemsRes.length;
                 

                        })).catch(errors => {
                            console.log(errors);
                        })

                        this.$forceUpdate()
                        break;
                    default:
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            })
                            ,axios.get(req2, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin,
                                    funcionarioId: 0
                                }
                            })                    
                        ]).then(axios.spread((...responses) => {

                            data1 = responses[0].data
                            data2 = responses[1].data
                            let cantidad = []
                            let glosa = ''
                            let aux = 0
                            let arrFecha = []

                            //obtengo el ano y mes para poder crear la categoria OTROS
                            Object.values(data1.recordset).map((type) => {
                                if(arrFecha.length == 0){
                                    arrFecha.push({ ano: type.ano, mes: type.mes})
                                }else {
                                    if(!arrFecha.find(fec => fec.mes == type.mes)) arrFecha.push({ ano: type.ano, mes: type.mes});
                                }
                            })

                            //recorro las fechas con sus respectivos procedimientos ordenados por cantidad, para de esta forma dejar los con mayores cantidades primero
                            let arrCantidad = []
                            let arrOtrosAux = []
                            let sumaCantidadOtros = 0

                            
                            arrFecha.forEach(fecha => {
                                sumaCantidadOtros = 0
                                //ordeno por mes-cantidad
                                arrCantidad = []
                                arrCantidad = Object.values(data1.recordset).filter(res => res.mes == fecha.mes).sort(function(a,b){ return(b.cantidad - a.cantidad)})
                                //cada mes debe tener los 9 procedimientos con mayores cantidades, los sobrantes van a OTROS
                                arrCantidad.forEach(cant => {
                                    //console.log(arrOtrosAux.filter(otr => otr.mes == e.mes).length)
                                    if(arrOtrosAux.filter(otr => otr.mes == cant.mes).length < 9)
                                    {
                                        arrOtrosAux.push({ano: cant.ano, mes: cant.mes, procedimiento: cant.procedimiento, cantidad: cant.cantidad})
                                    }else {
                                        sumaCantidadOtros += cant.cantidad
                                    }
                                });
                                //Una vez tengo los primeros 9 con mayores cantidades, los sobrantes se agrupan en la categoria OTROS
                                arrOtrosAux.push({'ano': fecha.ano, 'mes': fecha.mes, 'procedimiento': 'OTROS', 'cantidad': sumaCantidadOtros})
                                
                            });

                            //Ordeno el array por procedimientos/nomenclaturas
                            let arrProcedimiento  = arrOtrosAux.sort(function(a,b){
                                                                        const bandA = a.procedimiento.toUpperCase();
                                                                        const bandB = b.procedimiento.toUpperCase();
                                                                        let compara = 0;
                                                                        if (bandA > bandB) {
                                                                            compara = 1;
                                                                        } else if (bandA < bandB) {
                                                                            compara = -1;
                                                                        }
                                                                        return compara;
                                                    })

                            //inicializo las cantidades para todos los meses
                            for (let indexcant = 0; indexcant < arrFecha.length; indexcant++) {
                                cantidad[indexcant] = 0
                            }

                            //recorro la data para cargarla al grafico
                            arrProcedimiento.forEach(proc => {
                                    
                                //la posicion a cargar en el arreglo depende del mes para el cual tengo la informacion
                                for (let index = 0; index < arrFecha.length; index++) {
                                    const fechaAux = arrFecha[index];
                                    if(fechaAux.mes == proc.mes){
                                        aux = index //<----- POSICION DEL ARREGLO
                                     }

                                }

                                //consulto por las nomenclaturas/procedimiento ya que mi data viene agrupada por estas.
                                if (glosa != '' && glosa != proc.procedimiento) { 
                                    this.chartOptions.series.push({ name: glosa, data: cantidad }) 
                                    glosa = proc.procedimiento
                                    cantidad = []
                                    for (let indexcant = 0; indexcant < arrFecha.length; indexcant++) {
                                        cantidad[indexcant] = 0
                                    }
                                }   

                                glosa = proc.procedimiento
                                cantidad[aux] = proc.cantidad;

                            })
                            
                            this.chartOptions.series.push({ name: glosa, data: cantidad })

                            //Grilla con datos
                            this.fieldsRes = report['/familia/resolucionesDetalles']
                            this.itemsRes = []
                            this.dataRes = []

                            Object.values(data2.recordset).map((type) => {
                                this.itemsRes.push(type);       
                                this.dataRes.push(type);                                       
                            })

                            this.totalRows = this.itemsRes.length;

                        
                        })).catch(errors => {
                            console.log(errors);
                        })

                        this.$forceUpdate()
                        
                        break;
                }
        
            }
        })

        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            this.setModal(false)
            console.log('Modal is about to be close', bvEvent, modalId)
        })   
            
    },
   
    components: {
        highcharts: Chart,
        Bigtooltip,
        countTo,
         ModalLoading
    },
    
}
</script>

<style>
/* .modal-lg {
    max-width: auto !important;
   } */
</style>