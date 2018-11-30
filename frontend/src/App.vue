<template>
  <v-app light>
    <v-toolbar class="white">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <Main/>
    </v-content>
  </v-app>
  <!--
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
  -->
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Main from './views/Main'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Main
  },
  data () {
    return {
      title: 'Your Logo'
    }
  }
}
</script>
