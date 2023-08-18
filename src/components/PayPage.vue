<template>
    <div>
        <v-btn 
            @click="onClickAddBillPosition"
            class="app-button" 
            variant="tonal"
            block rounded="xl"
        >
            добавить чек
        </v-btn>

        <result-modal
            :is-disabled="isDisabled"    
        >

        </result-modal>

        <br>

        <pay-form 
            v-for="(bill, billInd) in store.whoPaysWhat" 
            :key="billInd"
            :bill-id="store.getBillIdByIndex(billInd)"
        >
        </pay-form>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAppStore } from '../store/index';
import PayForm from './PayForm.vue'
import ResultModal from './ResultModal.vue'

const store = useAppStore();
const isDisabled = ref(true);

function onClickAddBillPosition(){ //добавляем еще один чек
    store.addBillPosition();
}

watch(store.whoPaysWhat, () => { //следим все ли данные в массиве заполнены и блокируем кнопку
    let count = 0;
    for(let i = 0; i < store.whoPaysWhat.length; i++){
        if(!store.whoPaysWhat[i].name || !store.whoPaysWhat[i].people.length || !store.whoPaysWhat[i].food.length) {
            isDisabled.value = true;
            count++;
        }
    }

    if(count === 0) {
        isDisabled.value = false;
    }
})

</script>

<style lang="scss">

@import '../assets/style.scss';

</style>