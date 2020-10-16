/**
 *
 * Корзина с товарами
 *
 */
import drawBasket from "@js/basket/drawBasket";
import {updateCardsList} from "@js/components/card";

const Basket = {

    init() {
        if (window.__TokyoBasket__) {
            return window.__TokyoBasket__;
        }

        this._name = 'tokyo52-basket';

        // CSS Classes
        this._cssList = new Map([
            ['basket-info', 'js-t-basket-info'],
            ['page-price-info', 'js-t-price-info']
        ]);

        // Info
        const stringFromStorage = localStorage.getItem(this._name);

        this._amount = 0;
        this._price = 0;
        this._list = JSON.parse(stringFromStorage) || [];

        this._list.length === 0 && localStorage.setItem(this._name, '[]');

        // Templates
        this._drawInfoTemplate = '{/amount/} шт. / {/price/}.-';

        // DOM Nodes
        this._basketInfoNode = document.querySelector(`.${this._cssList.get('basket-info')}`);
        this._pagePriceNode = document.querySelector(`.${this._cssList.get('page-price-info')}`);

        // Private
        this._checkOnIdentical = this._checkOnIdentical.bind(this);
        this._updateObjects = this._updateObjects.bind(this);
        this._changeOptionInObject = this._changeOptionInObject.bind(this);
        this._addNewObject = this._addNewObject.bind(this);
        this._removeObject = this._removeObject.bind(this);
        this._countAmount = this._countAmount.bind(this);
        this._countPrice = this._countPrice.bind(this);
        this._updateInfo = this._updateInfo.bind(this);
        this._draw = this._draw.bind(this);
        this._saveInStorage = this._saveInStorage.bind(this);
        this._loadFromStorage = this._loadFromStorage.bind(this);

        // Public
        this.addItem = this.addItem.bind(this);
        this.changeOptionItem = this.changeOptionItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.getList = this.getList.bind(this);
        this.getPaymentList = this.getPaymentList.bind(this);
        this.getInfo = this.getInfo.bind(this);

        this._updateInfo();
        this._draw();

        window.__TokyoBasket__ = this;
        return this;
    },


    /** PRIVATE **/

    /**
     * Сравнивает объекты товаров на идентичность
     *
     * @param {Object} item - Объект товара
     * @returns {Boolean} - Совпадает (true) или нет (false)
     * @private
     */
    _checkOnIdentical(item) {
        return !!this._list
                .find(itemObject => itemObject.name === item.name && itemObject.option.name === item.option.name);
    },

    /**
     * Если есть совпадающие объекты (по названию и названию опции),
     * то заменяем объект новым
     *
     * @param {Object} item - Объект товара
     * @returns {{Object}[]} - Новый список товаров в корзине
     * @private
     */
    _updateObjects(item) {
        return this._list.map(itemObject => {
            const
                isCommonName = itemObject.name === item.name,
                isCommonOption = itemObject.option.name === item.option.name,
                isIdentical = isCommonName && isCommonOption;

            return isIdentical
                ? ({...item})
                : itemObject;
        });
    },

    /**
     * Сменяет опцию в объекте товара
     * в корзине
     *
     * @param {Object} item - Объект товара
     * @returns {{Object}[]} - Новый список товаров в корзине
     * @private
     */
    _changeOptionInObject(item) {
        return this._list.map(itemObject => {
            const
                isIdentical = itemObject.id === item.id;

            return isIdentical
                ? ({...item})
                : itemObject;
        });
    },

    /**
     * Добавляет товар в список
     *
     * @param {Object} item - Объект товара
     * @returns {Object[]} - Новый список товаров
     * @private
     */
    _addNewObject(item) {
        return [
            ...this._list,
            item
        ];
    },

    /**
     * Возвращает копию списка без переданного объекта
     *
     * @param {Object} item - {name: String, optionName: String}
     * @returns {Object[]} - Обновленный список товаров
     * @private
     */
    _removeObject({name, optionName}) {
        return this._list.filter(item => !(item.name === name && item.option.name === optionName));
    },

    /**
     * Считает общее количество товаров в корзине
     *
     * @returns {Number} - Количетство товаров
     * @private
     */
    _countAmount() {
        return this._list.reduce((count, {amount}) => count + amount, 0);
    },

    /**
     * Считает общую сумму
     *
     * @returns {Number} - Сумма
     * @private
     */
    _countPrice() {
        return this._list.reduce((count, {price}) => count + price, 0);
    },

    /**
     * Обновляет информацию в корзине
     * о количестве товара
     * и общей стоимости
     *
     * @private
     */
    _updateInfo() {
        this._amount = this._countAmount();
        this._price = this._countPrice();
    },

    /**
     * Выводит общую информацию о корзине
     *
     * @private
     */
    _draw() {
        let
            template = this._drawInfoTemplate;

        template = template.replace('{/price/}', this._price);
        template = template.replace('{/amount/}', this._amount);

        this._basketInfoNode.innerText = template;

        this._pagePriceNode && (this._pagePriceNode.innerText = this._price);
    },

    /**
     * Записать список в localStorage
     *
     */
    _saveInStorage() {
        localStorage.setItem(this._name, JSON.stringify(this._list));
    },

    /**
     * Получить список из localStorage
     *
     * @returns {Object[]}
     */
    _loadFromStorage() {
        return JSON.parse(localStorage.getItem(this._name));
    },


    /** PUBLIC **/

    /**
     * Добавить товар в корзину
     *
     * @param {Object} item - Объект товара
     */
    addItem(item) {
        this._list = this._checkOnIdentical(item)
            ? this._updateObjects(item)
            : this._addNewObject(item);

        this._saveInStorage();
        this._updateInfo();
        this._draw();
    },

    /**
     * Смена опции в объекте товара
     *
     * @param item
     */
    changeOptionItem(item) {
        // console.log(item)

        // this._list = this._changeOptionInObject(item);

        this._saveInStorage();
        this._updateInfo();
        this._draw();
    },

    /**
     * Удалить товар в корзине
     *
     * @param {Object} item - Объект товара {name: String, optionName: String}
     */
    removeItem(item) {
        this._list = this._removeObject(item);

        this._saveInStorage();
        this._updateInfo();
        this._draw();

        drawBasket();
        updateCardsList();
    },

    /**
     * Возвращает копию списка
     *
     * @returns {Object[]}
     */
    getList() {
        return [...this._list];
    },

    /**
     * Возвращает список для отправки на сервер
     * (только необходимые данные)
     *
     * @returns {Object[]}
     */
    getPaymentList() {
        return this._list.map(item => ({
            name: item.name,
            option: item.option.name,
            amount: item.amount,
            price: item.price,
            weight: item.weight,
        }));
    },

    /**
     * Возвращает объект с основной информацией
     *
     * @returns {Object}
     */
    getInfo() {
        return {
            price: this._countPrice(),
        };
    },

};

export default Basket;
