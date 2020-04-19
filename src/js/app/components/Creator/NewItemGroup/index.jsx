import React, {useState} from "react";
import {connect} from "react-redux";

import {addNewSubgroup} from '@js/app/redux/app-reducer';

/**
 * Добавление новой подгруппы
 *
 * @param nameGroup
 * @param addNewGroup
 * @returns {*}
 * @constructor
 */
const NewItemGroup = ({ nameGroup, addNewSubgroup }) => {

    const [newNameGroup, setNewNameGroup] = useState('');

    function onChange(event) {
        setNewNameGroup(event.target.value);
    }

    // Отправить запрос на добавление группы
    function onClick() {
        addNewSubgroup(nameGroup, newNameGroup);
    }

    return (
        <div className='admin-item-group admin-item-group--styles admin-item-group--align-items-center'>
            <input
                className={'admin-item-group__input'}
                placeholder={'Название группы...'}
                onChange={onChange}
                value={newNameGroup}
            />
            <button 
                className='btn btn--styles btn--stroke btn--min admin-item-group__input-btn'
                onClick={onClick}
            >Добавить группу</button>
        </div>
    );
};

export default connect(null, {addNewSubgroup})(NewItemGroup);