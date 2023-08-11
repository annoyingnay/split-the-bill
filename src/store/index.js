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
      getBillIdByIndex: (state) => { //айдишник по индексу
        return (billInd) => state.whoPaysWhat[billInd].id;
      }
    }, 
    actions: {
      addPerson(name){ //пушим нового человека
        this.people.push(
            {
              id: this.idPerson,
              name: name
            }
          );
        this.idPerson++;
      },
      deletePerson(ind){ //удаляем человека
        this.people.splice(ind, 1);
      },
      addPosition(position){ //пушим новую позицию
        this.food.push(
          {
            id: this.idFood,
            ...position
          }
        );

        this.idFood++;
      },
      deletePosition(ind){ //удаляем позицию
        this.food.splice(ind, 1);
      },
      addBillPosition(){ //добавляем чек
        this.whoPaysWhat.push({
          id: this.idBill,
          name: '',
          food: [],
          people: []
        });
        this.idBill++;
      },
      deleteBillPosition(id){ //удаляем чек
        const ind = this.whoPaysWhat.findIndex((item) => item.id === id);
        this.whoPaysWhat.splice(ind, 1);
      },
      changeName(data){ //меняем имя плательщика
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].name = data.nameId;
        }
      },
      changeFood(data){ //меняем список продуктов
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].food = data.food;
        }
      },
      changePeople(data){ //меняем людей, за которых платили
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].people = data.people;
        }
      },
      getPersonNameById(personId){ //получаем имя плательщика по айди
        const personInd = this.people.findIndex((item) => item.id === personId);
        return this.people[personInd].name;
      },
      calcResult(){ //считаем кому кто сколько должен 
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

          this.whoPaysWhat[i].people.forEach(person => { //проверяем не платил ли этот человек сам за себя, если да, то не считаем его в должники самому себе
            if(this.result[indName].name !== person){
              const indNameDebt = this.result[indName].debt.findIndex(item => item.person == person);
              //проверяем не должен ли уже человек плательщику какую-то сумму
              //если должен, то суммируем с тем, что он ему должен был
              const duty = indNameDebt !== -1 ? this.result[indName].debt[indNameDebt].duty : 0;
              result += duty;

              if(indNameDebt !== -1) this.result[indName].debt[indNameDebt].duty = result;
              else this.result[indName].debt.push({ //если не должен, то просто пушим его и его долг
                  person,
                  duty: result
              });

            }
          })
          this.resultReverse();
        }
      },
      resultReverse(){ //переписываем массив результата, чтоб узнать кто кому сколько должен
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
      }
    }
  })

