<template>
    <v-container>
        <!-- NAVBAR -->
        <v-app-bar app flat color="#007bff">
            <v-app-bar-nav-icon @click="drawer = !drawer">
                <font-awesome-icon  icon="align-justify" size="2x" class="white--text"/>
            </v-app-bar-nav-icon>
           <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark icon v-bind="attrs" v-on="on">
                            <font-awesome-icon icon="ellipsis-v" size="1x" class="white--text"/> 
                        </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>
                            <v-btn color="white" :href="this.logout" style="text-decoration:none">Salir</v-btn>    
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        
        <!-- SIDEBAR -->
        <v-navigation-drawer width="210" app v-model="drawer">
                <v-layout>
                      <v-flex>
                           <img src="../../public/img/pjud.png" alt="usuario" class="py-2 ml-2"/>
                      </v-flex>
                </v-layout>
                <v-list nav>
                    <v-list-item-title avatar>
                        <img src="../../public/img/u1.png" alt="usuario" class="user_avatar"/>
                        &nbsp;
                        <h5 class="grey--text" style="display: inline-block">{{login}}</h5>
                    </v-list-item-title>
                </v-list>
                <v-divider></v-divider>
                <v-list subheader>
                    <v-subheader class="borderli">QUANTUM TABLERO</v-subheader>
                        <v-list-group prepend-icon="" v-for="list in li" :key="list.nombre" no-action class="borderli">
                            <template v-slot:activator>
                                <v-list-item-icon class="mr-1">
                                    <font-awesome-icon  :icon="list.icono" size="1x" class="MenuIconColor"/>
                                </v-list-item-icon>
                                <v-list-item-title>{{list.nombre}}</v-list-item-title>
                            </template>

                            <v-list-item class="pl-6" v-for="menu in menus[list.id]" :key="menu.nombre" link>
                                    <v-list-item-icon class="mr-2">
                                        <font-awesome-icon  :icon="menu.icono" size="1x" class="dotcolor"/>
                                    </v-list-item-icon>
                                    <v-list-item-content >
                                        <router-link style="text-decoration:none;" :to="menu.link" >{{menu.nombre}}</router-link>
                                    </v-list-item-content>
                            </v-list-item>
                           
                        </v-list-group>
                </v-list>
        </v-navigation-drawer>
        
    </v-container>
</template>

<script>
import Vue from 'vue'
import AppVue from '../App.vue'
import store from 'store'
import { url } from '../config/api'
import { quantum } from '../config/quantum'

export default {
    name: "Sidebar",
    data(){
        return{
            login:  store.get('user_login'),
            drawer: false,
            active: true,
            li: [],
            menus: [],
            logout: ''
        };
    },
    created () {
        this.logout = quantum + '/home/logout' 
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.setActive(this.active())
        }
    },
    methods: {
        salir: function(){
            window.location.href= this.logout;
        }
    },
    watch: 
    {
        $route (to, from) 
        {
            let llave = to.fullPath.substring(1)
            llave = llave.substring(0, llave.indexOf('/'))
            if (this.li.length === 0) {
                const axios = require('axios')
                const urlpermissions = url + '/configuraciones/permisos'
                const get = async urlpermissions => {
                try {
                    const response = await axios.get(urlpermissions, {
                        params: {
                            llave: llave
                        }
                    })

                    const data = response.data
                    let obj = data.recordset.filter(element => element.id_permiso === data.recordset[0].id &&  element.llave == '')
                    
                    obj.forEach(type => {
                        this.li.push({ id: type.id, nombre: type.nombre, icono: type.icono }) // Creo el primer nivel del menu
                        this.menus[type.id] = [] // Inserto el arreglo y la posición
                        let opc = data.recordset.filter(element => element.id_permiso === type.id)
                        opc.forEach(typeTwo => {
                            this.menus[type.id].push({ nombre: typeTwo.nombre, link: typeTwo.llave, icono: typeTwo.icono })
                        })
                    })
                } catch (error) {
                    console.log(error)
                }
                }
                get(urlpermissions)
            }
        }
    }
}
</script>
<style>
    .white{
        color: #fff;
    }

.user_avatar{
    width:65px;
    border:1px solid #eee;
    background:#fff;
    padding:5px;
    border-radius:50%;
   
}

.amarillo{
    color: #F4F000;
}

.dotcolor{
    color: #E8E7E7;
}

.MenuIconColor{
    color: #007bff;
}

.borderli{
    border-bottom: 1px solid #f8f8f8;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #EFEFEF;
}
</style>