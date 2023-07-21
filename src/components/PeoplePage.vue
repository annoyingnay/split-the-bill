<template>
    <div class="people-page">
        <a-input 
            v-model:value="name" 
            placeholder="Vasya" 
            class="app-input"
            @keyup.enter="onClickAddPerson()"
        />

        <a-button 
            @click="onClickAddPerson()" 
            shape="round"
            :disabled="!name"
            class="app-button"
        >
            
            <plus-circle-outlined/> 
            Добавить человека
        </a-button>

        <br>

        <div 
            v-for="(person, i) in store.people" 
            :key="i" 
            class="people"
        >

                {{ i }}
                {{ person.name }}
            
            
            <a-button 
                type="primary" 
                
                shape="round" 
                @click="onClickDeletePerson(i)"
                class="delete-button"
            >
                <close-outlined />
            </a-button>

        </div>

    </div>
</template>

<script setup>
import {PlusCircleOutlined, CloseOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useAppStore } from '../store/index';

const store = useAppStore();

const name = ref('');

function onClickAddPerson(){
    if(name.value){
        store.addPerson(name.value);
        name.value = '';
    }
}

function onClickDeletePerson(ind) {
    store.deletePerson(ind);
};

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>