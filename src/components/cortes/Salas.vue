<template>
        <div class="container-fluid" >
                <div class="col-md-12 col-sm-12">
                    <div class="tile_count">
                        <div class="col-md-6 col-sm-6 tile_stats_count">
                            <span class="count_top">Total sin PR16</span>
                            <div class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal" separator="." :duration="3000"></countTo></div>
                        </div>
                        <div class="col-md-6 col-sm-6 tile_stats_count">
                            <span class="count_top">Total PR16</span>
                            <div class="count"><countTo class="count" :startVal="startVal" :endVal="endVal2" separator="." :duration="3000"></countTo></div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                        <div class="x_title">
                            <h3>Cortes de Apelaciones</h3>
                        </div>
                    </div>
                    <!-- <highcharts class="col-md-12 col-sm-12" :options="chartOptions" :constructor-type="'chart'" /> -->
                    <!-- <highcharts class="col-md-12 col-sm-12" :options="chartOptions2" :constructor-type="'chart'" /> -->
                </div>
        </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { url } from '../../config/api'
import countTo from 'vue-count-to'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'

exporting(HighCharts)

export default {
  name: 'Ingresos',
  data () {
    return {
    }
  }
}
