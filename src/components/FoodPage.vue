<template>
    <div class="people-page">

        <v-text-field
            v-model="title"
            @keydown.enter="focusNext"
            ref="input0"
            class="app-input"
            placeholder="Пиво"
            variant="underlined"
        />
        <v-text-field
            v-model="price"
            @keyup.enter="onClickAddPosition()"
            @keypress="NumbersOnly"
            ref="input1"
            class="app-input"
            placeholder="500"
            variant="underlined"
        />

        <v-btn
            @click="onClickAddPosition()"
            :disabled="!title || !price"
            class="app-button"
            variant="tonal"
            block
            rounded="xl"
        >
            <template #prepend>
                <v-icon icon="mdi-plus"></v-icon>
            </template>

            Добавить позицию из счета
        </v-btn>

        <br>

        <div
            v-for="position in store.food"
            :key="position.id"
            class="position"
        >
            <div>
                {{ position.title }}
                {{ position.price }}
            </div>

            <v-btn
                @click="onClickDeletePosition(position.id)"
                class="delete-button"
                variant="text"
                size="small"
                rounded="xl"
            >
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../store/index';

const store = useAppStore();
const title = ref('');
const price = ref('');


function onClickAddPosition(){ //добавление человека, смещение фокуса на инпут
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

function onClickDeletePosition(id){ //удаление человека по индексу
    store.deletePosition(id);
}

const input0 = ref(null);
const input1 = ref(null);

function focusNext(event) { //фокус на следующем инпуте после нажатия энтер
    input1.value.focus()
}

onMounted(() => { //фокусировка на первом инпуте
    input0.value.focus()
})

function NumbersOnly(evt) { //вводим только числа
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    }
    else {
        return true;
    }
}

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>
