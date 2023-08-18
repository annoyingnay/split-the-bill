<template>
    <div class="people-page">

        <v-text-field
            v-model="name"
            @keyup.enter="onClickAddPerson()"
            ref="input0"
            class="app-input"
            placeholder="Вася"
            variant="underlined"
        >
        </v-text-field>

        <v-btn
            @click="onClickAddPerson()"
            :disabled="!name"
            class="app-button"
            variant="tonal"
            block
            rounded="xl"

        >
            <template v-slot:prepend>
                <v-icon icon="mdi-plus"></v-icon>
            </template>
            Добавить человека
        </v-btn>

        <br>

        <div
            v-for="person in store.people"
            :key="person.id"
            class="position"
        >
            {{ person.name }}

            <v-btn
                @click="onClickDeletePerson(person.id)"
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

const name = ref('');


function onClickAddPerson(){ //добавляем человека
    if(name.value){
        store.addPerson(name.value);
        name.value = '';
    }
}

function onClickDeletePerson(id) { //удаляем человека
    store.deletePerson(id);
}

const input0 = ref(null);

onMounted(() => { //фокус на инпуте
    input0.value.focus()
})

</script>

<style lang="scss">

@import '../assets/style.scss';


</style>