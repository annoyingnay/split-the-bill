<template>
    <div class="bill-position">
        {{ billId }}

        <a-button 
            @click="showResult"
            class="app-button"
            shape="round"

        >
            result
        </a-button>
        <a-button 
            @click="onClickDeleteBillPosition"
            class="delete-button"
            shape="round"
        >
            <close-outlined />
        </a-button>

        <!-- <app-select
            :options="store.people"    
        /> -->

        <div class="who-pays">
            Кто платил
            <!-- <a-select
                v-model:value="pesronPays"
                style="width: 200px;"
                @change="onChangePersonPays(billId)"
            >
                <a-select-option 
                    v-for="person in store.people" 
                    :key="person.id" 
                    :value="person.id"
                >
                    {{ person.name }}
                </a-select-option>
            </a-select> -->

            
            

        </div>

        <app-select
                :options="store.people"    
                @selected="onChangePersonPays"
                :selected="selected"
            />
        you selected: {{ selected }}

        <div class="food-eaten">
            За что платил
            <br>
            <a-checkbox-group 
                v-model:value="foodEaten" 
                @change="onChangeFood(billId)">
                <a-checkbox 
                    v-for="position in store.food" 
                    :key="position.id" 
                    :value="position.id"
                >
                    {{ position.title }}: {{ position.price }}
                </a-checkbox>
                
            </a-checkbox-group>
        </div>  

        <div class="people-eat">
            Кто ел
            <a-checkbox-group v-model:value="peopleEat" style="width: 100%" @change="onChangePeopleEat(billId)">
                <a-checkbox 
                    v-for="person in store.people" 
                    :key="person.id" 
                    :value="person.id"
                >
                    {{ person.name }}
                </a-checkbox>
            </a-checkbox-group>

            <!-- <div 
                v-for="person in store.people" 
                :key="person.id" 
                :value="person.id"
            >
                <user-outlined />
                {{ person.name }}
            </div> -->
        </div>
    </div>
</template>

<script setup>
import {CloseOutlined, UserOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useAppStore } from '../store/index';
import AppSelect from './UI/AppSelect.vue'

const store = useAppStore();

//const personPays = ref('Name')
const selected = ref('Name')
const foodEaten = ref([])
const peopleEat = ref([])

const props = defineProps({
    billId: {
        type: Number,
        required: true
    }
})

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
        nameId: option.name
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

</style>