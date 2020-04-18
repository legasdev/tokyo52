import React, {useState} from "react";

const NewItemGroup = props => {

    const [nameGroup, setNameGroup] = useState('');

    function onChange(event) {
        setNameGroup(event.target.value);
    }

    return (
        <div className='admin-item-group admin-item-group--styles admin-item-group--align-items-center'>
            <input
                className={'admin-item-group__input'}
                placeholder={'Название группы...'}
                onChange={onChange}
                value={nameGroup}
            />
            <button className='btn btn--styles btn--stroke btn--min admin-item-group__input-btn'>Добавить группу</button>
        </div>
    );
};

export default NewItemGroup;