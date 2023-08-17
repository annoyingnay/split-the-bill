<template>
    <nav-bar></nav-bar>
    <div style="display: flex; justify-content: center;">
      <router-view></router-view>
    </div>
</template>

<script setup>

  import "ant-design-vue/dist/antd.css"
  import NavBar from './components/NavBar.vue';

</script>

<style>
  body{
    background-color: rgb(79, 69, 94);
  }
</style>
