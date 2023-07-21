<template>
    <div class="app-select">

        <div
            @click="isOpen = !isOpen"
            class="title"
        >
            <p>
                {{ selected }}
                <caret-down-outlined />
            </p>
            
        </div>

        <div 
            v-if="isOpen"
            class="options"
        >
            <p
                v-for="option in options"
                :key="option.id"
                @click="onClickSelectOption(option)"
            >   
                {{ option.name }}
            </p>
        </div>

    </div>
</template>

<script setup>
import {CaretDownOutlined} from '@ant-design/icons-vue';
import { ref } from 'vue'

const isOpen = ref(false);

const emit = defineEmits(['selected'])

const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: []
    },
    selected: {
        type: String,
        default: ''
    }
})

function onClickSelectOption(option){
    isOpen.value = false;
    emit('selected', option);
}

// function closeSelect(){
//     isOpen.value = false;
// }

</script>

<style>

.app-select{
    position: relative;
    width: 200px;
    cursor: pointer;
}


.title{
    border: solid 1px rgb(100, 88, 117);
    border-radius: 20px;
    background-color: rgb(100, 88, 117);
    color: aliceblue;   
    
}

.title:hover{
    border-color: aliceblue;
}

.title p{
    margin: 10px 10px 10px 10px;
    justify-content: space-between;
    display: flex;
    align-items: center;
}

.options{
    border: solid 1px;
    position: absolute;
    top: 50px;
    right: 0;
    width: 100%;
    background-color: rgb(100, 88, 117);
    border-radius: 10px;
    color: aliceblue;
}

.options p{
    margin: 10px;
}

.options p:hover{
    /* background-color: #e7e7e7;
    color: black; */
    color: rgb(126, 111, 150);
}
</style>