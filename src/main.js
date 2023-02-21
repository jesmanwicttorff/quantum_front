import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueExcelXlsx from "vue-excel-xlsx";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import './assets/css/bigToolTip.css'
import './assets/css/custom.css'
import './icon.js' //FontAwesome ICONS
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import { ValidationProvider } from 'vee-validate';
import Vuetify from 'vuetify/lib'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueExcelXlsx)
Vue.use(VueMoment, {
  moment,
})
Vue.component('ValidationProvider', ValidationProvider);

Vue.prototype.$thousandSeparator = function(value){
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
Vue.prototype.$settingDate = function(date){
  return moment(date).format('YYYY/MM/DD')
}

Vue.prototype.$setDate = function(option){
  let fechas = [{
    anoInicio: 0,
    anoFin: 0,
    mesInicio: 0,
    mesFin: 0,
    calendario: [],
    fechaInicioCompleta: '',
    fechaFinalCompleta: '',
  }]    

  moment.locale('es');

  let calendario = []
  switch (option) {
      case 1:
              fechas.mesInicio = Number(moment().add(-1,'M').format("M"))  // Menos un mes.
              fechas.anoInicio = Number(moment().add(-1,'M').format("YYYY"))
              fechas.mesFin = Number(moment().add(-1,'M').format("M")) // Menos un mes.
              fechas.anoFin = Number(moment().add(-1,'M').format("YYYY"))
              calendario.push(moment().month(fechas.mesFin -1).format('MMMM'));
              fechas.fechaInicioCompleta = moment(fechas.anoInicio + '/' + fechas.mesInicio + '/01').format('YYYY/MM');
              fechas.fechaFinalCompleta = moment(fechas.anoFin + '/' + fechas.mesFin + '/01').format('YYYY/MM');
              fechas.calendario = calendario;
             
          break;
      case 2:
              fechas.mesInicio = Number(moment().add(-3,'M').format("M")) // Menos tres meses.
              fechas.anoInicio = Number(moment().add(-3,'M').format("YYYY"))
              fechas.mesFin = Number(moment().add(-1,'M').format("M")) // Menos un mes.
              fechas.anoFin = Number(moment().add(-1,'M').format("YYYY"))
              fechas.fechaInicioCompleta = moment(fechas.anoInicio + '/' + fechas.mesInicio + '/01').format('YYYY/MM');
              fechas.fechaFinalCompleta = moment(fechas.anoFin + '/' + fechas.mesFin + '/01').format('YYYY/MM');

              

              for (let index = (fechas.mesInicio - 1); index <= (fechas.mesFin - 1); index++) {
                calendario.push(moment().month(index).format('MMMM'))
              }
              fechas.calendario = calendario
              
          break;
      case 3:
              fechas.mesInicio = Number(moment().add(-12,'M').format("M")) // Menos tres meses.
              fechas.anoInicio = Number(moment().add(-12,'M').format("YYYY"))
              fechas.mesFin = Number(moment().add(-1,'M').format("M")) // Menos un mes.
              fechas.anoFin = Number(moment().add(-1,'M').format("YYYY"))
              fechas.fechaInicioCompleta = moment(fechas.anoInicio + '/' + fechas.mesInicio + '/01').format('YYYY/MM');
              fechas.fechaFinalCompleta = moment(fechas.anoFin + '/' + fechas.mesFin + '/01').format('YYYY/MM');

              for (let index = (fechas.mesInicio - 1); index <= 11; index++) {
                calendario.push(moment().month(index).format('MMMM'))
              }

              for (let index = (fechas.mesFin -1); index >= 0; index--) {
                calendario.push(moment().month(((fechas.mesFin -1) - index)).format('MMMM'))
              } 

              fechas.calendario = calendario

          break;                                         

      default:
          break;
  }
  return fechas
}

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString().toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')