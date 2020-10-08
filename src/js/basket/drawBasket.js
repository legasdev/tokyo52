/**
 *
 * Выводит на страницу выранные продукты
 *
 */

const
    wrapperNode = document.querySelector('.list__wrapper'),
    listItems = window.__TokyoBasket__.getList();

listItems.length > 0 && (wrapperNode.innerHTML = '');

listItems.forEach(item => {
    const
        newSection = document.createElement('section');

    newSection.classList.add('card');
    newSection.classList.add('card--styles');
    newSection.classList.add('card--margin-bottom');

    const
        optionsList = Object.keys(item.anyOptions).map(keyOption => ({
            ...item.anyOptions[keyOption],
            option: keyOption,
            isSelected: item.anyOptions[keyOption].name === item.option.name,
        })).filter(option => option.name !== 'Стандарт');

    newSection.innerHTML = `
        <section class="card card--styles card--margin-bottom">
                <div class="card__wrapper">
                    <img class="card__img" src="${item.img.src}" srcset="${item.img.srcset}" alt="${item.name}" />
                    <h3 class="h3 card__title">${item.name}</h3>
                    <p class="card__structure">${item.structure}</p>
                    <div class="card__options">
                        ${optionsList.reduce((optionsString, {option, name, value, isSelected}) => optionsString + `
                            <div class="card__option">
                                <input class="card__option-input" name="contact" type="checkbox" id="${option}" ${isSelected ? 'checked' : ''}>
                                <label class="card__option-label" for="${option}">
                                    <p class="card__option-price">${value}.-</p>
                                    <p class="card__option-description">${name}</p>
                                </label>
                            </div>
                        `, '')}
                    </div>
                    <p class="card__weight">${item.weight}</p>
                    <div class="card__footer">
                        <p class="card__price">${item.price}.-</p>
                        <div class="card__ui">
                            <div class="card__input">
                                <p class="card__input-num">${item.amount}</p>
                                <div class="card__input-ui">
                                    <button class="card__input-btn"><span></span><span></span></button>
                                    <button class="card__input-btn card__input-btn--bottom"><span></span><span></span></button>
                                </div>
                            </div>
                            <button class="btn btn--styles btn--stroke btn--min card__add-btn">В корзину</button>
                        </div>
                    </div>
                </div>
            </section>
    `;

    wrapperNode.appendChild(newSection);
});
