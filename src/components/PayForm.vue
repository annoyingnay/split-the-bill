<template>
    <div class="bill-position">

        <v-btn 
            @click="onClickDeleteBillPosition"
            class="delete-button"
            variant="text" 
            size="small" 
            rounded="xl"
        >
            <v-icon icon="mdi-close"></v-icon>
        </v-btn>

        <div class="title-block">
            <div class="title-block-text">Кто платил</div>
        </div>

        <app-select
            :options="store.people"    
            @selected="onChangePersonPays"
            :selected="selected"
        />

        <div class="title-block">
            <div class="title-block-text">За что платил</div>
        </div>

        <div class="food-eaten">

            <br>

            <v-sheet
                class="mx-auto"
                max-width="600"
            >
                <v-slide-group
                    v-model="foodEaten"
                    class="slider"
                    show-arrows
                    multiple
                    mandatory
                >
                <v-slide-group-item
                    v-for="position in store.food"
                    :key="position.id" 
                    :value="position.id"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-btn
                        @click="toggle"
                        class="ma-2"
                        :class="isSelected ? 'selected' : 'not-selected'"
                        rounded
                    >
                        {{ position.title +" "+ position.price}}
                    </v-btn>
                </v-slide-group-item>
                </v-slide-group>
            </v-sheet>

            <br>
        </div>  

        <div class="title-block">
            <div class="title-block-text">Кто ел</div>
        </div>

        <div class="people-eat">

            <br>
            <v-sheet
                class="mx-auto"
                max-width="600"
            >
                <v-slide-group
                    v-model="peopleEat"
                    class="slider"
                    show-arrows
                    multiple
                    mandatory
                >
                <v-slide-group-item
                    v-for="person in store.people" 
                    :key="person.id" 
                    :value="person.id"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-btn
                        class="ma-2"
                        @click="toggle"
                        :class="isSelected ? 'selected' : 'not-selected'"
                        rounded
                    >
                        {{ person.name }}
                    </v-btn>
                </v-slide-group-item>
                </v-slide-group>
            </v-sheet>
            <br>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAppStore } from '../store/index';
import AppSelect from './UI/AppSelect.vue'

const store = useAppStore();

const selected = ref('Имя')
const foodEaten = ref([])
const peopleEat = ref([])

const props = defineProps({
    billId: {
        type: Number,
        required: true
    }
})

function onClickDeleteBillPosition(billId){ //удаляем позицию счета
    store.deleteBillPosition(billId)
}

function onChangePersonPays(option){ //меняем значение если выбрали новое имя
    selected.value = option.name
    store.changeName({
        id: props.billId,
        nameId: option.id
    })
}

watch(foodEaten, () => { //смотрим, какие позиции выбрали
    store.changeFood({
        id: props.billId,
        food: foodEaten.value
    })
})

watch(peopleEat, () => { //смотрим, какие люди кушали
    store.changePeople({
        id: props.billId,
        people: peopleEat.value
    })
})

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>