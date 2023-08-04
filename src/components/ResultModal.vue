<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn variant="tonal"
            style="color:aliceblue; background-color: rgb(100, 88, 117);"
            block rounded="xl"
            v-bind="props"
            @click="store.calcResult()"
          >
            кто кому что должен
          </v-btn>
        </template>
  
        <v-card style="background-color: rgb(100, 88, 117); color: aliceblue; border-radius: 20px;">
          <v-btn
            variant="tonal"
            style="color:aliceblue; background-color: rgb(100, 88, 117);"
            @click="btn = 'whom'"
          >
            Кому кто
          </v-btn>
          <v-btn
            variant="tonal"
            style="color:aliceblue; background-color: rgb(100, 88, 117);"
            @click="btn = 'who'"
          >
            Кто кому
          </v-btn>
          <v-card-text v-if="btn == 'whom'">
            <div v-for="(bill, i) in store.result"
                :key="i"
                class="result-position"
            >   
              <div class="payer">
                Кому должны: {{ store.getPersonNameById(bill.name) }}
              </div>
              
              <div v-for="(debt, ind) in bill.debt"
                  :key="ind"
                  class="debt"
              >
                  Кто должен: {{ store.getPersonNameById(debt.person) }}
                  Сколько должен: {{ debt.duty }}
              </div>
            </div>
          </v-card-text>
          <v-card-text v-if="btn == 'who'">
            <div 
              v-for="(bill, i) in store.reverseResult"
              :key="i"
              class="result-position"
            >   
              <div class="payer">
                Кто должен: {{ store.getPersonNameById(bill.name) }}
              </div>
              
              <div 
                v-for="(debt, ind) in bill.debt"
                :key="ind"
                class="debt"
              >
                Кому должен: {{ store.getPersonNameById(debt.person) }}
                Сколько должен: {{ debt.duty }}
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="tonal" rounded="xl" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAppStore } from '../store/index';

  const dialog = ref(false);
  const store = useAppStore();

  const resultReverse = ref([]);

  const btn = ref('who')

  </script>

<style>

.result-position{
  margin-bottom: 20px;
}

.payer{
  font-size: 20px;
}



</style>
