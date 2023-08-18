<template>
    <div class="nav-bar">
        <v-toolbar
            :elevation="5"
            height="50"
        >
            <div class="toolbar-item">
                <router-link
                    to="/"
                    active-class="active"
                    class="app-link"
                >
                    <v-icon icon="mdi-account-multiple" style="font-size: 40px;"></v-icon>
                    Кто кушал
                </router-link>
            </div>

            <div class="toobar-item">
                <router-link
                    v-if="isPeopleFilled"
                    to="/food"
                    active-class="active"
                    class="app-link"
                >
                    <v-icon icon="mdi-food" style="font-size: 35px;"></v-icon>
                    Что кушал
                </router-link>

                <span
                    v-else
                    class="disabled-link"
                >
                    <v-icon icon="mdi-food" style="font-size: 35px;"></v-icon>
                    Что кушал
                    <v-tooltip
                        activator="parent"
                        location="bottom"
                    >
                        Добавьте минимум двух людей
                    </v-tooltip>
                </span>
            </div>

            <div class="toolbar-item">
            <router-link
                v-if="isFoodFilled && isPeopleFilled"
                to="/pay"
                active-class="active"
                class="app-link"
            >
                <v-icon icon="mdi-cash" style="font-size: 40px;"></v-icon>
                Кто за что платил
            </router-link>

                <span
                    v-else
                    class="disabled-link"
                >
                    <v-icon icon="mdi-cash" style="font-size: 40px;"></v-icon>
                    Кто за что платил
                    <v-tooltip
                        activator="parent"
                        location="bottom"
                    >
                        Добавьте минимум двух людей и две позиции
                    </v-tooltip>
                </span>
            </div>
        </v-toolbar>
    </div>
</template>

<script setup>

import { ref, watch } from 'vue'
import { useAppStore } from '../store/index';

const store = useAppStore();

const isPeopleFilled = ref(false);
const isFoodFilled = ref(false);

watch(store.people, () => { //смотрим, добавлены ли были два человека, если нет то блокируем роутер линк
    isPeopleFilled.value = store.people.length >= 2;
})

watch(store.food, () => { //смотрим, добавлены ли были две позиции по еде, если нет то блокируем роутер линк
    isFoodFilled.value = store.food.length >= 2;
})

</script>

<style lang="scss" scoped>

@import '../assets/style.scss';

</style>