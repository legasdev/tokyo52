import React, {useState} from "react";
import {connect} from "react-redux";

import {deleteSubgroup} from "@js/app/redux/app-reducer";

import ItemCard from "@js/app/components/Creator/ItemCard";

const ItemGroup = ({ title='', nameGroup, deleteSubgroup }) => {

    const [inputValue, setInputValue] = useState(title);

    function onChange(event) {
        setInputValue(event.target.value);
    }

    // Удалить подгруппу
    function onClickDeleteSubgroup() {
        deleteSubgroup(nameGroup, title);
    }

    return (
        <div className='admin-item-group admin-item-group--styles'>
            <div className='admin-item-group__header'>
                <input
                    className={'admin-item-group__input'}
                    placeholder={'Название группы...'}
                    value={inputValue}
                    onChange={onChange}
                />
                <button
                    className='btn btn--styles btn--stroke btn--min admin-item-group__header-btn'
                    onClick={onClickDeleteSubgroup}
                >Удалить группу</button>
            </div>
            <div className='admin-item-group__wrapper'>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>
        </div>
    );
};

export default connect(null, ({deleteSubgroup}))(ItemGroup);