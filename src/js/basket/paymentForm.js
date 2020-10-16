import patterns from "@js/components/patterns";
import number from "less/lib/less/functions/number";

const PaymentForm = {

    init(domNode) {
        this.node = domNode;
        this.submitButton = this.node.querySelector('.js-form-button');
        this.finishWrapper = this.node.querySelector('.form__finish');
        this.finishTitle = this.finishWrapper.querySelector('h2');
        this.finishText = this.finishWrapper.querySelector('p');
        this.finishDevelopmentText = this.finishWrapper.querySelector('.js-form-development-text');
        this.finishCloseButton = this.finishWrapper.querySelector('.js-form-finish-close');

        this.orderNumber = '';

        this._serialize = this._serialize.bind(this);
        this._validate = this._validate.bind(this);
        this._validateInput = this._validateInput.bind(this);
        this._checkIsExcludeInput = this._checkIsExcludeInput.bind(this);
        this._checkIsCorrectEmail = this._checkIsCorrectEmail.bind(this);
        this._checkIsCorrectMsg = this._checkIsCorrectMsg.bind(this);
        this._clearErrorInput = this._clearErrorInput.bind(this);
        this._onPaymentSubmit = this._onPaymentSubmit.bind(this);
        this._onPaymentError = this._onPaymentError.bind(this);
        this._setButtonLoading = this._setButtonLoading.bind(this);
        this._closeFinishForm = this._closeFinishForm.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.node.addEventListener('submit', this.onSubmit);
        this.finishCloseButton.addEventListener('click', this._closeFinishForm);

        return this;
    },

    /**
     * @description Form data collection
     *
     * @param {Node} form - DOMNode Form
     *
     * @returns {Object} - Object of the results of collection from the form
     */
    _serialize(form) {
        return Array.from(form.elements).reduce( (acc, field) => {

            if ( this._checkIsExcludeInput(field, false) ) return acc;

            return {
                ...acc,
                [field.name]: (field.type === 'checkbox') ? field.checked : field.value
            }

        }, {});
    },

    /**
     * @description Processing form fields for validity
     *
     * @param {Node} form - DOMNode Form
     *
     * @returns {Boolean} - true-successful validation / false-validation failed
     */
    _validate(form) {
        let
            isSuccess = true;

        Array.from(form.elements).forEach( element => {

            if ( !this._checkIsExcludeInput(element, true) && element.required) {
                const
                    type = element.getAttribute('type'),
                    value = element.value,
                    result = this._validateInput(value, type);

                if ( !result.ok ) {
                    isSuccess = false;
                    element.parentNode.classList.add('input--error');

                    // Add a handler to check for clicks (error reset)
                    element.addEventListener('input', this._clearErrorInput);
                }
            }

        });

        return isSuccess;
    },

    /**
     * @description Validation of Values
     *
     * @param {String} value - value input
     * @param {String} type - type input
     *
     * @return {Object}
     * ok: true-passed validation / false-validation failed
     * param - Additional information by mistake
     */
    _validateInput(value, type) {
        switch (type) {
            case 'email':
                return {
                    ok: this._checkIsCorrectEmail(value)
                };

            case 'text':
                const minCheck = this._checkIsCorrectMsg(value, 5, true);
                return {
                    ok: minCheck && this._checkIsCorrectMsg(value, 1000, false),
                    param: minCheck
                };

            case 'tel':
                return {
                    ok: value.length >= 5
                };

            default:
                return {ok: value.length > 0};
        }
    },

    /**
     * @description Check if the field is fillable
     *
     * @param {Object} input - Form field
     * @param {Boolean} isValidate - Used for validation?
     *
     * @returns {Boolean} - true-exclude / false-leave
     */
    _checkIsExcludeInput(input, isValidate) {
        return isValidate
            ? (!input.name || input.disabled || input.type === 'submit' || input.type === 'checkbox' || input.name === 'g-recaptcha-response' || input.type === 'hidden')
            : (!input.name || input.disabled || input.type === 'submit' || input.name === 'g-recaptcha-response');
    },

    /**
     * @description Validating Email Values
     *
     * @param {String} value - Entered text
     *
     * @return {Boolean} - true-passed validation / false-validation failed
     */
    _checkIsCorrectEmail(value='') {
        return (!!value.match(patterns.emailPattern) && value.length > 3);
    },


    /**
     * @description Validating a value in a text box
     *
     * @param {String} value - Entered text
     * @param {Number} numSymbols - Number of characters
     * @param {Boolean} isMin - true-check for minimum characters / false-for maximum
     *
     * @return {Boolean} - true-passed validation / false-validation failed
     */
    _checkIsCorrectMsg(value='', numSymbols=5, isMin=true) {
        return isMin ? value.length > numSymbols : value.length < numSymbols;
    },

    /**
     * @description Removing a form error class and removing a text input event in input
     *
     * @param {Event} event - Input event in input
     */
    _clearErrorInput(event) {
        const
            input = event.target;

        input.parentNode.classList.remove('input--error');
        input.removeEventListener('input', this._clearErrorInput);
    },

    /**
     * Делает кнопку доступной или недоступной на время загрузки
     * true - недоступная кнопка
     * false - доступная кнопка
     *
     * @param {Boolean} isLoading
     * @private
     */
    _setButtonLoading(isLoading=false) {
        if (isLoading) {
            this.submitButton.classList.add('btn--load');
            this.submitButton.disabled = true;
        } else {
            this.submitButton.classList.remove('btn--load');
            this.submitButton.disabled = false;
        }
    },

    /**
     * Обработка после успешного платежа
     * Необходимо сделать запрос на сервер
     * для регистрации оплаты
     *
     * @params {Object} order - Ответ сбера после платежа
     */
    async _onPaymentSubmit(order) {
        this._setButtonLoading(true);
        this.node.reset();

        const
            payerInfo = JSON.stringify(this._serialize(this.node)),
            basketInfo = JSON.stringify(window.__TokyoBasket__.getPaymentList()),
            paymentFormData = new FormData();

        paymentFormData.append('payer_info', payerInfo);
        paymentFormData.append('basket_info', basketInfo);
        paymentFormData.append('order', JSON.stringify(order));

        const response = await fetch('/api/payment/finish', {
            method: 'POST',
            body: paymentFormData,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });

        if (response.ok) {
            const
                result = await response.json();

            if (result.status === 'success') {
                this.finishWrapper.classList.add('form__finish--show');
                this.finishTitle.innerText = `Спасибо за ваш заказ №${this.orderNumber}`;
                this.finishText.innerText = `Мы скоро свяжемся с вами для подтверждения.`;
            } else {
                this.finishWrapper.classList.add('form__finish--show');
                this.finishTitle.innerText = `С заказом №${this.orderNumber} что-то пошло не так.`;
                this.finishText.innerText = `Мы скоро свяжемся с вами для уточнения деталей.`;
                this.finishDevelopmentText.innerText = `Response: ${result.error}`;
            }

        } else {
            const
                resultText = await response.text();

            this.finishWrapper.classList.add('form__finish--show');
            this.finishTitle.innerText = `С заказом №${this.orderNumber} что-то пошло не так.`;
            this.finishText.innerText = `Мы скоро свяжемся с вами для уточнения деталей.`;
            this.finishDevelopmentText.innerText = `Response status: ${response.status}; Response text: ${response.statusText}; Result text: ${resultText}`;
        }

        this._setButtonLoading(false);
    },

    /**
     * Обработка ошибки во время проведения платеже
     *
     * @params {Object} order - Ответ сбера после платежа
     */
    _onPaymentError(order) {
        console.group('== Payment Error ==');
        console.log(order);
        console.groupEnd();

        this.finishWrapper.classList.add('form__finish--show');
        this.finishTitle.innerText = `С заказом №${this.orderNumber} что-то пошло не так.`;
        this.finishText.innerText = `Мы скоро свяжемся с вами для уточнения деталей.`;
        this.finishDevelopmentText.innerText = `Result order text: ${JSON.stringify(order)}`;
    },

    /**
     * Скрывает финишную форму
     *
     * @param event
     * @private
     */
    _closeFinishForm(event) {
        this.finishWrapper.classList.remove('form__finish--show');
        this.finishTitle.innerText = '';
        this.finishText.innerText = '';
        this.finishDevelopmentText.innerText = '';
    },


    /*** PUBLIC ***/

    async onSubmit(event) {
        event.preventDefault();

        const
            isValidData = this._validate(this.node),
            basketInfo = window.__TokyoBasket__.getInfo(),
            responseGetOrderNum = await fetch('/api/payment/new', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });

        if (responseGetOrderNum.ok) {
            // TODO: Change line
            const
                // resultNewOrder = await responseGetOrderNum.json();
                resultNewOrder = {status: 'success', id: ''};

            if (resultNewOrder.status === 'success') {
                this.orderNumber = resultNewOrder.id;

                if (isValidData) {
                    ipayCheckout(
                        {
                            amount: basketInfo.price,
                            currency: 'RUB',
                            order_number: '',
                            description: `Заказ Cуши-бар Токио №${this.orderNumber}`
                        },
                        this._onPaymentSubmit,
                        this._onPaymentError,
                    );
                }
            } else {
                this.finishWrapper.classList.add('form__finish--show');
                this.finishTitle.innerText = `Что-то пошло не так.`;
                this.finishText.innerText = `Пожалуйста, попробуйте заного.`;
                this.finishDevelopmentText.innerText = `Response: ${resultNewOrder.error}`;
            }
        } else {
            const
                resultText = await responseGetOrderNum.text();

            this.finishWrapper.classList.add('form__finish--show');
            this.finishTitle.innerText = `Что-то пошло не так.`;
            this.finishText.innerText = `Пожалуйста, попробуйте заного.`;
            this.finishDevelopmentText.innerText = `Response status: ${responseGetOrderNum.status}; Response text: ${responseGetOrderNum.statusText}; Result text: ${resultText}`;
        }
    },

};

const paymentForm = Object.create(PaymentForm).init(document.querySelector('.js-payment-form'));