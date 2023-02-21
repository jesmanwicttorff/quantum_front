<template>
  <b-container fluid>
      <b-container class="px-4 py-4">
        <h3>Cortes de Apelaciones</h3>
      </b-container>    
      <b-container class="px-4">
        <b-card class="px-4 py-4" style="background: rgb(250, 249, 249);">
          <b-row>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="arica"></carousel>
                <span>Arica</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="iquique" direction="up"></carousel>
                <span>Iquique</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="antofagasta"></carousel>
                <span>Antofagasta</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="copiapo" direction="up"></carousel>
                <span>Copiapo</span>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
      <b-container class="px-4 py-4">
        <b-card class="px-4 py-4" style="background: rgb(250, 249, 249);">
          <b-row>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="serena"></carousel>
                <span>Serena</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="valparaiso" direction="up"></carousel>
                <span>Valparaiso</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="santiago"></carousel>
                <span>Santiago</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="sanmiguel" direction="up"></carousel>
                <span>San Miguel</span>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
      <b-container class="px-4">
        <b-card class="px-4 py-4" style="background: rgb(250, 249, 249);">
          <b-row>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="rancagua"></carousel>
                <span>Rancagua</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="talca" direction="up"></carousel>
                <span>Talca</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="chillan"></carousel>
                <span>Chillán</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="concepcion" direction="up"></carousel>
                <span>Concepción</span>
            </b-col>
          </b-row>
        </b-card>
      </b-container>
      <b-container class="px-4 py-4">
        <b-card class="px-4 py-4" style="background: rgb(250, 249, 249);">
          <b-row>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="temuco"></carousel>
                <span>Temuco</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="valdivia" direction="up"></carousel>
                <span>Valdivia</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="puertomontt"></carousel>
                <span>Puerto Montt</span>
            </b-col>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="coyhaique" direction="up"></carousel>
                <span>Coyhaique</span>
            </b-col>
          </b-row>
        </b-card>
      </b-container>      
      <b-container class="px-4">
        <b-card class="px-4 py-4" style="background: rgb(250, 249, 249);">
          <b-row>
            <b-col sm="3" style="text-align: center;">
                <carousel :data="puntaarenas"></carousel>
                <span>Punta Arenas</span>
            </b-col>
          </b-row>
        </b-card>
      </b-container>            
  </b-container>
</template>
<script>
import Vue from 'vue'
import { url } from '../../../config/api'
// import store from 'store'
// import countTo from 'vue-count-to'
import VueCarousel from '@chenfengyuan/vue-carousel'
console.log(url)

export default {
  name: 'Consolidados',
  data () {
    return {
      arica: [
        {
          id: 1,
          message: 'Arica',
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Arica.jpg'),
                width: '228',
                height: '150'
              }
            },
            createElement('span', [`${content.message} ${content.id}`])
            )           
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Arica_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        }           
      ],
      iquique: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Iquique.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Iquique_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        }        
      ],
      antofagasta: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Antofagasta.jpg'),
                width: '228',
                height: '150',
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Antofagasta_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        }           
      ],
      copiapo: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Copiapo.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Copiapo_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      serena: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Serena.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Serena_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      valparaiso: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Valparaiso.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Valparaiso_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      santiago: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Santiago.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Santiago_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      sanmiguel: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/San_Miguel.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/San_Miguel_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      rancagua: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Rancagua.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Rancagua_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      talca: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Talca.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Talca_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      chillan: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Chillan.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Chillan_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      concepcion: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Concepcion.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Concepcion_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      temuco: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Temuco.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Temuco_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        } 
      ],
      valdivia: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Valdivia.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Valdivia_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },         
      ], 
      puertomontt: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Puerto_Montt.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Puerto_Montt_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },         
      ],
      coyhaique: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Coyhaique.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Coyhaique_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },         
      ],
      puntaarenas: [
        {
          id: 1,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Punta_Arenas.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },
        {
          id: 2,
          content (createElement, content) {
            return createElement('img', {
              attrs: {
                src: require('../../../../public/img/Cortes/Punta_Arenas_2.jpg'),
                width: '228',
                height: '150'
              }
            })
          }
        },         
      ]                                                                                     
    }    
  },
  created () {

  },
  methods: {
    content (createElement, data, vm) {
      return createElement('div', {
        class: 'example-slide'
      }, [`Slide ${vm.$parent.direction}`])
    }
  },
  components: {
    VueCarousel
  }
}
</script>

<style>
  .broadcast {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    display: flex;
    padding: 0.5rem 0.75rem;
  }

  .broadcast > .feather {
    margin-right: 0.5rem;
  }

  .broadcast > .carousel {
    flex: 1;
  }

  .broadcast-content {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
</style>
