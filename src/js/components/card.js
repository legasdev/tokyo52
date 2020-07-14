/**
 *
 * Управление карточкой товара
 *
 */

const
    Card = {

        init(domNode) {
            this.node = domNode;
            this.labelsOptions = [...domNode.querySelectorAll('.card__option-label')];
            this.buttonAmountPlus = domNode.querySelector('.card__input-btn');
            this.buttonAmountMinus = domNode.querySelector('.card__input-btn--bottom');
            this.priceDiv = domNode.querySelector('.card__price');
            this.standartPrice = parseFloat(this.priceDiv.innerText);
            this.amountDiv = domNode.querySelector('.card__input-num');
            this.amount = 1;

            console.log(this.labelsOptions);

            this.onChangeOption = this.onChangeOption.bind(this);
            this.onClickAmount = this.onClickAmount.bind(this);
            this.setPriceText = this.setPriceText.bind(this);
            this.setAmountText = this.setAmountText.bind(this);

            this.labelsOptions.forEach(label => {
                label.addEventListener('click', this.onChangeOption, false);
            });

            this.buttonAmountPlus.addEventListener('click', () => this.onClickAmount(true));
            this.buttonAmountMinus.addEventListener('click', () => this.onClickAmount(false));
        },

        onChangeOption(event) {
            const
                target = event.target.hasAttribute('for')
                    ? event.target
                    : event.target.parentNode,
                input =  document.getElementById(target.getAttribute('for')),
                isChecked = input.checked;

            this.setPriceText(
                (!isChecked
                    ? parseFloat(target.querySelector('.card__option-price').innerText)
                    : parseFloat(this.standartPrice)
                ) * parseInt(this.amountDiv.innerText)
            );

            this.labelsOptions.forEach(label => {
                if (target.parentNode.querySelector('input') !== label.parentNode.querySelector('input')) {
                    label.parentNode.querySelector('input').checked = false;
                }
            });
        },

        onClickAmount(isPlus) {
            const
                selectInput = this.labelsOptions.filter(label => label.parentNode.querySelector('input').checked).shift();

            this.amount = isPlus
                ? this.amount + 1
                : (this.amount - 1 <= 1)
                    ? 1
                    : this.amount - 1;

            this.setAmountText(this.amount);

            this.setPriceText(
                (selectInput
                    ? parseFloat(selectInput.querySelector('.card__option-price').innerText)
                    : this.standartPrice
                ) * this.amount
            );
        },

        setPriceText(newPrice) {
            this.priceDiv.innerText = `${newPrice}.-`;
        },

        setAmountText(newAmount) {
            this.amountDiv.innerText = newAmount || 1;
        },
    };


const
    cards = [...document.querySelectorAll('.card')]
        .map(card => Object.create(Card).init(card));