<template>
    <div class="people-page">

        <div style="color: aliceblue;">
            <v-text-field 
            v-model="title" 
            placeholder="Пиво"
            variant="underlined"
            @keydown.enter="focusNext" 
            ref="input0"
            >
            </v-text-field>
            <v-text-field 
            v-model="price" 
            placeholder="500"
            variant="underlined"
            @keyup.enter="onClickAddPosition()"
            @keypress="NumbersOnly"
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
                <v-icon icon="mdi-plus"></v-icon>
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

function NumbersOnly(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();;
    } else {
    return true;
    }
}

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>
