<template>
  <body>
  <HeaderView/>
  <!--
  -->
  <router-view/>
  <!--
  -->
  <FooterView/>
  </body>
</template>

<script>
import HeaderView from './views/HeaderView.vue'
import FooterView from './views/FooterView.vue'

export default {
  components: {
    HeaderView,
    FooterView
  }
}
</script>

<style>

</style>