<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>
<script>
import MainTabBar from "@/components/content/MainTabBar/MainTabBar";
export default {
  name: 'APP',
  components: {
    MainTabBar
  }
}
</script>
<style>
@import "./assets/css/base.css";
</style>
