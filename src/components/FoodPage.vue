<template>
    <div class="people-page">
        <a-input 
            v-model:value="title" 
            placeholder="Пиво"
            type="text"
            class="app-input"
            @keyup.enter="$event.target.nextElementSibling.focus()"
        />
        <a-input 
            v-model:value="price" 
            placeholder="500"
            type="number"
            class="app-input"
            @keyup.enter="onClickAddPosition()"
        />

        <a-button 
            @click="onClickAddPosition()" 
            shape="round"
            :disabled="!title || !price"
            class="app-button"
        >
            
            <plus-circle-outlined/> 
            Добавить позицию из счета
        </a-button>

        <br>

        <div 
            v-for="(position, i) in store.food" 
            :key="i"
            class="food"
        >

            {{ position.title }}
            {{ position.price }}
            <a-button type="primary" danger shape="round" @click="onClickDeletePosition(i)">
                <close-outlined />
            </a-button>

        </div>

        <!-- {{ store.food }} -->

    </div>
</template>

<script setup>
import {PlusCircleOutlined, CloseOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useAppStore } from '../store/index';

const store = useAppStore();
const title = ref('');
const price = ref('');

function onClickAddPosition(){
    if(title.value && price.value){
        store.addPosition({
        title: title.value,
        price: price.value
        });

        title.value = '';
        price.value = '';
    }
    
}

function onClickDeletePosition(ind){
    store.deletePosition(ind);
}


</script>

<style lang="scss">

@import '../assets/style.scss';

</style>
