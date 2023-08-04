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

            <p>{{ model }}</p>
            <p>{{ foodEaten }}</p>

            <v-sheet
                class="mx-auto"
                elevation="8"
                max-width="800"
            >
                <v-slide-group
                v-model="model"
                class="pa-4 slider"
                selected-class="bg-primary"
                multiple
                mandatory
                show-arrows
                >
                <v-slide-group-item
                    v-for="position in store.food"
                    :key="position.id" 
                    :value="position.id"
                    v-slot="{ isSelected, toggle, selectedClass }"
                >
                    <v-card
                    color="grey-lighten-1"
                    :class="['ma-4', selectedClass]"
                    height="120"
                    width="120"
                    @click="toggle"
                    >
                    <div class="d-flex fill-height align-center justify-center">
                        <v-scale-transition>
                        <v-icon
                            v-if="isSelected"
                            color="white"
                            size="48"
                            icon="mdi-close-circle-outline"
                        ></v-icon>
                        </v-scale-transition>
                    </div> 
                    <v-card-text>
                        {{ position.title }}
                    </v-card-text>
                    </v-card>
                </v-slide-group-item>
                </v-slide-group>
            </v-sheet>

            <v-container fluid> 
                <v-checkbox
                    v-for="position in store.food" 
                    :key="position.id" 
                    :value="position.id"
                    v-model="foodEaten"
                    @change="onChangeFood(billId)"
                    :label="position.title + ' ' + position.price"
                > 
                </v-checkbox> 
            </v-container>

        </div>  

        <div class="title-block">
            <div class="title-block-text">Кто ел</div>
        </div>

        <div class="people-eat">

            <v-checkbox
                v-for="person in store.people" 
                :key="person.id" 
                :value="person.id"
                v-model="peopleEat"
                :label="person.name"
                @change="onChangePeopleEat(billId)"
            > 
             </v-checkbox>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/index';
import AppSelect from './UI/AppSelect.vue'

const store = useAppStore();

//const personPays = ref('Name')
const selected = ref('Name') //вынести в стор
const foodEaten = ref([])
const peopleEat = ref([])

const model = ref([]);

const props = defineProps({
    billId: {
        type: Number,
        required: true
    }
})

function people(){
    let arr = [];
    for(let i = 0; i < store.people.length; i++){
        arr.push(store.people[i].name)
    }
    return arr;
}

function showResult(){
    store.calcResult();
}

function onClickDeleteBillPosition(billId){
    store.deleteBillPosition(billId)
}

// function onChangePersonPays(billId){
//     store.changeName({
//         id: billId,
//         nameId: pesronPays.value
//     })
//     //console.log('person id: ' + pesronPays.value)
// }

function onChangePersonPays(option){
    //personPays.value = option.name
    selected.value = option.name
    console.log(option)
    console.log(props.billId)
    store.changeName({
        id: props.billId,
        nameId: option.id
    })
}

function onChangeFood(billId){
    store.changeFood({
        id: billId,
        food: foodEaten.value
    })
    //console.log('eaten food id: ' + foodEaten.value)
}

function onChangePeopleEat(billId){
    store.changePeople({
        id: billId,
        people: peopleEat.value
    })
    //console.log('people ate id: ' + peopleEat.value)
}
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
    color: rgb(57, 50, 68);
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