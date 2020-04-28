/**
 * Создает объект на базе массива
 * (Ключем для объектов является
 * id внутреннего объекта)
 *
 * @param {Array} array - Массив объектов
 * @param isNullGoods - Без товарова
 * @returns {*} - Объект на базе массива
 */
export function makeObjectFromArray(array, isNullGoods=false) {
    return array.reduce((acc, item) => ({
        ...acc,
        [item.id]: {
            ...item,
            goods: !isNullGoods && item.goods.map(product => {
                const
                    options = [...product.options];
                options.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    } else if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });
                return ({
                    ...product,
                    options
                })
            })
        }
    }), {});
}