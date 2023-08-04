<template>
    <div class="people-page">

        <div class="my-input">
            <v-text-field 
            v-model="name" 
            label="Name"
            variant="underlined"
            ref="input0"
            @keyup.enter="onClickAddPerson()"
            >
            </v-text-field>
        </div>
        

        <!-- <a-button 
            @click="onClickAddPerson()" 
            shape="round"
            :disabled="!name"
            class="app-button"
        >
            <plus-circle-outlined/> 
            Добавить человека
        </a-button> -->

        <v-btn
            @click="onClickAddPerson()"
            :disabled="!name"
            variant="tonal"
            block
            rounded="xl" 
            style="color:aliceblue; background-color: rgb(100, 88, 117); text-transform: lowercase;"
        >

        <template v-slot:prepend>
            <v-icon icon="mdi-plus-circle-outline"></v-icon>
        </template>
            
            Добавить человека   
        </v-btn>

        <br>

        <div 
            v-for="person in store.people" 
            :key="person.id" 
            class="people"
        >

                {{ person.id }}
                {{ person.name }}

            <v-btn 
                @click="onClickDeletePerson(i)"
                variant="text" 
                size="small" 
                rounded="xl" 
                style="background-color: rgb(216, 35, 80); color: aliceblue;">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>

        </div>

        {{ store.people }}

    </div>
</template>

<script setup>
import {PlusCircleOutlined, CloseOutlined} from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
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

const input0 = ref(null);

onMounted(() => {
    input0.value.focus()
});

</script>

<style lang="scss">

@import '../assets/style.scss';

.my-input{
    margin-top: 20px;
    //background-color: rgb(100, 88, 117); 
    color:aliceblue; 
    //border-radius: 20px;
}

</style>