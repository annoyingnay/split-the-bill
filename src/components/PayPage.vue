<template>
    <div>
        <a-button 
            class="app-button" 
            @click="onClickAddBillPosition"
            shape="round"
        >
            add bill
        </a-button>

        <a-button 
            class="app-button" 
            shape="round"
        >
            result
        </a-button>

        <!-- <button @click="showResult">result</button> -->

        <br>

        <pay-form 
            v-for="(bill, billInd) in store.whoPaysWhat" 
            :key="billInd"
            :bill-id="store.getBillIdByIndex(billInd)"
        >
        </pay-form>


        
        <br>
        <pre> {{ store.whoPaysWhat }} </pre>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '../store/index';
import PayForm from './PayForm.vue'

const store = useAppStore();

const options = store.people;
const pesronPays = ref('Name')
const foodEaten = ref([])
const peopleEat = ref([])


function onChangePersonPays(billId){
    store.changeName({
        id: billId,
        nameId: pesronPays.value
    })
    console.log('person id: ' + pesronPays.value)
}

function onChangeFood(billId){
    store.changeFood({
        id: billId,
        food: foodEaten.value
    })
    console.log('eaten food id: ' + foodEaten.value)
}

function onChangePeopleEat(billId){
    store.changePeople({
        id: billId,
        people: peopleEat.value
    })
    console.log('people ate id: ' + peopleEat.value)
}

function onClickAddBillPosition(){
    store.addBillPosition();
}

function showResult(){
    store.calcResult();
}

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>