/**
 * 
 * Фиксирует шапку при открытии меню
 * 
*/

export default function AddListenerToBtn(maxY) {

    const
        body = document.querySelector('.body'),
        buttonClass = 'mobile-menu',
        button = document.querySelector(`#${buttonClass}`),
        header = document.querySelector('.header');


    button.addEventListener('change', function clickOnButton(event) {

        const
            windowY = window.scrollY;

        if (windowY < maxY) {
            if (header.classList.contains('header--top')) {
                header.classList.remove('header--top');
            } else {
                header.classList.add('header--top');
            }
        } else {
            header.classList.remove('header--top');
        }

        body.classList.toggle('body--overflow');
        event.preventDefault();
    });

};

