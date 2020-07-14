/**
 *
 * Управлени формой обратной связи
 *
 */

const
    form = document.querySelector('.js-form'),
    nameField = form.querySelector('input[name=name]'),
    emailField = form.querySelector('input[name=email]'),
    msgField = form.querySelector('textarea');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(nameField.value);
    console.log(emailField.value);
    console.log(msgField.value);
    form.reset();
});