<template>
    <a-menu 
      v-model:selectedKeys="current" 
      mode="horizontal" 
      style="font-size: 25px; background-color: rgb(99, 87, 117); justify-content: center;"
      >

      <a-menu-item key="people">
        <router-link to="/" >
          <team-outlined style="font-size: 25px;"/>
          Кто кушал
        </router-link>
      </a-menu-item>

      <a-menu-item key="food" >
        <router-link to="/food" >

              <coffee-outlined style="font-size: 25px;"/>
              Что кушал
        </router-link >
      </a-menu-item>

      <a-menu-item key="pay">
        <router-link to="/pay" >
            <dollar-circle-outlined style="font-size: 25px;"/>
              Кто за что платил
        </router-link >
      </a-menu-item>

      <a-menu-item key="result">
        <router-link to="/result" >
            <question-outlined style="font-size: 25px;"/>
            Кто кому что должен
        </router-link >
      </a-menu-item>

    </a-menu>
  </template>

  <script setup>
  import { defineComponent, ref } from 'vue';
  import { TeamOutlined, QuestionOutlined, CoffeeOutlined, DollarCircleOutlined} from '@ant-design/icons-vue';

  const current = ref(['people']);
  </script>
