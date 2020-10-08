/**
 *
 * Корзина с товарами
 *
 */

const Basket = {

    init() {
        if (window.__TokyoBasket__) {
            return window.__TokyoBasket__;
        }

        this._name = 'tokyo52-basket';

        // CSS Classes
        this._cssList = new Map([
            ['basket-info', 'js-t-basket-info']
        ]);

        // Info
        const stringFromStorage = localStorage.getItem(this._name);

        this._amount = 0;
        this._count = 0;
        this._list = JSON.parse(stringFromStorage) || [];

        this._list.length === 0 && localStorage.setItem(this._name, '[]');

        // Templates
        this._drawInfoTemplate = '{/amount/} шт. / {/price/}.-';

        // DOM Nodes
        this._basketInfoNode = document.querySelector(`.${this._cssList.get('basket-info')}`);

        // Private
        this._checkOnIdentical = this._checkOnIdentical.bind(this);
        this._combinesObjects = this._combinesObjects.bind(this);
        this._addNewObject = this._addNewObject.bind(this);
        this._countAmount = this._countAmount.bind(this);
        this._countPrice = this._countPrice.bind(this);
        this._updateInfo = this._updateInfo.bind(this);
        this._draw = this._draw.bind(this);
        this._saveInStorage = this._saveInStorage.bind(this);
        this._loadFromStorage = this._loadFromStorage.bind(this);

        // Public
        this.addItem = this.addItem.bind(this);
        this.getList = this.getList.bind(this);

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
     * то объединяем эти объекты: складываем количества
     * и высчитываем новую цену в зависимости от цены опции
     * нового объекта
     *
     * @param {Object} item - Объект товара
     * @returns {{Object}[]} - Новый список товаров в корзине
     * @private
     */
    _combinesObjects(item) {
        return this._list.map(itemObject => {
            const
                isCommonName = itemObject.name === item.name,
                isCommonOption = itemObject.option.name === item.option.name,
                isIdentical = isCommonName && isCommonOption,
                amount = +itemObject.amount + +item.amount,
                price = amount * item.option.price;

            return isIdentical
                ? ({
                    ...itemObject,
                    amount,
                    price,
                })
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
        this._count = this._countPrice();
    },

    /**
     * Выводит общую информацию о корзине
     *
     * @private
     */
    _draw() {
        let
            template = this._drawInfoTemplate;

        template = template.replace('{/amount/}', this._amount);
        template = template.replace('{/price/}', this._count);

        this._basketInfoNode.innerText = template;
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
            ? this._combinesObjects(item)
            : this._addNewObject(item);

        this._saveInStorage();
        this._updateInfo();
        this._draw();
    },

    /**
     * Возвращает копию списка
     *
     * @returns {Object[]}
     */
    getList() {
        return [...this._list];
    },

};

export default Basket;
