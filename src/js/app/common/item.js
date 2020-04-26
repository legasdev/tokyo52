/**
 * Объект товара
 *
 * @param groupId
 * @param id
 * @param img
 * @param name
 * @param structure
 * @param weight
 * @param price
 * @param labels
 * @param options
 * @returns {{img: *, price: *, name: *, options: *, weight: *, id: *, structure: *, labels: *}}
 */
export function item(
    groupId,
    id=0,
    img='/img/logo.png',
    name='',
    structure='',
    weight='',
    price='',
    labels={hit: false, new: false},
    options=[
        {
            name: "scorched",
            price: "",
            weight: ""
        },
        {
            name: "hot",
            price: "",
            weight: ""
        },
        {
            name: "big",
            price: "",
            weight: ""
        },
    ]
) {

    return {
        groupId,
        id,
        img,
        name,
        structure,
        options,
        labels,
        weight,
        price
    }
}