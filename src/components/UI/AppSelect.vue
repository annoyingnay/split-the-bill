<template>
    <div class="app-select">

        <div
            @click="isOpen = !isOpen"
            class="title"
        >
            <p class="text-button">
                {{ selected }}
                <v-icon icon="mdi-chevron-down"></v-icon>
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
                class="text-button"
            >
                {{ option.name }}
            </p>
        </div>

    </div>
</template>

<script setup>
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

</script>

<style lang="scss">

.app-select{
    position: relative;
    width: 600px;
    cursor: pointer;
}

.title{
    border: solid 1px rgb(100, 88, 117);
    border-radius: 20px;
    background-color: rgb(100, 88, 117);
    color: aliceblue;
}

.title:hover{
    background-color: rgb(114, 103, 131);
}

.title p{
    margin: 10px 10px 10px 10px;
    justify-content: space-between;
    display: flex;
    align-items: center;
}

.options{
    position: absolute;
    top: 65px;
    right: 0;
    width: 100%;
    background-color: rgb(114, 103, 131);
    border-radius: 20px;
    color: aliceblue;
    z-index: 2;
}

.options p{
    margin: 10px;
}

.options p:hover{
    color: rgb(79, 69, 94);
}
</style>