import React, {useState, useCallback} from "react";
import {connect} from "react-redux";

import {deleteGroup} from "@js/app/redux/app-reducer";

import ItemCard from "@js/app/components/Creator/ItemCard";
import NewItemCard from "@js/app/components/Creator/NewItemCard";

const ItemGroup = ({ title='', id, idCategory, items, deleteGroup }) => {

    const [inputValue, setInputValue] = useState(title);

    const
        onChange = useCallback(event => {
            // Изменение названия группы
            setInputValue(event.target.value);
        }),
        onClickDeleteSubgroup = useCallback(() => {
            // Удалить группу
            deleteGroup(id, idCategory);
        }, [id, idCategory]);

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
                <span className={'admin-item-group__id-group'}>id:&nbsp;{id}</span>
            </div>
            <div className='admin-item-group__wrapper'>
                {
                    items &&
                    items
                        .sort((itemLast, itemNext) => -(itemLast.id - itemNext.id))
                        .map(item => (
                        <ItemCard
                            key={item.id || Math.floor(Math.random() * new Date())}
                            idItem={item.id}
                            idGroup={id}
                            img={item.img}
                            name={item.name}
                            structure={item.structure}
                            options={item.options}
                            labels={item.labels}
                            weight={item.weight}
                            price={item.price}
                        />
                    ))
                }
                <NewItemCard
                    idCategory={idCategory}
                    idGroup={id}
                />
            </div>
        </div>
    );
};

export default connect(null, ({deleteGroup}))(ItemGroup);