/**
 *
 * Управление карточкой товара
 *
 */

import Basket from '@js/components/basket';
import drawBasket from "@js/basket/drawBasket";

const
    basket = new Object(Basket).init();

let
    cardsList = [];

const
    Card = {

        init(domNode, basket, isAutoSave) {

            // DOMNode
            this.node = domNode;
            this.basket = basket;
            this.isAutoSave = isAutoSave;
            this.customId = Math.floor(Math.random() * Date.now());

            this.labelsOptions = [...this.node.querySelectorAll('.card__option-label')];
            this.priceDiv = this.node.querySelector('.card__price');
            this.amountDiv = this.node.querySelector('.card__input-num');

            this.buttonAmountPlus = this.node.querySelector('.card__input-btn');
            this.buttonAmountMinus = this.node.querySelector('.card__input-btn--bottom');
            this.buttonAdd = this.node.querySelector('.card__add-btn');
            this.buttonRemove = this.node.querySelector('.card__remove');

            this.img = {
                src: this.node.querySelector('.card__img').src,
                srcset: this.node.querySelector('.card__img').srcset,
            };
            this.weight = this.node.querySelector('.card__weight').innerText;

            this.nameNode = this.node.querySelector('.card__title');
            this.structure = this.node.querySelector('.card__structure');

            // Info
            this.amount = parseInt(this.amountDiv.innerText) || 1;
            this.currentLabel = this.node.querySelector('input[checked]')?.id || 'default';
            this.price = {
                default: {
                    name: 'Стандарт',
                    value: parseInt(`${parseInt(this.priceDiv.innerText) / parseInt(this.amountDiv.innerText)}`)
                },
                ...this.labelsOptions.reduce((acc, item) => ({
                    ...acc,
                    [item.getAttribute('for')]: {
                        name: item.querySelector('.card__option-description').innerText,
                        value: parseInt(item.querySelector('.card__option-price').innerText),
                    }
                }), {})
            };

            // Private methods
            this._setPriceText = this._setPriceText.bind(this);
            this._setAmountText = this._setAmountText.bind(this);
            this._addToBasket = this._addToBasket.bind(this);
            this._isAutoUpdate = this._isAutoUpdate.bind(this);
            this._createObjectItem = this._createObjectItem.bind(this);
            this._onClickAmount = this._onClickAmount.bind(this);
            this._onChangeOption = this._onChangeOption.bind(this);

            // Public methods
            this.addItem = this.addItem.bind(this);
            this.removeItem = this.removeItem.bind(this);
            this.setPrice = this.setPrice.bind(this);

            // Add events
            this.labelsOptions.forEach(label => label.addEventListener('click', this._onChangeOption));

            this.buttonAmountPlus.addEventListener('click', () => this._onClickAmount(true));
            this.buttonAmountMinus.addEventListener('click', () => this._onClickAmount(false));
            this.buttonAdd?.addEventListener('click', this.addItem);
            this.buttonRemove?.addEventListener('click', this.removeItem);

            return this;
        },


        /** PRIVATE **/

        /**
         * Вывод информации по цене
         *
         * @param newPrice
         */
        _setPriceText(newPrice) {
            this.priceDiv.innerText = `${newPrice}.-`;
        },

        /**
         * Отобразить новое количество товара
         *
         * @param newAmount
         * @private
         */
        _setAmountText(newAmount) {
            this.amountDiv.innerText = newAmount || 0;
        },

        /**
         * Выбор дополнительной опции продукта
         *
         * @param event
         */
        _onChangeOption(event) {
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

            this._setPriceText(priceToPrint);

            this.labelsOptions.forEach(label => {
                label.parentNode.querySelector('input').checked = false;
            });

            input.checked = isChecked;

            if (this.isAutoSave) {
                console.log('ss')
                this.basket.changeOptionItem(this._createObjectItem());
                drawBasket();
                updateCardsList(true);
            }
        },

        /**
         * Изменение количества продукта
         *
         * @param isPlus
         */
        _onClickAmount(isPlus) {

            this.amount = isPlus
                ? this.amount + 1
                : (this.amount - 1 <= 1)
                    ? 1
                    : this.amount - 1;

            this._setAmountText(this.amount);

            const
                priceToPrint = this.price[this.currentLabel].value * this.amount;

            this._setPriceText(priceToPrint);

            this._isAutoUpdate();
        },

        /**
         * Добавляет данный товар в корзину
         *
         * @private
         */
        _addToBasket() {
            this.basket.addItem(this._createObjectItem());
        },

        /**
         * Возвращает объект товара для корзины
         *
         * @private
         */
        _createObjectItem() {
            return ({
                id: this.customId,
                name: this.nameNode.innerText,
                structure: this.structure.innerText,
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

        /**
         * Обновить товар и карточки
         *
         * @private
         */
        _isAutoUpdate() {
            if (this.isAutoSave) {
                this._addToBasket();
                drawBasket();
                updateCardsList(true);
            }
        },

        /** PUBLIC **/

        /**
         * Добавить товар в корзину
         *
         */
        addItem() {
            this._addToBasket();
        },

        /**
         * Удалить товар из корзины
         *
         */
        removeItem() {
            this.basket.removeItem({
                name: this.nameNode.innerText,
                optionName: this.price[this.currentLabel].name,
            });

            drawBasket();
            updateCardsList(true);
        },

        /**
         * Обновление информации о цене товара
         *
         * @param priceObject - Объект цены
         */
        setPrice(priceObject) {
            priceObject && (this.price = {
                ...this.price,
                ...priceObject,
            });
        },
    };

/**
 * Обновляет список продуктов на странице
 *
 * @param {Boolean} isBasketPage - Карточки в корзине
 */
export function updateCardsList(isBasketPage=false) {
    cardsList = [...document.querySelectorAll('.card')]
        .map(card => Object.create(Card).init(card, basket, isBasketPage));
}

/**
 * Возращает копию списка товаров на странице
 *
 */
export function getCardsList() {
    return [...cardsList];
}