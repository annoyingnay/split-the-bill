<template>
    <div class="bill-position">

        <div class="delete-btn">
            <v-btn 
                @click="onClickDeleteBillPosition"
                variant="text" 
                size="small" 
                rounded="xl" 
                style="background-color: rgb(216, 35, 80); color: aliceblue;"
                
            >
                <v-icon icon="mdi-close"></v-icon>
            </v-btn>
        </div>

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
                show-arrows
                multiple
                mandatory
                class="slider"
                >
                <v-slide-group-item
                    v-for="position in store.food"
                    :key="position.id" 
                    :value="position.id"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-btn
                    class="ma-2"
                    rounded

                    :style="isSelected ? 'color:aliceblue; background-color: rgb(79, 69, 94); box-shadow: none' : 'color:aliceblue; background-color: rgb(100, 88, 117); box-shadow: none'"
                    @click="toggle"
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
                show-arrows
                multiple
                mandatory
                class="slider"
                >
                <v-slide-group-item
                v-for="person in store.people" 
                :key="person.id" 
                :value="person.id"
                    v-slot="{ isSelected, toggle }"
                >
                    <v-btn
                    class="ma-2"
                    rounded
                    :style="isSelected ? 'color:aliceblue; background-color: rgb(79, 69, 94); box-shadow: none' : 'color:aliceblue; background-color: rgb(100, 88, 117); box-shadow: none'"
                    @click="toggle"
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

//const personPays = ref('Name')
const selected = ref('Имя') //вынести в стор
const foodEaten = ref([])
const peopleEat = ref([])

const model = ref([]);

const props = defineProps({
    billId: {
        type: Number,
        required: true
    }
})

function onClickDeleteBillPosition(billId){
    store.deleteBillPosition(billId)
}

function onChangePersonPays(option){
    selected.value = option.name
    store.changeName({
        id: props.billId,
        nameId: option.id
    })
}

watch(foodEaten, () => {
    store.changeFood({
        id: props.billId,
        food: foodEaten.value
    })
})

watch(peopleEat, () => {
    store.changePeople({
        id: props.billId,
        people: peopleEat.value
    })
})

</script>

<style lang="scss">

@import '../assets/style.scss';

.who-pays{
    background-color: rgb(100, 88, 117);
    color: aliceblue;
    border-radius: 20px;
    margin: 10px 0px 10px 0px;
}

.title-block{
    background-color: rgb(100, 88, 117);
    color: aliceblue;
    border-radius: 20px;
    margin: 10px 0px 10px 0px;
}

.title-block-text{
    font-size: 20px;
    margin: 0px 0px 0px 10px;
    // color: rgb(57, 50, 68);
}

.food-eaten{
    background-color: rgb(100, 88, 117);
    color: aliceblue;
    border-radius: 20px;
    margin: 10px 0px 10px 0px;
}

.people-eat{
    background-color: rgb(100, 88, 117);
    color: aliceblue;
    border-radius: 20px;
    margin: 10px 0px 10px 0px;
}
.bill-position{
    margin: 10px 0px 10px 0px;
    width: 600px;
} 

.slider{
    background-color: rgb(100, 88, 117);
}

</style>