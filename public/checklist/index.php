<?php

$tasks = json_encode("{
        tasks: [
          {
            id: '0',
            value: 'api task',
            completed: false
          },
          {
            id: '1',
            value: 'Билеты',
            completed: false
          },
          {
            id: '2',
            value: 'Паспорта/заграны',
            completed: false
          },
          {
            id: '3',
            value: 'Деньги наличными',
            completed: false
          },
          {
            id: '4',
            value: 'Деньги на карту',
            completed: false
          },
          {
            id: '5',
            value: 'Деньги на телефон',
            completed: false
          },
          {
            id: '6',
            value: 'Фотоаппарат',
            completed: false
          },
          {
            id: '7',
            value: 'Пополнить мобильныйe wee',
            completed: false
          }
        ]
      }");
echo $tasks;
