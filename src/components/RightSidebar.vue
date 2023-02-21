<template>
     <b-sidebar id="sidebar-right" title="Filtros" right shadow sidebar-class="border-left border-info">
      <div class="px-3 py-2">
        <p class="px-4">Rango</p>
        <date-picker v-model="dateRange"  range placeholder="Select date range" class="px-4">
            <template v-slot:footer="{ emit }">
                <b-container style="text-align: left">
                    <button class="mx-btn mx-btn-text" @click="selectNextWeek(emit)">
                    7 Antes
                    </button>
                    <span>-</span>
                    <button class="mx-btn mx-btn-text" @click="selectNextMonth(emit)">
                    30 Antes
                    </button>
                    <span>-</span>
                    <button class="mx-btn mx-btn-text" @click="selectNextSixMonth(emit)">
                    60 Antes
                    </button>
                </b-container>
            </template>
        </date-picker>
        <br>
        <br>
        <b-button block variant="primary" @click="update()" v-b-toggle.sidebar-right>Actualizar</b-button>
      </div>
    </b-sidebar>
</template>
<script>
// import Vue from 'vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/es'
export default {
  name: 'RightSidebar',
  data () {
    return {
      active: false,
      dateRange: this.$attrs.dateRange
    }
  },
  created () {
  },
  components: {
    DatePicker
  },
  methods: {
    selectNextWeek (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      const date = [start, end]
      emit(date)
    },
    selectNextMonth (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 30)
      const date = [start, end]
      emit(date)
    },
    selectNextSixMonth (emit) {
      const start = new Date()
      const end = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 60)
      const date = [start, end]
      emit(date)
    },
    update () {
      this.$emit('clicked', this.dateRange)
    }
  }
}
</script>
<style>
.modal.right .modal-dialog {
    position: absolute;
    margin: auto;
    height: 100%;
    overflow-y: auto;
    -webkit-transform: translate3d(0%, 0, 0);
        -ms-transform: translate3d(0%, 0, 0);
            -o-transform: translate3d(0%, 0, 0);
            transform: translate3d(0%, 0, 0);
}

.modal.right .modal-content {
    width: 60%;
    height: 100%;
    min-height: 100%;
    height: auto;
    border-radius: 0;
    float: right;
}

.modal.right .modal-body {
    padding: 15px 15px 80px;
}

/*Right*/
    .modal.right.fade .modal-dialog {
        right: -320px;
        -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
        -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
            -o-transition: opacity 0.3s linear, right 0.3s ease-out;
                transition: opacity 0.3s linear, right 0.3s ease-out;
    }

    .modal.right.fade.in .modal-dialog {
        right: 0;
    }

/* ----- MODAL STYLE ----- */
    .modal-content {
        border-radius: 0;
        border: none;
    }

    .modal-header {
        border-bottom-color: #EEEEEE;
        background-color: #FAFAFA;
    }
</style>
