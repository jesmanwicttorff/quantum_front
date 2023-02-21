<template>
    <v-row>
        <v-col md="12">
            <v-card>
                <v-card-title class="primary">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline white--text">{{nombreTribunal}}</v-list-item-title>
                            <v-list-item-subtitle class="font-italic white--text">{{fechas.periodo}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card-title>
                <v-card-text>
                    <v-sheet height="64">
                        <v-toolbar flat>
                            <v-btn
                                outlined
                                class="mr-4"
                                color="grey darken-2"
                                @click="setToday"
                            >
                                Hoy
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="prev"
                            >
                                Ant
                            </v-btn>
                            <v-btn
                                fab
                                text
                                small
                                color="grey darken-2"
                                @click="next"
                            >
                                Sig
                            </v-btn>
                            <v-toolbar-title v-if="$refs.calendar">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu
                                bottom
                                right
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    outlined
                                    color="grey darken-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span>{{ typeToLabel[type] }}</span>
                                </v-btn>
                                </template>
                                <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Día</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Semana</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Mes</v-list-item-title>
                                </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="ObtenerAgendaAudiencias"
                        ></v-calendar>
                        <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        offset-x
                        >
                        <v-card
                            color="grey lighten-4"
                            min-width="350px"
                            flat
                        >
                            <v-toolbar
                            :color="selectedEvent.color"
                            dark
                            >
                                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <span v-html="selectedEvent.details"></span>
                            </v-card-text>
                            <v-card-actions>
                            <v-btn
                                text
                                color="secondary"
                                @click="selectedOpen = false"
                            >
                                Salir
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-menu>
                    </v-sheet>
                </v-card-text>

                <!-- MODALES Y OTROS ELEMENTOS FUERA DEL TABLERO-->
                <FiltrosCompetencias class="mt-4" style="display: none"/>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import { url } from '../../config/api'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import countTo from 'vue-count-to'

export default {
    name: 'TableroAgenda',
    data(){
        return{
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            nombreTribunal: '',
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Mes',
                week: 'Semana',
                day: 'Día'
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],

        }
    },
    
    methods: {
        obtenerNombreTribunal(){
            const axios = require('axios')
            const req1 = url + '/laboral/tribunal_detalle' 

            axios.all([
                axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal
                    }
                })
            ]).then(axios.spread((...responses) => {

                const arrayTribunal = responses[0].data

                Object.values(arrayTribunal.recordset).map((type) => {
                    this.nombreTribunal = type.gls_tribunal
                })

            })).catch(errors => {
                console.log(errors)
            })
        },

        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        getEventColor (event) {
            return event.color
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                setTimeout(() => {
                    this.selectedOpen = true
                }, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        ObtenerAgendaAudiencias({ start, end }){
            const axios = require('axios')
            const urlApi = url + '/laboral/agenda_audiencias_programadas' 
            const events = []
            let req
            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)

            const get = async req => {
                try{
                    const response = await axios.get(urlApi, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: start.year,
                                mesInicio: start.month,
                                anoFin: end.year,
                                mesFin: end.month
                        }           
                    })

                    const data = response.data
                    let objFuncionarioAgenda = new Object()
                    let arrAgenda = []

                    Object.values(data.recordset).map((type) => {
                       
                        objFuncionarioAgenda = new Object()
                        objFuncionarioAgenda.crr_idfuncionario = type.crr_idfuncionario
                        objFuncionarioAgenda.fec_trabajo = type.fec_trabajo
                        objFuncionarioAgenda.nombre = type.nombre
                        objFuncionarioAgenda.inicio = type.inicio
                        objFuncionarioAgenda.hora_inicio = type.hora_inicio
                        objFuncionarioAgenda.termino = type.termino
                        objFuncionarioAgenda.hora_termino = type.hora_termino
                        objFuncionarioAgenda.cantidad_audiencias = type.cantidad_audiencias
                        objFuncionarioAgenda.preparatorias = type.preparatorias
                        objFuncionarioAgenda.juicio = type.juicio
                        objFuncionarioAgenda.especial = type.especial
                        objFuncionarioAgenda.unica = type.unica
                        objFuncionarioAgenda.color = this.colors[this.rnd(0, this.colors.length - 1)]

                        objFuncionarioAgenda.detalle = '<b>'+objFuncionarioAgenda.cantidad_audiencias+' Audiencias('

                        if(objFuncionarioAgenda.preparatorias > 0){
                            objFuncionarioAgenda.detalle += objFuncionarioAgenda.preparatorias + ' Prep'
                        }

                        if(objFuncionarioAgenda.juicio > 0){
                            objFuncionarioAgenda.detalle += ' + '+objFuncionarioAgenda.juicio + ' Juic'
                        }

                        if(objFuncionarioAgenda.especial > 0){
                            objFuncionarioAgenda.detalle += ' + '+objFuncionarioAgenda.especial + ' Espc'
                        }

                        if(objFuncionarioAgenda.unica > 0){
                            objFuncionarioAgenda.detalle += ' + '+objFuncionarioAgenda.unica + ' Unica'
                        }

                        objFuncionarioAgenda.detalle += ')</b>'
                        objFuncionarioAgenda.detalle += '<br/><br/> Inicio: <b>'+ objFuncionarioAgenda.inicio + '</b> Term: <b>'+objFuncionarioAgenda.termino + '</b>'

                        arrAgenda.push(objFuncionarioAgenda)
                        
                    })


                    arrAgenda.forEach(agenda => {
                        events.push({
                            name: agenda.nombre,
                            start:agenda.hora_inicio,//agenda.inicio,
                            end:  agenda.hora_termino,
                            color: agenda.color,
                            timed: false,
                            details: agenda.detalle,
                        })
                    });

                    this.events = events

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req)

        }

    },
    computed: {
        ...mapState(['fechas'])
    },
    watch: {
        fechas () {
            console.log(this.fechas)
            this.obtenerNombreTribunal()
        }
    },
    components: {
        FiltrosCompetencias
        ,highcharts: Chart
        ,ModalLoading
        ,countTo
    }
}

</script>
