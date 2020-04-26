import React, { useCallback } from "react";
import {connect} from "react-redux";

import {addNewItem} from "@js/app/redux/app-reducer";

/**
 * Добавить новый продукт
 *
 * @param idCategory
 * @param idGroup
 * @param addNewItem
 * @returns {*}
 * @constructor
 */
const NewItemCard = ({idCategory, idGroup, addNewItem}) => {

    const
        onAddNewItem = useCallback(() => {
            // Добавить новый продукт
            addNewItem(idCategory, idGroup);
        }, [idCategory, idGroup]);

    return (
        <div
            className={'admin-card admin-card--styles admin-card--margin-bottom'}
            onClick={onAddNewItem}
        >
            <div className={'admin-card__new'}>
                Добавить новый продукт
            </div>
        </div>
    );
};

export default connect(null, {addNewItem})(NewItemCard);