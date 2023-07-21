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
      result: []
    }),
    getters: {
      getBillIdByIndex: (state) => { // находим индекс фильма в списке по его id
        return (billInd) => state.whoPaysWhat[billInd].id;
      },
      getBillIndexbyId: (state) => {
        return (billId) => state.whoPaysWhat.map(bill => bill.id).indexOf(billId);
      }
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
      calcResult(){
        let resultArr = []
        
        for(let i = 0; i < this.whoPaysWhat.length; i++){
          let sum = 0;
          let people = 0;
          let result = 0;
          

          for(let j = 0; j < (this.whoPaysWhat[i].food).length; j++){
            let foodId = this.whoPaysWhat[i].food[j];
            let foodInd = this.food.findIndex(food => food.id == foodId);
            sum += parseInt(this.food[foodInd].price);

          }
          people = (this.whoPaysWhat[i].people).length;
          console.log('Id: ' + this.whoPaysWhat[i].id)
          console.log('Итого: ' + sum);
          console.log('Сколько ело: ' + people)
          console.log('Кто должен: ' + this.whoPaysWhat[i].people)
          console.log('Кому должен: ' + this.whoPaysWhat[i].name)
          
          result = sum / people;
          console.log('По сколько каждый должен: ' + result)

          resultArr.push({
            name: this.whoPaysWhat[i].name,
            people: this.whoPaysWhat[i].people,
            duty: result
          })
          console.log(resultArr)
        }

        for(let i = 0; i< resultArr.length; i++){
          for(let j = 0; j<(resultArr[i].people).length; j++){
            if(resultArr[i].name === resultArr[i].people[j]){
              resultArr[i].people.splice(j, 1);
            }
          }
        }

        console.log(resultArr);

      }
    }
  })

  // либо придобавлении позиции в счет сразу подсчитывать сумму, а потом уже пересчитать кол-во человек и разделить