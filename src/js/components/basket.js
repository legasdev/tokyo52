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

        this.name = 'tokyo52-basket';

        this.amount = 0;
        this.count = 0;
        this.list = new Set(JSON.parse(localStorage.getItem(this.name))) || [];

        this.addItem = this.addItem.bind(this);
        this.getList = this.getList.bind(this);

        window.__TokyoBasket__ = this;
        return this;
    },

    /**
     * Добавить товар в корзину
     *
     * @param item - Объект товара
     */
    addItem(item) {
        this.list = [
            ...this.list,
            item
        ];

        localStorage.setItem(this.name, JSON.stringify(this.list));
    },

    getList() {
        return [...this.list];
    },

};

export default Basket;
