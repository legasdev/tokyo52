/**
 * Сортировка опций в айтеме
 *
 * @param item
 * @returns {{options: *}}
 */

function sortOptionInItem(item) {
    return {
        ...item,
        options: item.options.sort(function (a, b) {
            if (a.name > b.name) {
                return -1;
            } else if (a.name < b.name) {
                return 1;
            }
            return 0;
        })
    }
}

export default sortOptionInItem;