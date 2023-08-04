<template>
    <div class="people-page">

        <div style="color: aliceblue;">
            <v-text-field 
            v-model="title" 
            label="Пиво"
            variant="underlined"
            @keydown.enter="focusNext" 
            ref="input0"
            >
            </v-text-field>
            <v-text-field 
            v-model="price" 
            label="500"
            variant="underlined"
            @keyup.enter="onClickAddPosition()"
            ref="input1"
            >
            </v-text-field>
        </div>


        <v-btn
            @click="onClickAddPosition()"
            :disabled="!title || !price"
            variant="tonal"
            block
            rounded="xl" 
            style="color:aliceblue; background-color: rgb(100, 88, 117); text-transform: lowercase;"
        >
            <template v-slot:prepend>
                <plus-circle-outlined/> 
            </template>
            
            Добавить позицию из счета   
        </v-btn>

        <br>

        <div 
            v-for="(position, i) in store.food" 
            :key="i"
            class="food"
        >
            <div>
                {{ position.title }}
                {{ position.price }}
            </div>
            

            <v-btn 
                @click="onClickDeletePosition(i)"
                variant="text" 
                size="small" 
                rounded="xl" 
                style="background-color: rgb(216, 35, 80); color: aliceblue;">
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </div>

        {{ store.food }}

    </div>
</template>

<script setup>
import {PlusCircleOutlined, CloseOutlined} from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
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
        input0.value.focus();
    }    
}

function onClickDeletePosition(ind){
    store.deletePosition(ind);
}

const input0 = ref(null);
const input1 = ref(null);

function focusNext(event) {
    input1.value.focus()
};


onMounted(() => {
    input0.value.focus()
});


</script>

<style lang="scss">

@import '../assets/style.scss';

</style>
