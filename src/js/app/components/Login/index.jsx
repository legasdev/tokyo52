import React, {useEffect} from "react";

import Input from "@js/app/components/Input";

const LoginPage = props => {

    useEffect(() => {
        document.title = 'Авторизация | Админ-панель | Суши-бар "Токио"';
    });

    function onSubmit(event) {
        event.preventDefault();

        console.log(event);
    }

    return (
        <div className='login-page '>
            <div className={'login-form login-form--styles'}>
                <form className={'login-form__wrapper'} onSubmit={onSubmit}>
                    <Input
                        name={'login'}
                        id={'login-form__login'}
                        type={'text'}
                        label={'Логин'}
                    />
                    <Input
                        name={'password'}
                        id={'login-form__password'}
                        className={'login-form__input'}
                        type={'password'}
                        label={'Пароль'}
                    />
                    <button
                        className={'btn btn--styles btn--main login-form__btn'}
                        type={'submit'}
                    >
                        <span>Войти</span>
                        <img className="btn__icon" src="/img/icons/arrow.svg" alt=""/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;