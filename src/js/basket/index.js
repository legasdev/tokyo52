/**
 *
 * Скрипты страницы корзины
 *
 */

import '@js/components/header';
import {updateCardsList, getCardsList} from '@js/components/card';

import './drawBasket';

updateCardsList();

const
    cardsList = getCardsList(),
    listItems = window.__TokyoBasket__.getList();

console.log(listItems)
console.log(cardsList)

cardsList.forEach(item => {
    console.log(item)
    item.setPrice({
        default: {
            name: "Стандарт",
            value: 200
        }
    });
})