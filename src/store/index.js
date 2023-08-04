import { defineStore } from 'pinia'

export const useAppStore = defineStore({
    id: '123',
    state: () => ({
      people: [],
      food: [],
      idPerson: 1,
      idFood: 1,
      idBill: 2,
      whoPaysWhat: [{
        id: 1,
        name: 0,
        food: [],
        people: []
      }],
      result: [],
      reverseResult: []
    }),
    getters: {
      getBillIdByIndex: (state) => { // находим индекс фильма в списке по его id
        return (billInd) => state.whoPaysWhat[billInd].id;
      },
      getBillIndexbyId: (state) => {
        return (billId) => state.whoPaysWhat.map(bill => bill.id).indexOf(billId);
      },
      // getPersonNameById: (state) => {
      //   return (personId) => state.people.map(item => item.id == personId ? item.name : -1);
      // }
    }, 
    actions: {
      addPerson(name){
        this.people.push(
            {
              id: this.idPerson,
              name: name
            }
          );
        this.idPerson++;
      },
      deletePerson(ind){
        this.people.splice(ind, 1);
      },
      addPosition(position){
        this.food.push(
          {
            id: this.idFood,
            ...position
          }
        );

        this.idFood++;
      },
      deletePosition(ind){
        this.food.splice(ind, 1);
      },
      addBillPosition(){
        this.whoPaysWhat.push({
          id: this.idBill,
          name: '',
          food: [],
          people: []
        });
        this.idBill++;
      },
      deleteBillPosition(id){
        const ind = this.whoPaysWhat.findIndex((item) => item.id === id);
        this.whoPaysWhat.splice(ind, 1);
      },
      changeName(data){
        
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].name = data.nameId;
        }
      },
      changeFood(data){
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].food = data.food;
        }
      },
      changePeople(data){
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].people = data.people;
        }
      },
      getPersonNameById(personId){
        const personInd = this.people.findIndex((item) => item.id === personId);
        return this.people[personInd].name;
        //return this.people.map(item => item.id == personId ? item.name : -1);
      },
      calcResult(){
        this.result = [];
        
        for(let i = 0; i < this.whoPaysWhat.length; i++){ //бегаем по массиву счета

          //подсчитываем общую стоимость чека
          const sum = this.whoPaysWhat[i].food.reduce((total, foodItem, index, array) => {
            let foodInd = this.food.findIndex(food => food.id == foodItem);
            return total += parseInt(this.food[foodInd].price);
          }, 0)

          //кол-во людей, которые ели 
          const people = (this.whoPaysWhat[i].people).length;
          
          let result = Math.round(sum / people); //сколько вышло на одного человека

          //теперь в результат записываем кто платил и список должников с тем сколько они должны плательщику

          let indName = this.result.findIndex(item => item.name == this.whoPaysWhat[i].name); //проверка платил ли уже этот человек

          if(indName == -1){
            this.result.push({ //если не платил то добавляем его 
              name: this.whoPaysWhat[i].name,
              debt: []
            })
            
            indName = this.result.findIndex(item => item.name == this.whoPaysWhat[i].name);
          }

          this.whoPaysWhat[i].people.forEach(person => {
            if(this.result[indName].name !== person){
              const indNameDebt = this.result[indName].debt.findIndex(item => item.person == person);
              const duty = indNameDebt !== -1 ? this.result[indName].debt[indNameDebt].duty : 0;
              result += duty;

              if(indNameDebt !== -1) this.result[indName].debt[indNameDebt].duty = result;
              else this.result[indName].debt.push({
                  person,
                  duty: result
              });

            }
          })

          // for(let j = 0; j < (this.whoPaysWhat[i].people).length; j++){

          //   if(this.result[indName].name !== this.whoPaysWhat[i].people[j]) //проверяем не платил ли этот человек сам за себя, если да, то не считаем его в должники самому себе
          //   {

          //     let indNameDebt = this.result[indName].debt.findIndex(item => item.person == this.whoPaysWhat[i].people[j]) 
          //     //проверяем не должен ли уже человек плательщику какую-то сумму
          //     //console.log(indNameDebt)
          //     if(indNameDebt != -1){
          //       result +=  this.result[indName].debt[indNameDebt].duty; //если должен, то суммируем с тем, что он ему должен был

          //       this.result[indName].debt[indNameDebt].duty = result

          //     }
          //     else{
          //       this.result[indName].debt.push( //если не должен, то просто пушим его и его долг
          //         {
          //           person: this.whoPaysWhat[i].people[j],
          //           duty: result
          //         }
          //       )
          //     }
          //   }
          // }

          //console.log(this.result)

          this.resultReverse();
        }
      },
      resultReverse(){
        this.reverseResult = [];
        for(let r = 0; r < this.result.length; r++){ // бегаем по массиву
          for(let d = 0; d < (this.result[r].debt).length; d++){ //хватаем всех должников

            let nameInd = this.reverseResult.findIndex(item => item.name == this.result[r].debt[d].person); //не добавляли ли мы его уже 

            if(nameInd != -1){ //если добавляли, то пихаем кому он еще должен
              this.reverseResult[nameInd].debt.push({
                  person: this.result[r].name,
                  duty: this.result[r].debt[d].duty
              })
            }
            else{
              this.reverseResult.push({ 
                name: this.result[r].debt[d].person,
                debt: [{
                  person: this.result[r].name,
                  duty: this.result[r].debt[d].duty
                }]
              })
            }

          }
        }
        //console.log(this.reverseResult);
      }
    }
  })

