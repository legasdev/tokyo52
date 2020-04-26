import React, {useState, useCallback} from "react";
import {item as createItem} from "@js/app/common/item";
import {connect} from "react-redux";
import {saveItem, deleteItem} from "@js/app/redux/app-reducer";

/**
 * Карточка товара
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const ItemCard = ({idGroup, idItem, img='', name='',
                      structure='',
                      options=[], labels={},
                      weight='', price='',
                      saveItem, deleteItem}) => {

    const
        id = idItem || Math.floor(Math.random() * new Date);
    const
        imgFile = React.createRef();

    const
        [isNeedSave, setIsNeedSave] = useState(idItem === 0);

    // Основные поля
    const
        [imageItem, setImageItem] = useState(img),
        [imageFile, setImageFile] = useState(null),
        [nameItem, setNameItem] = useState(name),
        [structureItem, setStructureItem] = useState(structure),
        [weightClassic, setWeightClassic] = useState(weight),
        [priceClassic, setPriceClassic] = useState(price);

    // Опции
    const
        [scorchedPrice, setScorchedPrice] = useState(options[0] ? options[0].price : ''),
        [scorchedWeight, setScorchedWeight] = useState(options[0] ? options[0].weight : ''),
        [hotPrice, setHotPrice] = useState(options[1] ? options[1].price : ''),
        [hotWeight, setHotWeight] = useState(options[1] ? options[1].weight : ''),
        [bigPrice, setBigPrice] = useState(options[2] ? options[2].price : ''),
        [bigWeight, setBigWeight] = useState(options[2] ? options[2].weight : '');

    /** Сохранить **/
    const
        onClickSave = useCallback(() => {
            setIsNeedSave(false);
            saveItem(createItem(
                idGroup,
                idItem,
                '',
                nameItem,
                structureItem,
                weightClassic,
                priceClassic,
                {
                    hit: false,
                    new: false
                },
                [
                    {
                        name: "scorched",
                        price: scorchedPrice,
                        weight: scorchedWeight
                    },
                    {
                        name: "hot",
                        price: hotPrice,
                        weight: hotWeight
                    },
                    {
                        name: "big",
                        price: bigPrice,
                        weight: bigWeight
                    },
                ]
                ),
                imageFile,
                idItem === 0
            );
        });

    /** Удалить **/
    const
        onClickDelete = useCallback(() => {
            if (idItem !== 0) {
                deleteItem(idItem);
            }
        });

    /** Замена на Input **/
    const
        onBlur = useCallback(event => {
            setIsNeedSave(true);
        });

    /** Обработка изменения value в Input **/
    const
        onChangeImage = useCallback(() => {
            // Обработка добавления картинки
            const
                file = imgFile.current.files[0];
            if (!file.type.match('image.*')) {
                return false;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (function() {
                return function(event) {
                    setImageItem(event.target.result);
                };
            })();
            reader.readAsDataURL(file);
            setIsNeedSave(true);
        }),
        onChange = useCallback(event => {
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

                case 'scorched-price':
                    setScorchedPrice(newValue);
                    break;

                case 'scorched-weight':
                    setScorchedWeight(newValue);
                    break;

                case 'hot-price':
                    setHotPrice(newValue);
                    break;

                case 'hot-weight':
                    setHotWeight(newValue);
                    break;

                case 'big-price':
                    setBigPrice(newValue);
                    break;

                case 'big-weight':
                    setBigWeight(newValue);
                    break;
            }
        });

    return (
        <div className={'admin-card admin-card--margin-bottom'}>
            <div className={'admin-card__main admin-card--styles'}>
                <div className={'admin-card__wrapper'}>
                    <span className={'admin-card__wrapper-id'}>id:&nbsp;{idItem}</span>
                    <button
                        className={'admin-card__wrapper-close'}
                        onClick={onClickDelete}
                    ><i/><i/></button>
                    <div className={'admin-card__wrapper-inner'}>
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
                        <textarea
                            name={'name'}
                            className={`admin-card__name`}
                            placeholder={'Название блюда...'}
                            value={nameItem}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        <textarea
                            name={'structure'}
                            className={`admin-card__structure`}
                            placeholder={'Состав блюда...'}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={structureItem}
                        />
                        <div className={'admin-card__options'}>
                            <div className={'admin-card__option'}>
                                <input
                                    name={'scorched-price'}
                                    type={'number'}
                                    placeholder={'Цена...'}
                                    className={'admin-card__option-input'}
                                    value={scorchedPrice}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <input
                                    name={'scorched-weight'}
                                    type={'text'}
                                    placeholder={'Вес...'}
                                    className={'admin-card__option-input'}
                                    value={scorchedWeight}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <p className="admin-card__option-description">опаленный</p>
                            </div>
                            <div className={'admin-card__option'}>
                                <input
                                    name={'hot-price'}
                                    type={'number'}
                                    placeholder={'Цена...'}
                                    className={'admin-card__option-input'}
                                    value={hotPrice}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <input
                                    name={'hot-weight'}
                                    type={'text'}
                                    placeholder={'Вес...'}
                                    className={'admin-card__option-input'}
                                    value={hotWeight}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <p className="admin-card__option-description">«хот»</p>
                            </div>
                            <div className={'admin-card__option'}>
                                <input
                                    name={'big-price'}
                                    type={'number'}
                                    placeholder={'Цена...'}
                                    className={'admin-card__option-input'}
                                    value={bigPrice}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <input
                                    name={'big-weight'}
                                    type={'text'}
                                    placeholder={'Вес...'}
                                    className={'admin-card__option-input'}
                                    value={bigWeight}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                                <p className="admin-card__option-description">«биг»</p>
                            </div>
                        </div>
                    </div>
                    <div className={'admin-card__wrapper-inner'}>
                        <input
                            name={'weight'}
                            type={'text'}
                            className={`admin-card__weight`}
                            placeholder={'Вес...'}
                            value={weightClassic}
                            onChange={onChange}
                            onBlur={onBlur}
                        /><span className={'admin-card__weight'}>гр.</span>
                        <input
                            name={'price'}
                            type={'number'}
                            className={`admin-card__price`}
                            placeholder={'Цена...'}
                            value={priceClassic}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                    </div>
                </div>
            </div>
            <div className={`admin-card__save-wrapper ${isNeedSave ? 'admin-card__save-wrapper--show' : '' }`}>
                <button
                    className={'admin-card__save-wrapper-button'}
                    onClick={onClickSave}
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default connect(null, {saveItem, deleteItem})(ItemCard);