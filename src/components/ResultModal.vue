<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ props }">
          <v-btn 
            @click="store.calcResult()"
            :disabled="isDisabled"
            v-bind="props"
            class="app-button"
            variant="tonal" 
            block rounded="xl"
          >
            кто кому что должен
          </v-btn>
        </template>
  
        <v-card class="app-card">

          <v-btn
            @click="btn = 'whom'"
            class="card-button"
            variant="tonal"
          >
            Кому кто
          </v-btn>

          <v-btn
            @click="btn = 'who'"
            class="card-button"
            variant="tonal"
          >
            Кто кому
          </v-btn>

          <v-card-text v-if="btn == 'whom'">
            <div 
              v-for="(bill, i) in store.result"
              :key="i"
              class="result-position"
            >   
              <div class="payer">
                Кому должны: {{ store.getPersonNameById(bill.name) }}
              </div>
              
              <div 
                v-for="(debt, ind) in bill.debt"
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
            <v-btn 
              @click="dialog = false"
              variant="tonal" 
              rounded="xl" 
              block 
            >
              Понял принял заплатил
            </v-btn>
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

  const btn = ref('whom')

  const props = defineProps({
    isDisabled: {
        type: Boolean,
        required: true,
        default: true
    }
})

  </script>

<style lang="scss">

@import '../assets/style.scss';

</style>
