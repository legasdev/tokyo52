import React, {useState, useCallback} from "react";
import {connect} from "react-redux";

import {addNewGroup} from '@js/app/redux/app-reducer';

/**
 * Добавление новой подгруппы
 *
 * @param idCategory
 * @param nameGroup
 * @param addNewGroup
 * @returns {*}
 * @constructor
 */
const NewItemGroup = ({ idCategory, addNewGroup }) => {

    const
        [newNameGroup, setNewNameGroup] = useState('');

    // Обновляет введеное имя в стейте
    const handlerChange = useCallback(event => {
        setNewNameGroup(event.target.value);
    }, []);


    // Отправить запрос на добавление группы
    const handlerClick = useCallback(event => {
        addNewGroup(idCategory, newNameGroup);
        setNewNameGroup('');
    }, [idCategory, newNameGroup]);

    return (
        <div className='admin-item-group admin-item-group--styles admin-item-group--align-items-center'>
            <input
                className={'admin-item-group__input'}
                placeholder={'Название группы...'}
                onChange={handlerChange}
                value={newNameGroup}
            />
            <button 
                className='btn btn--styles btn--stroke btn--min admin-item-group__input-btn'
                onClick={handlerClick}
            >Добавить группу</button>
        </div>
    );
};

export default connect(null, {addNewGroup})(NewItemGroup);