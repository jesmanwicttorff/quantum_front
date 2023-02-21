<template>
    <v-card outlined class="mx-auto">
        <v-row align="center" class="px-4" dense>
            <v-col class="mt-3" cols="2" sm="2">
                <v-select
                    item-value="value"
                    item-text="name" 
                    :items="rango"
                    v-model="rangoSelected"
                    @change="opcionesComportamiento()"
                    label="Rango"
                    dense
                ></v-select>                 
            </v-col>  
            <v-col class="mt-3" cols="2" sm="2" v-if="showTipoCuatrimestre">
                <v-select
                    item-value="value"
                    item-text="name"
                    :items="tipo_cuatrimestral"
                    v-model="tipocuatri_Selected"
                    @change="opcionesComportamiento()"
                    label="Tipo Cuatrimestral"
                    dense
                ></v-select>                 
            </v-col>
            <v-col class="mt-3" cols="2" sm="2">
                <v-select
                    :items="anios"
                    v-model="aniosSelected"
                    :label="labelAnoInicio"
                    dense
                    
                ></v-select>                 
            </v-col>
            <v-col class="mt-3" cols="2" sm="2" v-if="showMeses">
                <v-select
                    item-value="value"
                    item-text="name"
                    :items="meses"
                    v-model="mesesSelected"
                    :label="labelMesInicio"
                    dense
                ></v-select>                 
            </v-col>
            <v-col class="mt-3" cols="2" sm="2" v-if="showMesesFin">
                <v-select
                    :items="anios"
                    v-model="aniosSelectedFin"
                    label="Año Fin"
                    dense
                    
                ></v-select>                 
            </v-col>
            <v-col class="mt-3" cols="2" sm="2" v-if="showMesesFin">
                <v-select
                    item-value="value"
                    item-text="name"
                    :items="meses"
                    v-model="mesesSelectedFin"
                    label="Mes Fin"
                    dense
                ></v-select>                 
            </v-col>
             <v-col class="mt-3" cols="2" sm="2" v-if="showRangoCuatrimestral" >
                <v-select
                    item-value="value"
                    item-text="name"                   
                    :items="cuatrimestre"
                    v-model="cuatriSelected"
                    label="Rango Cuatrimestral"
                    dense
                ></v-select>                 
            </v-col>
            <v-col class="mt-3" cols="2" sm="2">
                <v-select
                    item-value="value"
                    item-text="name"                
                    :items="exhorto"
                    v-model="exhortoSelected"
                    label="Exhortos"
                    dense
                ></v-select>                 
            </v-col>
            <v-col class="mt-3 px-0" cols="2" sm="2">
                <v-btn color="primary" style="margin-top: -25px" @click="buscar">Buscar</v-btn>      
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import Vue from 'vue'
import store from 'store'
import { mapMutations } from 'vuex' // Esto interpreta el archivo index.js de la carpeta store
import moment from 'moment-timezone'
moment.locale('es');

export default {
    name: 'FiltrosCompetencias',
    data () {
        return {       
            anios: [2020,2019,2018,2017,2016,2015,2014],
            aniosSelected: store.get('ano'),
            aniosSelectedFin: store.get('ano'),
            rango: [ { value: 1, name: 'Mensual' },
                     { value: 5, name: 'Trimestral' } ,
                     { value: 2, name: 'Cuatrimestral' } ,
                     { value: 3, name: 'Año Calendario' }, 
                     { value: 4, name: 'Año Movil' },
                     { value: 6, name: 'Otros' }
            ],
            rangoSelected: 1,
            meses: [ { value: 1, name: 'Enero' },
                     { value: 2, name: 'Febrero' },
                     { value: 3, name: 'Marzo' },
                     { value: 4, name: 'Abril' },
                     { value: 5, name: 'Mayo' },
                     { value: 6, name: 'Junio' },
                     { value: 7, name: 'Julio' },
                     { value: 8, name: 'Agosto' },
                     { value: 9, name: 'Septiembre' },
                     { value: 10, name: 'Octubre' },
                     { value: 11, name: 'Noviembre' },
                     { value: 12, name: 'Diciembre' }
            ],
            mesesSelected: store.get('mes'),
            mesesSelectedFin: store.get('mes'),
            tipo_cuatrimestral: [ { value: 1, name: 'Fijo' },
                                  { value: 2, name: 'Movil' }
            ],
            tipocuatri_Selected: 1,
            cuatrimestre:[ { value: 1, name: 'Primero'}, 
                           { value: 5, name: 'Segundo' }, 
                           { value: 9, name: 'Tercero'} 
            ],
            cuatriSelected: 1,
            exhorto: [{ value: 1, name: 'Incluir'},
                      { value: 0, name: 'Excluir'}
            ],
            exhortoSelected: store.get('exhorto'),
            showMeses: false,
            showMesesFin: false,
            showTipoCuatrimestre: false,
            showRangoCuatrimestral: false,
            labelAnoInicio: 'Año',
            labelMesInicio: 'Mes'
        }
    },
    created(){
        this.setFechasFiltros() 
        this.opcionesComportamiento()
    },
    methods: {
        ...mapMutations(['setFechas']), // Mutations no Borrar
        setFechasFiltros(){
            let fechas = {
            }        
            let calendario = []

            switch (this.rangoSelected) {
                case 1: // Mensual
                        fechas.mesInicio = Number(this.mesesSelected)  // Menos un mes.
                        fechas.anoInicio = Number(this.aniosSelected)
                        fechas.mesFin = Number(this.mesesSelected)
                        fechas.anoFin = Number(this.aniosSelected)
                        fechas.exhorto =  this.exhortoSelected
                        fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                        fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)] 
                        fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin
                        fechas.TipoBusqueda = 'Mensual'
                        fechas.PeriodoAntanoInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-1,'M').format('YYYY'))
                        fechas.PeriodoAntanoFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-1,'M').format('YYYY'))
                        fechas.PeriodoAntmesInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-1,'M').format('M'))
                        fechas.PeriodoAntmesFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-1,'M').format('M'))
                        calendario.push(moment().month(fechas.mesFin -1).format('MMMM'));
                        fechas.calendario = calendario  
                    break;
                case 2: // Cuatrimestral
                        if(this.tipocuatri_Selected == 2){ // Movil
                            fechas.mesInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-3,'M').format('M')) // Menos cuatro meses.
                            fechas.anoInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-3,'M').format('YYYY'))
                            fechas.mesFin = Number(this.mesesSelected)
                            fechas.anoFin = Number(this.aniosSelected)
                            fechas.exhorto =  this.exhortoSelected  
                            fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                            fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)]  
                            fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin                   
                            fechas.TipoBusqueda = 'CuatrimestreMovil'
                            fechas.PeriodoAntanoInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-4,'M').format('YYYY'))
                            fechas.PeriodoAntanoFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-4,'M').format('YYYY'))
                            fechas.PeriodoAntmesInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-4,'M').format('M'))
                            fechas.PeriodoAntmesFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-4,'M').format('M'))
                            
                            for (let index = (fechas.mesInicio - 1); index <= 3; index++) {
                                calendario.push(moment().month(index).format('MMMM'))
                            }

                            for (let index = (fechas.mesFin -1); index >= 0; index--) {
                                calendario.push(moment().month(((fechas.mesFin -1) - index)).format('MMMM'))
                            } 

                            fechas.calendario = calendario  
                        
                        }else{ // Fijo
                            fechas.mesInicio = Number(moment(new Date(this.cuatriSelected+'/01/'+this.aniosSelected)).format('M')) // Menos cuatro meses.
                            fechas.anoInicio = Number(moment(new Date(this.cuatriSelected+'/01/'+this.aniosSelected)).format('YYYY'))
                            fechas.mesFin = Number(this.cuatriSelected + 3)
                            fechas.anoFin = Number(this.aniosSelected)
                            fechas.exhorto =  this.exhortoSelected    
                            fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                            fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)] 
                            fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin                    
                            fechas.TipoBusqueda = 'CuatrimestreFijo'
                            
                            switch(this.cuatriSelected){
                                case 1:
                                    fechas.PeriodoAntanoInicio = fechas.anoInicio - 1
                                    fechas.PeriodoAntanoFin = fechas.anoFin - 1
                                    fechas.PeriodoAntmesInicio = 9
                                    fechas.PeriodoAntmesFin = 12
                                    break
                                case 5:
                                    fechas.PeriodoAntanoInicio = fechas.anoInicio
                                    fechas.PeriodoAntanoFin = fechas.anoFin
                                    fechas.PeriodoAntmesInicio = 1
                                    fechas.PeriodoAntmesFin = 4
                                    break
                                case 9:
                                    fechas.PeriodoAntanoInicio = fechas.anoInicio
                                    fechas.PeriodoAntanoFin = fechas.anoFin
                                    fechas.PeriodoAntmesInicio = 5
                                    fechas.PeriodoAntmesFin = 8
                                    break
                                default:
                                    fechas.PeriodoAntanoInicio = 0
                                    fechas.PeriodoAntanoFin = 0
                                    fechas.PeriodoAntmesInicio = 0
                                    fechas.PeriodoAntmesFin = 0
                                    break
                            }

                            for (let index = (fechas.mesInicio - 1); index <= (fechas.mesFin - 1); index++) {
                                calendario.push(moment().month(index).format('MMMM'))
                            }
                            fechas.calendario = calendario

                        }
 
                    break;
                case 3: // Año Fijo
                        fechas.mesInicio = Number(moment(new Date('01/01/'+this.aniosSelected)).format('M')) // Menos cuatro meses.
                        fechas.anoInicio = Number(moment(new Date('01/01/'+this.aniosSelected)).format('YYYY'))
                        fechas.mesFin = Number(12)
                        fechas.anoFin = Number(this.aniosSelected)
                        fechas.exhorto =  this.exhortoSelected  
                        fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                        fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)]      
                        fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin                                        
                        fechas.TipoBusqueda = 'AñoFijo'
                        fechas.PeriodoAntanoInicio = fechas.anoInicio - 1
                        fechas.PeriodoAntanoFin = fechas.anoFin - 1
                        fechas.PeriodoAntmesInicio = 1
                        fechas.PeriodoAntmesFin = 12
                        for (let index = (fechas.mesInicio - 1); index <= 11; index++) {
                            calendario.push(moment().month(index).format('MMMM'))
                        }                  
                        fechas.calendario = calendario         
                    break;
                case 4: // Año Movil
                        fechas.mesInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-11,'M').format('M')) // Menos cuatro meses.
                        fechas.anoInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-11,'M').format('YYYY'))
                        fechas.mesFin = Number(this.mesesSelected)
                        fechas.anoFin = Number(this.aniosSelected)
                        fechas.exhorto =  this.exhortoSelected
                        fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                        fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)]
                        fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin
                        fechas.TipoBusqueda = 'AñoMovil'
                        fechas.PeriodoAntanoInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-11,'M').format('YYYY'))
                        fechas.PeriodoAntanoFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-11,'M').format('YYYY'))
                        fechas.PeriodoAntmesInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-12,'M').format('M'))
                        fechas.PeriodoAntmesFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-12,'M').format('M'))
                        
                        for (let index = (fechas.mesInicio - 1); index <= 11; index++) {
                            calendario.push(moment().month(index).format('MMMM'))
                        }

                        for (let index = (fechas.mesFin -1); index >= 0; index--) {
                            calendario.push(moment().month(((fechas.mesFin -1) - index)).format('MMMM'))
                        } 

                        fechas.calendario = calendario           

                    break;
                case 5: // Trimestre
                        fechas.mesInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-2,'M').format('M')) // Menos tres meses.
                        fechas.anoInicio = Number(moment(new Date(this.mesesSelected+'/01/'+this.aniosSelected)).add(-2,'M').format('YYYY'))
                        fechas.mesFin = Number(this.mesesSelected)
                        fechas.anoFin = Number(this.aniosSelected)
                        fechas.exhorto =  this.exhortoSelected  
                        fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                        fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)]
                        fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin
                        fechas.TipoBusqueda = 'Trimestre'
                        fechas.PeriodoAntanoInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-3,'M').format('YYYY'))
                        fechas.PeriodoAntanoFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-3,'M').format('YYYY'))
                        fechas.PeriodoAntmesInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-3,'M').format('M'))
                        fechas.PeriodoAntmesFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-3,'M').format('M'))
                        for (let index = (fechas.mesInicio - 1); index <= (fechas.mesFin - 1); index++) {
                            calendario.push(moment().month(index).format('MMMM'))
                        }
                        fechas.calendario = calendario                          
                    break;
                case 6: // Rango seleccionable por el usuario
                        fechas.mesInicio = Number(this.mesesSelected)  // Menos un mes.
                        fechas.anoInicio = Number(this.aniosSelected)
                        fechas.mesFin = Number(this.mesesSelectedFin)
                        fechas.anoFin = Number(this.aniosSelectedFin)
                        fechas.exhorto =  this.exhortoSelected
                        fechas.nombreMesInicio = moment.months()[(fechas.mesInicio - 1)]
                        fechas.nombreMesFin = moment.months()[(fechas.mesFin - 1)] 
                        fechas.periodo = "Desde " + fechas.nombreMesInicio + " del " + fechas.anoInicio + " - Hasta " +  fechas.nombreMesFin + " del " + fechas.anoFin
                        fechas.TipoBusqueda = 'Mensual'
                        fechas.PeriodoAntanoInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-1,'M').format('YYYY'))
                        fechas.PeriodoAntanoFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-1,'M').format('YYYY'))
                        fechas.PeriodoAntmesInicio = Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-1,'M').format('M'))
                        fechas.PeriodoAntmesFin = Number(moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin)).add(-1,'M').format('M'))
                        calendario.push(moment().month(fechas.mesFin -1).format('MMMM'));
                        fechas.calendario = calendario  


                        let varFechaInicio = moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio))//Number(moment(new Date(fechas.mesInicio+'/01/'+fechas.anoInicio)).add(-1,'M').format('YYYY'))
                        let varFechaFin = moment(new Date(fechas.mesFin+'/01/'+fechas.anoFin))//Number(moment().add(-1,'M').format('YYYY'))

                        if(varFechaFin.diff(varFechaInicio, 'days') > 366){
                            alert("El rango de fechas no puede ser mayor a 1 año")
                            return;
                        }


                    break;
            }
            this.setFechas(fechas)              
        },   
        buscar() {
            this.setFechasFiltros() 
            this.$emit("buscar") // Envio el evento
        },
        opcionesComportamiento() {
            switch(this.rangoSelected){
                case 1:
                    this.showMeses = true
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.showMesesFin = false
                    this.labelAnoInicio = "Año"
                    this.labelMesInicio = "Mes"
                    break;
                case 2:
                    this.showTipoCuatrimestre = true
                    this.showMesesFin = false

                    if(this.tipocuatri_Selected == 2) {
                        this.showMeses = true
                        this.showRangoCuatrimestral = false
                    }
                    else {
                        this.showMeses = false
                        this.showRangoCuatrimestral = true
                    }

                    break;
                case 3:
                    this.showMeses = false
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.showMesesFin = false
                    break;
                case 4:
                    this.showMeses = true
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.showMesesFin = false
                    break;
                case 5:
                    this.showMeses = true
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.showMesesFin = false
                    break;
                case 6:
                    this.showMeses = true
                    this.showMesesFin = true
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.labelAnoInicio = "Año Inicio"
                    this.labelMesInicio = "Mes Inicio"
                    break;
                default:
                    this.showMeses = true
                    this.showTipoCuatrimestre = false
                    this.showRangoCuatrimestral = false
                    this.showMesesFin = false
                    break;
            }
        },
    } 
}
</script>