import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Laboral from '../components/competencias/laboral/Laboral'
import Penal from '../components/competencias/penal/Penal'
import Suprema from '../components/competencias/suprema/Suprema' // padre
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCarousel from '@chenfengyuan/vue-carousel'
import { jwt } from '../config/token'
import { quantum } from '../config/quantum'
import store from 'store'



import CortesIngresos from '../components/cortes/Ingresos'
import CortesIngresosTerminos from '../components/cortes/IngresosTerminos'
import CortesIngresosLibros from '../components/cortes/IngresosLibros'
import CortesIngresosTerminosComparativas from '../components/cortes/IngresosTerminosComparativas'
import CortesIngresosTerminosSalas from '../components/cortes/IngresosTerminosSalas'
import CortesCausasVistas from '../components/cortes/CausasVistas'
import CortesInventariosSalas from '../components/cortes/InventariosSalas'
import CortesInventariosRetardos from '../components/cortes/InventariosRetardos'
import CortesSalasLibros from '../components/cortes/SalasLibros'
import CortesSalasLibrosDetalles from '../components/cortes/SalasLibrosDetalles'
import CortesTerminos from '../components/cortes/Terminos'

import FamiliaConsolidados from '../components/competencias/familia/Consolidados'
/***************Creacion del Jurisdiccional **** */
// import Jurisdiccional from '../views/jurisdiccional/consolidados'

/***************Creacion del Modulo de Laboral **** */
// import LaboralIngresos from '../views/laboral/Ingresos'
import LaboralIngresos from '../views/laboral/IngresosMain'
import LaboralIngresos_tipoMaterias from '../views/laboral/Ingresos_tipoMaterias'
import LaboralIngresos_tipoIngresos from '../views/laboral/Ingresos_tipoIngresos'
import LaboralAudiencias from '../views/laboral/Audiencias'
import LaboralTerminos from '../views/laboral/TerminosMain'
import LaboralResoluciones from '../views/laboral/ResolucionesMain'
import LaboralTablero from '../views/laboral/Tablero'
import LaboralTableroAudiencias from '../views/laboral/TableroAudiencias'
import LaboralTableroMain from '../views/laboral/TableroMain'

/***************Creacion del Modulo de Supremo **** */
import SupremaInicio from '../views/suprema/Inicio'

/************Creacion Modulo de Visitas Pendientes* */

import VisitasGestiones from  '../views/suprema/VisitasGestiones'


/***************Creacion del Modulo de Penal **** */
import PenalIngresos from '../views/penal/Ingresos'
import PenalEscritos from '../views/penal/Escritos'
import PenalIngresosDetalles from '../views/penal/IngresosDetalles'
import PenalAudiencias from '../views/penal/Audiencias'
import PenalAudienciasEstados from '../views/penal/AudienciasEstados'
import PenalAudienciasDetallesRealizadas from '../views/penal/AudienciasDetallesRealizadas'
import PenalAudienciasDetallesRealizadasGarantias from '../views/penal/AudienciasDetallesRealizadasGarantias'
import PenalAudienciasDetallesRealizadasOrales from '../views/penal/AudienciasDetallesRealizadasOrales'
import PenalAudienciasDetallesNoRealizadas from '../views/penal/AudienciasDetallesNoRealizadas'
import PenalTerminos from '../views/penal/Terminos'
import PenalTablero from '../views/penal/Tablero'

Vue.use(Router)
Vue.use(VueAxios, axios)
Vue.use(VueCarousel)

const router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/IndicadoresApelaciones/',
        component: Home,
        children: [
            { path: '/IndicadoresApelaciones/Terminos', name: 'Terminos', component: CortesTerminos },
            { path: '/IndicadoresApelaciones/IngresosTerminos', name: 'IngresosTerminos', component: CortesIngresosTerminos },
            { path: '/IndicadoresApelaciones/IngresosTerminosComparativas', name: 'IngresosTerminosComparativas', component: CortesIngresosTerminosComparativas },
            { path: '/IndicadoresApelaciones/IngresosLibros', name: 'IngresosLibros', component: CortesIngresosLibros },
            { path: '/IndicadoresApelaciones/IngresosTerminosSalas', component: CortesIngresosTerminosSalas },
            { path: '/IndicadoresApelaciones/SalasLibros', component: CortesSalasLibros },
            { path: '/IndicadoresApelaciones/SalasLibrosDetalles', component: CortesSalasLibrosDetalles },
            { path: '/IndicadoresApelaciones/CausasVistas', component: CortesCausasVistas },
            { path: '/IndicadoresApelaciones/InventariosRetardos', component: CortesInventariosRetardos },
            { path: '/IndicadoresApelaciones/InventariosSalas', component: CortesInventariosSalas },
            { path: '/IndicadoresApelaciones/Ingresos/:token?', name: 'Ingresos', component: CortesIngresos }
        ]
    },
    {
        path: '/indicadoresFamilia/',
        component: Home,
        children: [
            { path: '/indicadoresFamilia/Consolidados/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?', name: 'Consolidados', component: FamiliaConsolidados }
        ]
    },
    {
        path: '/IndicadoresLaboral/', // Nuevo Tablero de competencia laboral
        component: Laboral,
        children: [
            { path: '/IndicadoresLaboral/Ingresos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralIngresos', component: LaboralIngresos },
            { path: '/IndicadoresLaboral/Ingresos_tipoMaterias/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralIngresos_tipoMaterias', component: LaboralIngresos_tipoMaterias }, // Tipo Materias
            { path: '/IndicadoresLaboral/Ingresos_tipoIngresos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralIngresos_tipoIngresos', component: LaboralIngresos_tipoIngresos }, // Tipo Materias
            { path: '/IndicadoresLaboral/Audiencias/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralAudiencias', component: LaboralAudiencias },
            { path: '/IndicadoresLaboral/Terminos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralTerminos', component: LaboralTerminos },
            { path: '/IndicadoresLaboral/Resoluciones/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralResoluciones', component: LaboralResoluciones },
            { path: '/IndicadoresLaboral/Tablero/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralTablero', component: LaboralTablero },
            { path: '/IndicadoresLaboral/TableroAudiencias/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralTableroAudiencias', component: LaboralTableroAudiencias },
            { path: '/IndicadoresLaboral/TableroMain/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?', name: 'LaboralTableroMain', component: LaboralTableroMain }
            
        ]
    },
    {
        path: '/IndicadoresPenal/', // Nuevo Tablero de competencia Penal
        component: Penal,
        children: [
            { path: '/IndicadoresPenal/Ingresos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?/:tipo?', name: 'PenalIngresos', component: PenalIngresos },
            { path: '/IndicadoresPenal/Escritos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?/:tipo?', name: 'PenalEscritos', component: PenalEscritos },            
            { path: '/IndicadoresPenal/PenalIngresosDetalles', name: 'PenalIngresosDetalles', component: PenalIngresosDetalles },
            { path: '/IndicadoresPenal/Audiencias/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?/:tipo?', name: 'PenalAudiencias', component: PenalAudiencias },
            { path: '/IndicadoresPenal/AudienciasEstados', name: 'PenalAudienciasEstados', component: PenalAudienciasEstados },
            { path: '/IndicadoresPenal/AudienciasDetallesRealizadas', name: 'PenalAudienciasDetallesRealizadas', component: PenalAudienciasDetallesRealizadas },
            { path: '/IndicadoresPenal/AudienciasDetallesRealizadasGarantias', name: 'PenalAudienciasDetallesRealizadasGarantias', component: PenalAudienciasDetallesRealizadasGarantias },
            { path: '/IndicadoresPenal/AudienciasDetallesRealizadasOrales', name: 'PenalAudienciasDetallesRealizadasOrales', component: PenalAudienciasDetallesRealizadasOrales },
            { path: '/IndicadoresPenal/AudienciasDetallesNoRealizadas', name: 'PenalAudienciasDetallesNoRealizadas', component: PenalAudienciasDetallesNoRealizadas },
            { path: '/IndicadoresPenal/Terminos/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?/:tipo?', name: 'PenalTerminos', component: PenalTerminos },
            { path: '/IndicadoresPenal/Tablero/:token?/:cod_corte?/:cod_tribunal?/:ano?/:mes?/:rango?/:exhorto?/:tipo?', name: 'PenalTablero', component: PenalTablero }           
            
          ]
    }, 
    {
      path: '/VisitaMinistroSuprema/', // Nuevo Visita Ministro
      component: Suprema,
      children: [
                { path: '/VisitaMinistroSuprema/Inicio/:token?', name: 'SupremaInicio', component: SupremaInicio },
                { path: '/VisitaMinistroSuprema/VisitasGestiones', name: 'VisitasGestiones', component: VisitasGestiones },
               
           ]
    },    
    // {
    //     path: '/jurisdiccional/',
    //     component: Home,
    //     children: [
    //         { path: '/jurisdiccional/Consolidados/:token?', name: 'Jurisdiccional', component: Jurisdiccional }
    //     ]
    // }
  ],
  linkActiveClass: '', // active class for non-exact links.
  linkExactActiveClass: 'activeLink' // active class for *exact* links.
})

router.beforeEach(async (to, from, next) => {
  if (to.params.token) {
    const ingurl = jwt + '/valid'
    const body = {}
    const post = async ingurl => {
      try {
        const response = await axios.post(ingurl, body
          , {
            headers: {
              Authorization: `Basic ${to.params.token}`
            }
          })
        const data = response.data
        if (data.status) {
          
          store.set('user_usuario_id', Number(data.status.usuario_id))
          store.set('user_cod_corte', Number(data.status.cod_corte))
          store.set('user_cod_tribunal', Number(data.status.cod_tribunal))
          store.set('user_login', String(data.status.login))
          
          store.set('cod_corte',(typeof to.params.cod_corte !== 'undefined') ? Number(to.params.cod_corte) : 0)
          store.set('cod_tribunal',(typeof to.params.cod_tribunal !== 'undefined') ? Number(to.params.cod_tribunal) : 0)
          store.set('ano',(typeof to.params.ano !== 'undefined') ? Number(to.params.ano) : 0)
          store.set('mes',(typeof to.params.mes !== 'undefined') ? Number(to.params.mes) : 0)
          store.set('rango',(typeof to.params.rango !== 'undefined') ? Number(to.params.rango) : 0)
          store.set('exhorto',(typeof to.params.exhorto !== 'undefined') ? Number(to.params.exhorto) : 0)          
          
          localStorage.setItem('token',to.params.token)
          
          next()
        }
      } catch (error) {
        console.log(error,"aqui 2")
      }
    }

    post(ingurl)
  } 
  else {
    const token = localStorage.getItem('token')
    if (token) {
      const ingurl = jwt + '/valid'
      const body = {}
      const post = async ingurl => {
        try {
          const response = await axios.post(ingurl, body, {
            headers: {
              Authorization: `Basic ${token}`
            }
          })
          const data = response.data
          if (data.status) {
  
            store.set('user_usuario_id', Number(data.status.usuario_id))
            store.set('user_cod_corte', Number(data.status.cod_corte))
            store.set('user_cod_tribunal', Number(data.status.cod_tribunal))
            store.set('user_login', String(data.status.login))
            
            next()
          }
        } catch (error) {
          console.log(error,"aqui 1")
        }
      }
        await post(ingurl)    
      }
      else {
      window.location.href = quantum
    }
  }
})

export default router
