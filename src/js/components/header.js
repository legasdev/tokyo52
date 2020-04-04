/**
 * 
 * Работа с шапкой сайта
 * 
*/

import {throttle} from '@js/components/throttle';

const
    header = document.querySelector('.header'),
    maxY = 10;
    
function onScroll(event) {
    event && event.preventDefault();

    const
        windowY = window.scrollY;

    if (windowY > maxY && header.classList.contains('header--top')) {
        header.classList.remove('header--top');
    } else if (windowY < maxY && !header.classList.contains('header--top')) {
        header.classList.add('header--top');
    }
}

onScroll();

window.onscroll = throttle(60, onScroll);