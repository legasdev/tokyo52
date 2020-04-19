import React, {useState} from "react";

/**
 * Карточка товара
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const ItemCard = props => {

    const id = Math.floor(Math.random() * new Date);
    const imgFile = React.createRef();

    // TODO: Заменить на значения из пропсов
    const
        [imageItem, setImageItem] = useState('/img/productions/rolls/prod.png'),

        nameItemRef = React.createRef(),
        [nameItem, setNameItem] = useState('Ролл «Филадельфия» №1'),
        [nameInputShow, setNameInputShow] = useState(false),

        structureItemRef = React.createRef(),
        [structureItem, setStructureItem] = useState('Филе тунца, обжаренное в черном перце, \n' +
            'Лосось, сливочный сыр, перец Халапенью, \n' +
            'авокадо, айсберг, томат огурец, соус спайси.'),
        [structureInputShow, setStructureInputShow] = useState(false),

        weightClassicRef = React.createRef(),
        [weightClassic, setWeightClassic] = useState('1/260'),
        [weightClassicShow, setWeightClassicShow] = useState(false),

        priceClassicRef = React.createRef(),
        [priceClassic, setPriceClassic] = useState('200'),
        [priceClassicShow, setPriceClassicShow] = useState(false);


    /** Замена на Input **/

    function onClick(event) {
        const
            nameInputLabel = event.target.dataset.name;

        switch (nameInputLabel) {
            case 'name':
                setNameInputShow(true);
                break;

            case 'structure':
                setStructureInputShow(true);
                break;

            case 'weight':
                setWeightClassicShow(true);
                break;

            case 'price':
                setPriceClassicShow(true);
                break;
        }
    }

    function onBlur(event) {
        switch (event.target.name) {
            case 'name':
                setNameInputShow(false);
                break;

            case 'structure':
                setStructureInputShow(false);
                break;

            case 'weight':
                setWeightClassicShow(false);
                break;

            case 'price':
                setPriceClassicShow(false);
                break;
        }
    }

    /** Обработка изменения value в Input **/

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

    function onChange(event) {
        const
            nameInput = event.target.name,
            newValue = event.target.value;

        switch (nameInput) {
            case 'name':
                setNameItem(newValue);
                break;

            case 'structure':
                setStructureItem(newValue);
                break;

            case 'weight':
                setWeightClassic(newValue);
                break;

            case 'price':
                setPriceClassic(newValue);
                break;
        }
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
                <p
                    data-name={'name'}
                    className={`admin-card__name ${!nameInputShow ? '' : 'admin-card__name--hide' }`}
                    onClick={onClick}
                >
                    {nameItem}
                </p>
                <input
                    name={'name'}
                    type={'text'}
                    className={`admin-card__name ${nameInputShow ? '' : 'admin-card__name--hide' }`}
                    placeholder={'Название блюда...'}
                    value={nameItem}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={nameItemRef}
                />
                <p
                    data-name={'structure'}
                    className={`admin-card__structure ${!structureInputShow ? '' : 'admin-card__structure--hide' }`}
                    onClick={onClick}
                >
                    {structureItem}
                </p>
                <textarea
                    name={'structure'}
                    className={`admin-card__structure ${structureInputShow ? '' : 'admin-card__structure--hide' }`}
                    placeholder={'Состав блюда...'}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={structureItemRef}
                    value={structureItem}
                />
                <div className={'admin-card__options'}>
                    <div className={'admin-card__option'}>
                        <input
                            name={'scorched-price'}
                            type={'number'}
                            placeholder={'Цена...'}
                            className={'admin-card__option-input'}
                        />
                        <input
                            name={'scorched-weight'}
                            type={'text'}
                            placeholder={'Вес...'}
                            className={'admin-card__option-input'}
                        />
                        <p className="admin-card__option-description">опаленный</p>
                    </div>
                    <div className={'admin-card__option'}>
                        <input
                            name={'hot-price'}
                            type={'number'}
                            placeholder={'Цена...'}
                            className={'admin-card__option-input'}
                        />
                        <input
                            name={'hot-weight'}
                            type={'text'}
                            placeholder={'Вес...'}
                            className={'admin-card__option-input'}
                        />
                        <p className="admin-card__option-description">«хот»</p>
                    </div>
                    <div className={'admin-card__option'}>
                        <input
                            name={'big-price'}
                            type={'number'}
                            placeholder={'Цена...'}
                            className={'admin-card__option-input'}
                        />
                        <input
                            name={'big-weight'}
                            type={'text'}
                            placeholder={'Вес...'}
                            className={'admin-card__option-input'}
                        />
                        <p className="admin-card__option-description">«биг»</p>
                    </div>
                </div>
                <p
                    data-name={'weight'}
                    className={`admin-card__weight ${!weightClassicShow ? '' : 'admin-card__weight--hide' }`}
                    onClick={onClick}
                >
                    {`${weightClassic} гр.`}
                </p>
                <input
                    name={'weight'}
                    type={'text'}
                    className={`admin-card__weight ${weightClassicShow ? '' : 'admin-card__weight--hide' }`}
                    placeholder={'Вес...'}
                    ref={weightClassicRef}
                    value={weightClassic}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <p
                    data-name={'price'}
                    className={`admin-card__price ${!priceClassicShow ? '' : 'admin-card__price--hide' }`}
                    onClick={onClick}
                >
                    {`${priceClassic}.-`}
                </p>
                <input
                    name={'price'}
                    type={'number'}
                    className={`admin-card__price ${priceClassicShow ? '' : 'admin-card__price--hide' }`}
                    placeholder={'Цена...'}
                    ref={priceClassicRef}
                    value={priceClassic}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
};

export default ItemCard;