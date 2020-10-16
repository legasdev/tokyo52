/**
 *
 * Скрипты страницы корзины
 *
 */

import '@js/components/header';
import {updateCardsList, getCardsList} from '@js/components/card';

import drawBasket from './drawBasket';
import './paymentForm';

drawBasket();
updateCardsList(true);

const
    cardsList = getCardsList();

cardsList.forEach(item => {
    item.setPrice({
        default: {...item.price.default}
    });
});