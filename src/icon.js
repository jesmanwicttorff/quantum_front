import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartLine, faArrowCircleUp, faArrowCircleDown, faArrowCircleRight, faSpinner, faAlignJustify, faSortDown, faEllipsisV, faCircle
        ,faColumns,  faChartPie, faInbox, faLandmark, faClipboardList, faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'


library.add(faChartLine, faArrowCircleUp, faArrowCircleDown, faArrowCircleRight, faSpinner, faAlignJustify, faSortDown, faEllipsisV, faCircle
            , faColumns, faInbox, faLandmark, faClipboardList, faChartPie, faCircleNotch)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)