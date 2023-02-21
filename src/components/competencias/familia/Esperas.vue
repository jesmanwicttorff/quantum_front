<template>
  <b-container fluid="xs" class="py-4">  
    <RightSidebar @clicked="update" v-bind:dateRange="dateRange" />
    <b-container  fluid="xs" class="py-2">
        <b-button b-button variant="primary" v-b-toggle.sidebar-right style="float:right;background: #2A3F54">
            <b-icon icon="search"></b-icon>
        </b-button>
    </b-container>    
    <b-container fluid="xs" class="tile_count">
      <b-row  class="tile_stats_count">
        <b-col sm="3" align-v="center">
          <span>Total Ambulatorios</span>
          <b-col class="count"><countTo class="count green--text" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>
        </b-col>
        <b-col sm="3" align-v="center">
            <span class="count_top">Total Fae-Fas</span>
            <b-col class="count"><countTo class="count green--text" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>
        </b-col>
        <b-col sm="3" align-v="center">
            <span class="count_top">Residenciales</span>
            <b-col class="count"><countTo class="count green--text" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></b-col>                  
        </b-col>
        <b-col sm="3" style="text-align: center;">
            <span class="count_top">Total</span>
            <b-col class="count"><countTo class="count green--text" :startVal="startVal" :endVal="endVal[3]" separator="." :duration="3000"></countTo></b-col>                  
        </b-col>        
      </b-row>
    </b-container>
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
                    <b-form-checkbox value="rit">Rit</b-form-checkbox>
                    <b-form-checkbox value="fecha_resolucion">Fec. Resolución</b-form-checkbox>
                    <b-form-checkbox value="descripcion">Tipo</b-form-checkbox>
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
                    <b-button :disabled="!filter" @click="limpiar()">Limpiar</b-button>
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
      <downloadexcel class="my-2 btn btn-primary"
                  :data="arraynew"
                  :fields="excelHead"
				          :before-generate = "startDownload"
                   name="Infancia_Espera.xls"
                   worksheet="'Hoja1'"
              >
          <b-icon-cloud-download>     
          </b-icon-cloud-download>
      </downloadexcel>
        <b-table striped hover bordered small 
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
  </b-container>
</template>
<script>
import Vue from 'vue'
import { url } from '../../../config/api'
import store from 'store'
import countTo from 'vue-count-to'
import VueCarousel from '@chenfengyuan/vue-carousel'
import RightSidebar from '../../RightSidebar'
import downloadexcel from "vue-json-excel";

export default {
  name: 'Esperas',
  data () {
    return {
        startVal: 0,
        endVal: [0, 0, 0, 0],            
        user: [{
          usuario_id : store.get('user_usuario_id'),
          cod_corte : store.get('cod_corte'),
          cod_tribunal : store.get('cod_tribunal'),
          ano : store.get('ano'),
          mes : store.get('mes')
		}],
		excelHead :{ "Centro" :  "gls_centroresidencial",  
                "Tipo" :  "descripcion", 
                "rut" :  "rut", 
                "Rit" : "rit" ,
                "Tipo Lit" : "gls_tipolitigante" ,
                "Fec. Resolucion" :  "fecha_resolucion",
                "80 Bis" :  "flg_80bis" ,
                "T Espera" : "dia" ,
                "Fech Nacimiento" : "fec_nacimiento" ,
                "Edad" : "edad" ,
                "Curador"  : "flg_curador" 
              },   

        dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
        fields: [
            {
                key: "gls_centroresidencial",
                label: "Centro",
                sortable: true
            },              
            {
                key: 'descripcion',
                label: 'Tipo',
                sortable: true
            },
            {
                key: 'rut',
                label: 'RUT',
                sortable: true
            },            
            {
                key: 'rit',
                label: 'RIT',
                sortable: true
            },
            {
                key: "gls_tipolitigante",
                label: 'Tipo Lit',
                sortable: true
            },            
            {
                key: 'fecha_resolucion',
                label: 'Fec. Resolución',
                sortable: true
            },
            {
                key: 'flg_80bis',
                label: '80 BIS',
                sortable: true
            },
            {
                key: 'dia',
                label: 'T. Espera',
                sortable: true
            },
            {
                key: 'dia',
                label: 'T. Espera',
                sortable: true
            },
            {
                key: 'fec_nacimiento',
                label: 'F. Nacimiento',
                sortable: true
            },
            {
                key: 'edad',
                label: 'Edad',
                sortable: true
            },
            {
                key: 'flg_curador',
                label: 'Curador',
                sortable: true
            }                                                                                    
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 20, 30],
        filter: null,
        filterOn: [],    
        items: [],
        data : [],
        arraynew:[]
    }
  },
  created () {
    this.requestData(this.dateRange)
  },
  methods: {
    limpiar(){
		  this.arraynew = []
          this.arraynew=this.items
          this.filter=''
    },
    update (value) {
      this.startVal = 0
      this.endVal = [0, 0, 0,0]
      this.requestData(value)
    },
     startDownload(){

       console.log(this.data);

			 this.arraynew = []
        if(this.filter === '') {
          this.arraynew = this.data
          return this.arraynew;
        }else {
          if(this.filter === null) {
            this.arraynew = this.data
            return this.arraynew;
          } else {
      /// Filtro el array 
              let texto = this.filter
              this.arraynew = this.items.filter((m) =>  
              (((m.gls_centroresidencial.toLowerCase().match(this.filter)) || (m.gls_centroresidencial.match(this.filter))) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || (((m.descripcion.toLowerCase().match(this.filter)) || (m.descripcion.match(this.filter))) && 
              ((this.filterOn[0] == 'descripcion' || this.filterOn[1] == 'descripcion' || this.filterOn[2] == 'descripcion' ) ||
              (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined)))
              || (((m.rut.toLowerCase().match(this.filter)) || (m.rut.match(this.filter))) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || (((m.rit.toLowerCase().match(this.filter)) || (m.rit.match(this.filter))) &&
              ((this.filterOn[0] == 'rit' || this.filterOn[1] == 'rit' || this.filterOn[2] == 'rit' ) ||
              (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined)))                   
              ||  (((m.gls_tipolitigante.toLowerCase().match(this.filter)) || (m.gls_tipolitigante.match(this.filter)))  &&
               (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))                    
              || ((m.fecha_resolucion.match(this.filter)) && 
              ((this.filterOn[0] == 'fecha_resolucion' || this.filterOn[1] == 'fecha_resolucion' || this.filterOn[2] == 'fecha_resolucion' ) ||
              (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined)))
              || (((m.flg_80bis.toLowerCase().match(this.filter)) || (m.flg_80bis.match(this.filter))) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || ((m.dia == this.filter) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || ((m.fec_nacimiento == this.filter) && 
                 (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || ((m.edad == this.filter) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              || (((m.flg_curador.toLowerCase().match(this.filter)) || (m.flg_curador.match(this.filter))) && (this.filterOn[0] == undefined && this.filterOn[1] ==  undefined && this.filterOn[2] == undefined))
              );
				}
      }
      
    }, 
    requestData: function (dateRange) {
      this.dateRange = dateRange

      const axios = require('axios')
      const req1 = url + '/familia/centrosEsperas'
      const req2 = url + '/familia/centrosEsperasDetalles'


      axios.all([
        axios.get(req1, {
          params: {
            cod_corte: this.user[0].cod_corte,
            cod_tribunal: this.user[0].cod_tribunal
          }
        }),
        axios.get(req2, {
          params: {
            cod_corte: this.user[0].cod_corte,
            cod_tribunal: this.user[0].cod_tribunal
          }
        })
      ]).then(axios.spread((...responses) => {

        const data1 = responses[0].data
        const data2 = responses[1].data
        let aux = 0;

        Object.values(data1.recordset).map((type) => {
          this.endVal[aux] = type.cantidad;
          aux++;
        })

         this.endVal[aux] =  this.endVal[0] + this.endVal[1] + this.endVal[2]

         

        Object.values(data2.recordset).map((type) => {
            this.items.push({isActive: true, gls_centroresidencial: type.gls_centroresidencial, 
                             descripcion: type.descripcion, rut: type.rut, rit: type.rit, 
                             gls_tipolitigante: type.gls_tipolitigante, fecha_resolucion: type.fecha_resolucion, 
                             flg_80bis: type.flg_80bis, dia: type.dia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), 
                             fec_nacimiento: type.fec_nacimiento, edad: type.edad, flg_curador: type.flg_curador,
                             _rowVariant: (type.edad > 17 && type.edad < 120) ? 'danger': ''
                             });
         this.data.push({ gls_centroresidencial: type.gls_centroresidencial, descripcion: type.descripcion, rut: type.rut, gls_tipolitigante: type.gls_tipolitigante, rit: type.rit, fecha_resolucion: type.fecha_resolucion, flg_80bis: type.flg_80bis, dia: type.dia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), fec_nacimiento: type.fec_nacimiento, edad: type.edad, flg_curador: type.flg_curador});
        })
       // this.llenarfilter()
        this.totalRows = this.items.length;
        //this.arraynew = this.items;
        this.$forceUpdate()
	 
      })).catch(errors => {

      })
    },       
  },
  components: {
    countTo,
    RightSidebar,
    downloadexcel
  }
}
</script>

<style lang="scss">
.ve-avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: thin solid #aaa;
}
</style>
