/**
 *
 * Управление карточкой товара
 *
 */

import Basket from '@js/components/basket';

const
    basket = new Object(Basket).init();

const
    Card = {

        init(domNode, basket) {
            this.node = domNode;
            this.basket = basket;
            this.labelsOptions = [...domNode.querySelectorAll('.card__option-label')];
            this.buttonAmountPlus = domNode.querySelector('.card__input-btn');
            this.buttonAmountMinus = domNode.querySelector('.card__input-btn--bottom');
            this.buttonAdd = domNode.querySelector('.card__add-btn');
            this.priceDiv = domNode.querySelector('.card__price');
            this.amountDiv = domNode.querySelector('.card__input-num');
            this.img = {
                src: domNode.querySelector('.card__img').src,
                srcset: domNode.querySelector('.card__img').srcset,
            };
            this.weight = domNode.querySelector('.card__weight').innerText;

            this.name = this.node.querySelector('card__title');
            this.structure = this.node.querySelector('card__structure');
            this.amount = 1;
            this.currentLabel = 'default';
            this.price = {
                default: {
                    name: 'Стандарт',
                    value: parseInt(this.priceDiv.innerText)
                },
                ...this.labelsOptions.reduce((acc, item) => ({
                    ...acc,
                    [item.getAttribute('for')]: {
                        name: item.querySelector('.card__option-description').innerText,
                        value: parseInt(item.querySelector('.card__option-price').innerText),
                    }
                }), {})
            };

            this.onChangeOption = this.onChangeOption.bind(this);
            this.onClickAmount = this.onClickAmount.bind(this);
            this.setPriceText = this.setPriceText.bind(this);
            this.setAmountText = this.setAmountText.bind(this);
            this.addItem = this.addItem.bind(this);

            this.labelsOptions.forEach(label => label.addEventListener('click', this.onChangeOption));

            this.buttonAmountPlus.addEventListener('click', () => this.onClickAmount(true));
            this.buttonAmountMinus.addEventListener('click', () => this.onClickAmount(false));
            this.buttonAdd.addEventListener('click', this.addItem);
        },

        onChangeOption(event) {
            const
                target = event.target.hasAttribute('for')
                    ? event.target
                    : event.target.parentNode,
                inputID = target.getAttribute('for'),
                input = document.getElementById(inputID),
                isChecked = input.checked;

            this.currentLabel = inputID;

            if (isChecked) {
                this.currentLabel = 'default';
            }

            const
                priceToPrint = this.price[this.currentLabel].value * this.amount;

            this.setPriceText(priceToPrint);

            this.labelsOptions.forEach(label => {
                label.parentNode.querySelector('input').checked = false;
            });

            input.checked = isChecked;
        },

        onClickAmount(isPlus) {

            this.amount = isPlus
                ? this.amount + 1
                : (this.amount - 1 <= 1)
                    ? 1
                    : this.amount - 1;

            this.setAmountText(this.amount);

            const
                priceToPrint = this.price[this.currentLabel].value * this.amount;

            this.setPriceText(priceToPrint);
        },

        setPriceText(newPrice) {
            this.priceDiv.innerText = `${newPrice}.-`;
        },

        setAmountText(newAmount) {
            this.amountDiv.innerText = newAmount || 0;
        },

        // Добавление в корзину
        addItem() {
            basket.addItem({
                name: this.node.querySelector('.card__title').innerText,
                structure: this.node.querySelector('.card__structure').innerText,
                price: this.price[this.currentLabel].value * this.amount,
                amount: this.amount,
                option: {
                    name: this.price[this.currentLabel].name,
                    price: this.price[this.currentLabel].value,
                },
                anyOptions: {...this.price},
                img: {...this.img},
                weight: this.weight,
            })
        },
    };

const
    cards = [...document.querySelectorAll('.card')]
        .map(card => Object.create(Card).init(card, basket));
