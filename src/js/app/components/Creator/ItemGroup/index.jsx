import React, {useState} from "react";
import ItemCard from "@js/app/components/Creator/ItemCard";

const ItemGroup = ({ title='' }) => {

    const [inputValue, setInputValue] = useState(title);

    function onChange(event) {
        setInputValue(event.target.value);
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
                <button className='btn btn--styles btn--stroke btn--min admin-item-group__header-btn'>Удалить группу</button>
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

export default ItemGroup;