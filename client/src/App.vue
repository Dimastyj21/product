<script setup lang="ts">
import Footer from './components/footer/Footer.vue';
import Header from './components/header/Header.vue';
</script>

<template>
  <div id="app">
    <Header class="header" />
    <main class="content">
      <router-view />
    </main>
    <Footer class="footer" />
  </div>
</template>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: none;
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #eee;
  box-shadow: none;
  z-index: 1000;
}

.content {
  padding-top: 60px;
  padding-bottom: 50px;
  min-height: calc(100vh - 110px);
  box-sizing: border-box;
  overflow-y: auto;
}
</style>