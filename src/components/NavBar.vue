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
      <router-link :to="isFoodDisabled ? '' : '/food'" active-class="active" @click="onClickShowModal()">
        <v-icon icon="mdi-food" style="font-size: 35px;"></v-icon>
        Что кушал
      </router-link>
    </div>

    <div class="toolbar-item">
      <router-link to="/pay" active-class="active" >
        <v-icon icon="mdi-cash" style="font-size: 40px;"></v-icon>
        Кто за что платил
      </router-link>
    </div>
  </v-toolbar>
</template>

<script setup>
import {ref} from 'vue'

const isFoodDisabled = ref(true);
const isPayDisabled = ref(true);

function onClickShowModal(){
  console.log("oops! you can't do that yet) ")
}

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
</style>