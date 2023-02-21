import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'

Vue.use(Vuex,store)

export default new Vuex.Store({
    state: {
        active: false,
        dialog: false,
        fechas: {
        },
        meses: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre' 
        ]
    }, 
    mutations: {
        setActive (state, active) {
            state.active = !active
            setInterval(() => {
                window.dispatchEvent(new Event('resize'));
            }, 10);
        },
        setModal (state, dialog) {
            state.dialog = dialog
        },
        setFechas (state, obj, ) {
            state.fechas = obj
        },    
    },
    actions: {

    }
})