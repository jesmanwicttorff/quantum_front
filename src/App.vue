<template >
    <div id="wrapper" v-bind:class="{toggled: this.active}">
        <v-app>
            <NavSideBar />
            <v-main>
                <router-view>
                </router-view>
            </v-main>
        </v-app>
        <!-- <Footer/>     -->
    </div>
</template>

<script>
import NavSideBar from './components/NavSideBar'
// import Footer from './components/Footer'
import { mapState } from 'vuex'
export default {
  components: {
    NavSideBar
  },
  computed: {
    ...mapState([
      'active'
    ])
  },
  methods: {
  }
}
</script>
<style>
.tile_count .tile_stats_count {
    border-bottom: 1px solid #D9DEE4;
    padding: 0 10px 0 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}
.tile_count .tile_stats_count span {
    font-size: 13px;
}
.tile_count .tile_stats_count .count {
    font-size: 30px;
    line-height: 47px;
    font-weight: 600;
}
.green {
    color: #1ABB9C;
}
/* #wrapper {
    padding-left: 0;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

#wrapper.toggled {
    padding-left: 20%;
}

#sidebar-wrapper {
    z-index: 1000;
    position: fixed;
    left: 20%;
    width: 0;
    height: 100%;
    margin-left: -20%;
    overflow-y: auto;
    background: #fff;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    box-shadow: 0 0 6px rgba(0,0,0,.1);    
}

#wrapper.toggled #sidebar-wrapper {
    width: 20%;
}

#wrapper.toggled #page-content-wrapper {
    position: absolute;
    margin-right: -20%;
} */

/* Sidebar Styles */

 .activeLink {
    color: rgb(0, 0, 0);
    color: inherit;
    padding: 5%;
 }

</style>
