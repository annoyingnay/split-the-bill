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
      payers: [],
      debtors: []
    }),
    getters: {
      getBillIdByIndex: (state) => { //айдишник по индексу
        return (billInd) => state.whoPaysWhat[billInd].id;
      }
    },
    actions: {
      addPerson(name) { //пушим нового человека
        this.people.push(
            {
              id: this.idPerson,
              name: name
            }
          );
        this.idPerson++;
      },
      deletePerson(id) { //удаляем человека
        const ind = this.people.findIndex((item) => item.id === id);
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
      deletePosition(id) { //удаляем позицию
        const ind = this.food.findIndex((item) => item.id === id);
        this.food.splice(ind, 1);
      },
      addBillPosition() { //добавляем чек
        this.whoPaysWhat.push({
          id: this.idBill,
          name: '',
          food: [],
          people: []
        });
        this.idBill++;
      },
      deleteBillPosition(id) { //удаляем чек
        const ind = this.whoPaysWhat.findIndex((item) => item.id === id);
        this.whoPaysWhat.splice(ind, 1);
      },
      changeName(data) { //меняем имя плательщика
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].name = data.nameId;
        }
      },
      changeFood(data) { //меняем список продуктов
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].food = data.food;
        }
      },
      changePeople(data) { //меняем людей, за которых платили
        const index = this.whoPaysWhat.findIndex((item) => item.id === data.id);

        if (index >= 0) {
          this.whoPaysWhat[index].people = data.people;
        }
      },
      getPersonNameById(personId) { //получаем имя плательщика по айди
        const personInd = this.people.findIndex((item) => item.id === personId);
        return this.people[personInd].name;
      },
      payersFunc() { //считаем кому кто сколько должен //payers
        this.payers = [];

        for(let i = 0; i < this.whoPaysWhat.length; i++) { //бегаем по массиву счета

          //подсчитываем общую стоимость чека
          const sum = this.whoPaysWhat[i].food.reduce((total, foodItem, index, array) => {
            let foodInd = this.food.findIndex(food => food.id === foodItem);
            return total += parseInt(this.food[foodInd].price);
          }, 0)

          //кол-во людей, которые ели
          const people = (this.whoPaysWhat[i].people).length;

          let result = Math.round(sum / people); //сколько вышло на одного человека

          //теперь в результат записываем кто платил и список должников с тем сколько они должны плательщику

          let indName = this.payers.findIndex(item => item.name === this.whoPaysWhat[i].name); //проверка платил ли уже этот человек

          if(indName === -1) {
            this.payers.push({ //если не платил то добавляем его
              name: this.whoPaysWhat[i].name,
              debt: []
            })

            indName = this.payers.findIndex(item => item.name === this.whoPaysWhat[i].name);
          }

          this.whoPaysWhat[i].people.forEach(person => { //проверяем не платил ли этот человек сам за себя, если да, то не считаем его в должники самому себе
            if(this.payers[indName].name !== person) {
              const indNameDebt = this.payers[indName].debt.findIndex(item => item.person === person);
              //проверяем не должен ли уже человек плательщику какую-то сумму
              //если должен, то суммируем с тем, что он ему должен был
              const duty = indNameDebt !== -1 ? this.payers[indName].debt[indNameDebt].duty : 0;
              result += duty;

              if(indNameDebt !== -1) {
                this.payers[indName].debt[indNameDebt].duty = result;
              } else {
                this.payers[indName].debt.push({ //если не должен, то просто пушим его и его долг
                  person,
                  duty: result
                });
              }
            }
          })
        }
      },
      debtorsFunc() { //переписываем массив результата, чтоб узнать кто кому сколько должен
        this.debtors = [];

        this.payers.forEach((payer) => { // бегаем по массиву
          payer.debt.forEach((debt) => { //хватаем всех должников
            const existingPerson = this.debtors.find((p) => p.name === debt.person); //не добавляли ли мы его уже

            if (existingPerson) { //если добавляли, то пихаем кому он еще должен
              existingPerson.debt.push({
                person: payer.name,
                duty: debt.duty
              });
            } else {
              this.debtors.push({
                name: debt.person,
                debt: [{
                  person: payer.name,
                  duty: debt.duty
                }]
              });
            }
          });
        });

      },
      resultHard() { //result
        this.payersFunc();
        this.debtorsFunc();

        // у нас есть два массива, в одном - плательщики и список тех, кто им должен, во втором - должники и список тех, кому они должны
        // если  один и тот же человек является и должником и плательщиком, значит возможно есть человек, которому он должен и который должен ему
        // если мы находим такого человека, то пересчитываем кто кому сколько должен у обоих людей

        this.payers.forEach((payer) => { //для каждого плательщика
          const debtor = this.debtors.find((p) => p.name === payer.name); //сопоставляем ему должника с таким же именем (айдишником)
          if (debtor) { //если такие пары нашлись
            payer.debt.forEach((payerDebt) => { //то теперь делаем то же самое, и ищем совпадения по списку людей которым должны/кто должен
              const debtorDebt = debtor.debt.find((dd) => dd.person === payerDebt.person);

              if (debtorDebt) { //если такая пара нашлась
                if (payerDebt.duty >= debtorDebt.duty) { //смотрим чтобы одна сумма была больше другой
                  payerDebt.duty -= debtorDebt.duty; //вычитаем из большего меньшее

                  const nameId = this.payers.findIndex((item) => item.name === debtorDebt.person); //ищем человека в списке плательщиков
                  const personId = this.payers[nameId].debt.findIndex((item) => item.person === payer.name);
                  this.payers[nameId].debt[personId].duty = 0;

                  const name2 = this.debtors.findIndex((item) => item.name === debtorDebt.person); //ищем человека в списке должников
                  const person2 = this.debtors[name2].debt.findIndex((item) => item.person === payer.name);

                  this.debtors[name2].debt[person2].duty -= debtorDebt.duty;
                  debtorDebt.duty = 0;
                }


              }
            });
          }
        });
      }
    }
  })

