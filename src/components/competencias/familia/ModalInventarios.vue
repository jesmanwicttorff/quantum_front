<template>
    <b-container fluid class="px-4">
        <b-modal id="modal-inventario" size="xl" title="Inventario" ok-only>
            <b-container  fluid="xs" class="px-0 py-4">
                <b-col sm="12" md="12" class="my-2">
                    <b-form-group
                    label="Filtrar En"
                    label-cols-sm="3"
                    label-align-sm="left"
                    label-size="sm"
                    description="Deje todo sin marcar para filtrar todos los datos"
                    class="mb-0">
                        <b-form-checkbox-group v-model="filterOn" class="mt-1">
                            <b-form-checkbox value="gls_tipo_causa">Tipo Causa</b-form-checkbox>
                            <b-form-checkbox value="ano">Año</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>            
                    <b-form-group
                    label="Filtros"
                    label-cols-sm="3"
                    label-align-sm="left"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-0 py-2"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                            v-model="filter"
                            type="search"
                            id="filterInput"
                            placeholder="Busqueda"
                            ></b-form-input>
                            <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <b-col class="my-2 py-2" >
                    <b-form-group
                        label="Por página"
                        label-cols-sm="6"
                        label-cols-md="4"
                        label-cols-lg="3"
                        label-align-sm="left"
                        label-size="sm"
                        label-for="perPageSelect"
                        class="mb-0"
                    >
                        <b-form-select
                            v-model="perPage"
                            id="perPageSelect"
                            size="sm"
                            :options="pageOptions"
                        ></b-form-select>
                    </b-form-group>
                </b-col>  
                <vue-excel-xlsx class="my-2 btn btn-info"
                :data="data"
                :columns="columns"
                :filename="'Inventario'"
                :sheetname="'Hoja1'"
                >
                <b-icon-cloud-download>     
                </b-icon-cloud-download>
                </vue-excel-xlsx>
                <b-table striped hover bordered small class="text-center"
                :items="items" 
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                >
                    <template v-slot:row-details="row">
                        <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key" >{{ key }}: {{ value }}</li>
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
        </b-modal>
    </b-container>
</template>


<script>

import Vue from 'vue'
import { mapState } from 'vuex'
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
    name: "ModalEscritos",
    data(){
        return{
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            fechas: [],
            fields: [
                {
                    key: 'rit',
                    label: 'Rit',
                    sortable: true
                },
                {
                    key: 'fec_ingreso',
                    label: 'Fecha Ingreso',
                    sortable: true
                },
                {
                    key: 'gls_estprocesal',
                    label: 'Estado Procesal',
                    // sortable: true
                },
                {
                    key: 'gls_tipcausa',
                    label: 'Tipo Causa',
                    // sortable: true
                },
                {
                    key: 'ano',
                    label: 'Año',
                    // sortable: true
                },
                {
                    key: 'mes',
                    label: 'Mes',
                    // sortable: true
                }                                                                                                                                                                                
            ],            
            columns : [
                {
                    field: 'rit',
                    label: 'Rit',
                    sortable: true
                },
                {
                    field: 'fec_ingreso',
                    label: 'Fecha Ingreso',
                    sortable: true
                },
                {
                    field: 'gls_estprocesal',
                    label: 'Estado Procesal',
                    // sortable: true
                },
                {
                    field: 'gls_tipcausa',
                    label: 'Tipo Causa',
                    // sortable: true
                },
                {
                    field: 'ano',
                    label: 'Año',
                    // sortable: true
                },
                {
                    field: 'mes',
                    label: 'Mes'
                    // sortable: true
                }          
            ],            
            totalRows: 1,
            currentPage: 1,
            perPage: 12,
            pageOptions: [12, 24, 78],
            filter: null,
            filterOn: [],    
            items: [],
            data : []                     
        }
    },
    props: ['option'],
    mounted(){
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            if(modalId == 'modal-inventario'){
                this.fechas = this.$setDate(1); // Menos tres
                const axios = require('axios')
                const req1 = url + '/familia/inventariosEstadosDetalles'
                axios.all([
                    axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal
                    }
                    })
                ]).then(axios.spread((...responses) => {  
                    
                    const inventariosEstadosDetalles = responses[0].data

                    Object.values(inventariosEstadosDetalles.recordset).map((type) => {
                        this.items.push({ isActive: true, rit: type.rit, fec_ingreso: type.fec_ingreso, gls_estprocesal: type.gls_estprocesal,
                                        gls_tipcausa: type.gls_tipcausa, ano: type.ano, mes: type.mes });
                        this.data.push({ rit: type.rit, fec_ingreso: type.fec_ingreso, gls_estprocesal: type.gls_estprocesal,
                                        gls_tipcausa: type.gls_tipcausa, ano: type.ano, mes: type.mes });
                    })    
                    
                    this.totalRows = this.items.length;
                    this.$forceUpdate()

                })).catch(errors => {

                })
            
            }
      
        })

        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            console.log('Modal is about to be close', bvEvent, modalId)
        })   
            
    },
    components: {
        highcharts: Chart,
        Bigtooltip
    },
    
}
</script>

<style>
/* .modal-lg {
    max-width: auto !important;
   } */
</style>