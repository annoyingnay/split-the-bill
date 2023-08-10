<template>
  <v-toolbar 
    :elevation="5" 
    height="50"  
  >
    <div class="toolbar-item">

      <router-link to="/" active-class="active" >
        <v-icon icon="mdi-account-multiple" style="font-size: 40px;"></v-icon>
        Кто кушал
      </router-link>

    </div>
    
    <div class="toobar-item">

      <router-link v-if="!isFoodDisabled" to="/food" active-class="active">
        <v-icon icon="mdi-food" style="font-size: 35px;"></v-icon>
        Что кушал
      </router-link>

      <span v-else class="disabled-link">
        <v-icon icon="mdi-food" style="font-size: 35px;"></v-icon>
        Что кушал
        <v-tooltip 
          activator="parent"
          location="bottom"
        >
          Добавьте минимум двух людей
        </v-tooltip>
      </span>

    </div>

    <div class="toolbar-item">

      <router-link v-if="!isPayDisabled" to="/pay" active-class="active" >
        <v-icon icon="mdi-cash" style="font-size: 40px;"></v-icon>
        Кто за что платил
      </router-link>

      <span v-else class="disabled-link">
        <v-icon icon="mdi-cash" style="font-size: 40px;"></v-icon>
        Кто за что платил
        <v-tooltip 
          activator="parent"
          location="bottom"
        >
          Добавьте минимум двух людей и две позиции
        </v-tooltip>
      </span>

    </div>

  </v-toolbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '../store/index';

const store = useAppStore();

const isFoodDisabled = ref(true);
const isPayDisabled = ref(true);

watch(store.people, () => {
  if(store.people.length >= 2){
    isFoodDisabled.value = false;
    if(store.food.length >= 2) isPayDisabled.value = false;
  }
  else {
    isFoodDisabled.value = true;
    isPayDisabled.value = true
  }
})

watch(store.food, () => {
  if(store.food.length >= 2){
    isPayDisabled.value = false;
  }
  else{
    isPayDisabled.value = true;
  }
})

</script>

<style lang="scss">
.v-toolbar__content{
  background-color: rgb(99, 87, 117);
  justify-content: center;
}

.toolbar-item{
  margin: 0px 20px 0px 20px;
}

a {
  color: rgb(57, 50, 68);
  font-size: 25px;
}

a:hover {
  color: rgb(77, 67, 92);
}

.active {
  color: aliceblue;
}

.disabled-link{
  color: rgb(57, 50, 68);
  font-size: 25px;
}
</style>