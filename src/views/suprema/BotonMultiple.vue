<template>
    <b-container fluid class="px-4 pdf py-1">
        <v-speed-dial 
            v-model="fab" 
            :bottom="bottom" 
            :right="right" 
            :left="left" 
            :direction="direction" 
            :open-on-hover="hover" 
            :transition="transition">
            <template v-slot:activator>
                <v-row dense>
                    <v-col>
                        <v-btn v-model="fab" class="mt-2 ml-5" color="blue darken-2" dark fixed fab @click="showModal">
                            <v-icon >fa-edit</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col >
                        <v-btn class="mt-16 ml-5" color="red darken-2" dark fixed fab @click="descargarPDF()">
                            PDF
                        </v-btn>
                    </v-col>
                </v-row>           
            </template>
        </v-speed-dial>
        <v-dialog max-width="95%" v-model="modal">
            <v-card>
                <v-card-title class="primary white--text">
                    Observaciones
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>                     
                    <v-row>
                        <v-col cols="12">
                            <v-data-table :headers="headers" :items="userForm" dense class="mt-4">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-btn color="yellow" small @click="editItem(item)" class="black--text">
                                        <v-icon small>
                                            fa-edit
                                        </v-icon>
                                    </v-btn>
                                    <v-btn style="margin:10px" color="red" small @click="eliminar(item)" class="white--text">
                                        <v-icon small>
                                            fa-trash-alt
                                        </v-icon>
                                    </v-btn>
                                    <!--  <v-spacer></v-spacer>-->
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="blue" text @click="modal=false">Salir</v-btn>
                            <v-btn color="primary" dark @click="nuevo()">
                                Nuevo Item
                            </v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="700px">
            <v-card>
                <v-card-title  v-if="this.title===true" class="primary white--text">
                    Crear Observación <!--- Si title es true coloca el titulo crear Observacion-->
                </v-card-title>
                <v-card-title  v-else-if="title===false" class="primary white--text">
                    Editar Observación <!--- Si title es false coloca el titulo editar Observacion-->
                </v-card-title>
                <v-card-title  v-if="this.delete===true" class="primary white--text">
                    Eliminar Observacion <!--- Si delete es true coloca el titulo Eliminar Observacion-->
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col> <!--- El primer select es para crear item y el 2do select  es para editar segun si es true o false-->
                            <v-select v-if="this.title===true"  id="selTiposObs"  :items="TiposObs"  item-value="value" item-text="name" v-model="itemobsSelected" label="Tipos Observaciones" dense outlined @change="SelectComportamiento(2)" class="mt-2"></v-select>
                             <v-select v-else-if="this.title===false"  id="selTiposObs"  :items="TiposObs"  item-value="value" item-text="name" v-model="itemobsSelected" label="Tipos Observaciones" dense outlined :readonly="itemsSubReadonly"></v-select>
                       </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12"> <!--- El primer select es para crear item y el 2do select  es para editar segun si es true o false-->
                            <v-select v-if="this.title===true" item-value="value" item-text="name" :items="subObs" v-model="itemSelected" label="Item" dense outlined :readonly="itemsSubReadonly"></v-select>
                            <v-select v-else-if="this.title===false" item-value="value" item-text="name" :items="subObsII" v-model="itemSelected" label="Item" dense outlined :readonly="itemsSubReadonly"></v-select>                 
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12"> <!--- El Observacion es para crear item y el 2da observacion  es para editar segun si es true o false-->
                             <v-text-field v-if="this.title===true" v-model="descObs" label="Observacion"></v-text-field>
                            <v-text-field v-else-if="this.title===false" v-model="descObsII" label="Observacion"></v-text-field>  
                        </v-col>
                        </v-row>
                     <!------- Modal para Eliminar --------------------------------->
                     <v-row>
                        <v-col>
                             <v-select v-if="this.delete===true"  id="selTiposObs"  :items="TiposObs"  item-value="value" item-text="name" v-model="itemobsSelected" label="Tipos Observaciones" dense outlined :readonly="itemsSubReadonly"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-select v-if="this.delete===true" item-value="value" item-text="name" :items="subObsII" v-model="itemSelected" label="Item" dense outlined :readonly="itemsSubReadonly"></v-select>                  
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-if="this.delete===true" v-model="descObsII" label="Observacion" dense outlined :readonly="itemsSubReadonly" ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Salir</v-btn>
                        <v-btn  v-if="this.title == true" :disabled="desabilitado()" color="blue darken-1" text @click="save">Guardar</v-btn>
                        <v-btn  v-else-if="this.title == false && this.delete == false" :disabled="desabilitado()" color="blue darken-1" text @click="save">Editar</v-btn>
                        <v-btn  v-else-if="this.delete==true" :disabled="desabilitado()" color="blue darken-1" text @click="save">Eliminar</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
    </b-container>
</template>


<script>
import font from '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import store from 'store'
import {mapMutations} from 'vuex'
import { url } from '../../config/api'
export default {
    name: 'BotonMultiple',
    data (){
        return {
            dialog: false,
            dialogTerminos: false,
            descObs:'', // Capturo la observacion Agregar
            descObsII:'', // Capturo la observacion Edit
            subObs:[], // Campo observacion para crear item
            subObsII:[], // campo observacion para editar item
            TiposObs: [],
            itemsSubReadonly: false, // bloquea el select de sub item hasta que el select item sea seleccionado 
            title: true, // se utiliza  como booleano a cual modal se dirige : editar, crear o Eliminar
            editedItem: { Items: '',  Observacion: '' },
            itemSelected: 0, // Item seleccionado del combo 
            itemobsSelected: 0,
            direction: 'top',
            delete: true, // Para entrar al modulo de eliminar 
            ident: 0, // Para obtener el id de la observacion
            fab: false, // Levanta el modal de multiple botones
            fling: false,
            hover: false,
            tabs: null,
            top: true,
            right: true,
            bottom: false,
            left: false,
            transition: 'slide-transition',
            modal: false,
            userForm: [],
               headers: [
                {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '5%'},
                {text: 'ITEM', align: 'center', value: 'nivel', class : 'primary white--text', width: '10%'},
                {text: 'SUB ITEM', align: 'center', value: 'descripcion', class : 'primary white--text', width: '10%'},
                {text: 'OBSERVACION', align: 'LEFT', value: 'observacion', class : 'primary white--text', width: '50%'},
                {text: 'ACCIONES', value: 'actions', sortable: false  , class : 'primary white--text', width: '25%'} ],
            user: {
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                id_agendamiento: store.get('id_agendamiento'), // Paremetros obtenido desde params....
                cod_corte: store.get('user_cod_corte') // Paremetros obtenido desde params....
            }
           
        }
    },
    created(){
        //this.select_item()
    },
    methods:{
        descargarPDF(){
            this.$emit("descargarPDF") // Envio el evento
        },
        desabilitado(){ // Metodo para bloquear el boton si no ha escrito ninguna observacion donde no permite guardar
            if(this.title == true){
           return  this.descObs == '' || this.itemobsSelected == 0
            }else if(this.title == false) {
                return  this.descObsII == ''
            } 
        },
        showModal(){
            this.userForm = [] // Metodo para mostrar el modal de los datos del item
            const axios = require('axios')
            const req1 = url + '/suprema/agendamientos_cortes_observaciones' // Api para mostar los datos del Item
            //  this.setModal(true) // Para cargar la ventana Modal
            this.modal = true

            //cargar select para los tipos de observaciones
            this.obtenerTiposObservaciones()
            this.SelectComportamiento(1)// Bloqueo select sub items
            
            axios.all([
                axios.get(req1, {
                    params: {
                        id_agendamiento: this.user.id_agendamiento,
                        flg_observacion: 1
                    }
                })
            ]).then(axios.spread((...responses) => {

                const obj = responses[0].data
                let increment = 1
                let objobs;

                Object.values(obj.recordset).map((type) => { // Resultado de la query para mostrar los datos del Item
                    objobs = new Object();
                    objobs.nivel = type.nivel
                    objobs.descripcion = type.descripcion
                    objobs.observacion = type.observacion
                    objobs.increment= increment
                    objobs.id_tipo_observacion = type.id_tipo_observacion
                    objobs.id = type.id
                    this.userForm.push(objobs)

                    increment ++

                }); 
            
                //  this.setModal(false) // Aqui se apaga el Modal
                    
            })).catch(errors => {
                this.setModal(false)
                console.log(errors)
            })

        },
        editItem (item) { // Evento para editar donde obtengo los elementos del item para editar
           
            this.dialog = true
            this.title=false
            this.subObsII=[]
           this.subObsII.push({value: item.increment, nivel: item.nivel  , name: item.descripcion})
           this.itemSelected = item.increment
           this.descObsII = item.observacion
           this.itemobsSelected = item.id_tipo_observacion // obtengo el id del Item
           this.delete = false
           this.ident = item.id

      },
      eliminar(item) { // Evento para eliminar donde otengo los elementos del item seleccionado
          this.dialog = true
           this.delete = true
           this.title = ''
           this.subObsII=[]
           this.subObsII.push({value: item.increment, nivel: item.nivel  , name: item.descripcion})
           this.itemSelected = item.increment
           this.descObsII = item.observacion
           this.itemobsSelected = item.id_tipo_observacion
           this.ident = item.id

      },
    close () {
        this.dialog = false // Cierro el modal
        this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.title=true
       
        })
      },
    nuevo(){
          this.itemsSubReadonly= false  // Levanta el modal para crear item
          this.dialog = true
          this.delete= false
      },
      select_item() {
             const axios = require('axios')
             const req2 = url + '/suprema/tipos_subobservaciones' // Link de la llamada

            const get = async req2 => {
                try 
                {
                        const response = await axios.get(req2, { 
                              params: {
                                id: 1,
                                id_tipo_observacion: this.itemobsSelected
                                }

                         })
                            const data = response.data    
                            this.subObs = []  // Select para hacer los tipos de observaciones
                            Object.values(data.recordset).map((type) => { 
                            this.subObs.push({value: type.id_tipo, name: type.descripcion})
                            this.itemSelected = type.id_tipo
                          })
                                
                }
                        catch(errors) 
                        {
                            console.log(errors);
                        }           
            }
            get(req2)
            
      },
       save () { // Se guarda 

           if(this.title == true) {
                    const axios = require('axios')     // Query para hacer el insert de los items en el modal      
                    const request1 = url + '/suprema/add_agendamientos_cortes_observaciones'   
                        const get = async request1 => {
                            try {
                                const response = await axios.get(request1, {
                                    params: 
                                    {
                                        id_agendamiento: this.user.id_agendamiento,
                                        id_tipo_sub_observacion: this.itemSelected,
                                        observacion: this.descObs,
                                        flg_observacion: 1
                                    }
                                        
                            })
                            } catch (error) {
                                console.log(error)
                            }
                        }
                     get(request1)  
                     this.showModal() 
           }else if (this.title == false){
               
               const axios = require('axios')    // Api para editar el Item Seleccionado       
                    const request2 = url + '/suprema/edit_agendamientos_cortes_observaciones' 
                    this.descObs= this.descObsII  
                        const get = async request2 => {
                            try {
                                const response = await axios.get(request2, {
                                    params: 
                                    {
                                        id_agendamiento: this.user.id_agendamiento,
                                         id:this.ident,
                                        observacion: this.descObs
                                    }
                                        
                            })
                            } catch (error) {
                                console.log(error)
                            }
                        }

                     get(request2) 
                     this.showModal() 

           }
           if(this.delete == true ) { // Elimina la observacion actualizando el campo flg_elimina en 1

            const axios = require('axios')           
                    const request3 = url + '/suprema/elimi_agendamientos_cortes_observaciones'   
                        const get = async request3 => {
                            try {
                                const response = await axios.get(request3, {
                                    params: 
                                    {
                                        id_agendamiento: this.user.id_agendamiento,
                                        flg_elimina: 1,
                                        id:this.ident
                                    }
                                        
                            })
                             this.showModal()
                            
                            } catch (error) {
                                console.log(error)
                            }
                        }
                     get(request3)  
                    



           }
          // console.log(this.ident);  
                       
                     this.descObs=''
             
        this.close()
      },
    obtenerTiposObservaciones() {
        const axios = require('axios')           
        const request1 = url + '/suprema/tipos_observaciones'   // Api para que me muestre en el SELECT los tipos de 
                                                                // Observaciones

        const get = async request1 => {
            try {
                const response = await axios.get(request1, {params: {}})
                const data = response.data     
                
                //Recorro data
                Object.values(data.recordset).map((type) => { 
                    this.TiposObs.push({value: type.id_tipo_observacion, name: type.descripcion})      
                })
                //limpio la seleccion del select
                this.itemobsSelected = 0

            } catch (error) {
                console.log(error)
            }
        }

        get(request1)  
    },
    SelectComportamiento(opcion){ // Switch que me permite desbloquear los tipos de Subobservacion al seleccionar el tipo de observacion 
        switch(opcion){
            case 1:
                this.itemsSubReadonly = true
                this.itemSelected = 0
                break
            case 2:
                this.itemsSubReadonly = false
                this.select_item()
                this.itemSelected = 0
            default:
                this.itemsSubReadonly = false
                break
        }
    },
    },
     computed: {

    },
}
</script>
<style scoped>

</style>