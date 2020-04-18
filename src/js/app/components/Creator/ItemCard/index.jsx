import React, {useState} from "react";

const ItemCard = props => {

    const id = Math.floor(Math.random() * new Date);
    const imgFile = React.createRef();

    // TODO: Заменить на значения из пропсов
    const
        [imageItem, setImageItem] = useState('/img/productions/rolls/prod.png'),
        [nameItem, setNameItem] = useState('Ролл «Филадельфия» №1'),
        [structureItem, setStructureItem] = useState('Филе тунца, обжаренное в черном перце, \n' +
            'Лосось, сливочный сыр, перец Халапенью, \n' +
            'авокадо, айсберг, томат огурец, соус спайси.');

    // Обработка добавления картинки
    function onChangeImage() {
        const
            file = imgFile.current.files[0];
        if (!file.type.match('image.*')) {
            // TODO: Если не файл, то ошибка добавления
        }
        const reader = new FileReader();
        reader.onload = (function() {
            return function(event) {
                setImageItem(event.target.result);
            };
        })();
        reader.readAsDataURL(file);
    }

    // Обработка изменения имени
    function onChangeName(event) {
        setNameItem(event.target.value);
    }

    // Обработка изменения описания
    function onChangeStructure(event) {
        setStructureItem(event.target.value);
    }

    return (
        <div className={'admin-card admin-card--styles admin-card--margin-bottom'}>
            <div className={'admin-card__wrapper'}>
                <div className={'admin-card__img'} style={{'backgroundImage': `url("${imageItem}")`}}>
                    <label
                        htmlFor={`${id}`}
                        className={'admin-card__img-label'}
                    />
                    <input
                        type={'file'}
                        id={`${id}`}
                        ref={imgFile}
                        accept={'image/*'}
                        className={'admin-card__img-input'}
                        onChange={onChangeImage}
                    />
                </div>
                <input
                    type={'text'}
                    className={'admin-card__name'}
                    placeholder={'Название блюда...'}
                    value={nameItem}
                    onChange={onChangeName}
                />
                <textarea
                    className={'admin-card__structure'}
                    placeholder={''}
                    onChange={onChangeStructure}
                >
                    {structureItem}
                </textarea>
            </div>
        </div>
    );
};

export default ItemCard;