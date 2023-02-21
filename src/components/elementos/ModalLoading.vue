<template>
    <v-dialog
        v-model="$store.state.dialog"    
        persistent max-width="600px"
        >
        <v-card
            color="primary"
            dark
        >
            <v-card-text>
            Obteniendo Información
            <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>   
</template>

<script>
import Vue from 'vue'
import store from 'store'
import {mapMutations, mapState} from 'vuex'
export default {
    name: 'ModalLoading',
    data (){
        return {
           
        }
    }
}
</script>