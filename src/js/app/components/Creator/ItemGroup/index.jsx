import React, {useState, useCallback} from "react";
import {connect} from "react-redux";

import {deleteGroup, renameGroup} from "@js/app/redux/app-reducer";

import ItemCard from "@js/app/components/Creator/ItemCard";
import NewItemCard from "@js/app/components/Creator/NewItemCard";

const ItemGroup = ({ title='', id, idCategory, items, localItems, deleteGroup, renameGroup }) => {

    // Название группы
    const [nameGroupValue, setNameGroupValue] = useState(title);

    const
        onChange = useCallback(event => {
            // Изменение названия группы
            setNameGroupValue(event.target.value);
        }),
        onClickDeleteGroup = useCallback(() => {
            // Удалить группу
            deleteGroup(idCategory, id);
        }, [idCategory, id]),
        onClickRenameGroup = useCallback(() => {
            // Переименовать группу
            renameGroup(idCategory, id, nameGroupValue);
        }, [idCategory, id, nameGroupValue]);

    return (
        <div className='admin-item-group admin-item-group--styles'>
            <div className='admin-item-group__header'>
                <input
                    className={'admin-item-group__input'}
                    placeholder={'Название группы...'}
                    value={nameGroupValue}
                    onChange={onChange}
                />
                <button
                    className='btn btn--styles btn--stroke btn--min admin-item-group__header-btn admin-item-group__header-btn--margin-right'
                    onClick={onClickDeleteGroup}
                >Удалить группу</button>
                <button
                    className='btn btn--styles btn--stroke btn--min admin-item-group__header-btn'
                    onClick={onClickRenameGroup}
                >Переименовать</button>
                <span className={'admin-item-group__id-group'}>id:&nbsp;{id}</span>
            </div>
            <div className='admin-item-group__wrapper'>
                {
                    items &&
                    items
                        .sort((itemLast, itemNext) => itemLast.id - itemNext.id)
                        .map(item => (
                        <ItemCard
                            key={item.id || Math.floor(Math.random() * new Date())}
                            idCategory={idCategory}
                            idGroup={id}
                            idItem={item.id}
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
                {
                    localItems &&
                    localItems.map(item => (
                        <ItemCard
                            key={item.id || Math.floor(Math.random() * new Date())}
                            idCategory={idCategory}
                            idGroup={id}
                            idItem={item.id}
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

export default connect(null, ({deleteGroup, renameGroup}))(ItemGroup);