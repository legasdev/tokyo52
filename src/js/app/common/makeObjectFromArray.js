/**
 * Создает объект на базе массива
 * (Ключем для объектов является
 * id внутреннего объекта)
 *
 * @param {Array} array - Массив объектов
 * @returns {*} - Объект на базе массива
 */
export function makeObjectFromArray(array) {
    return array.reduce((acc, item) => ({
        ...acc,
        [item.id]: {
            ...item
        }
    }), {});
}