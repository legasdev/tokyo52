import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import {login} from "@js/app/redux/auth-reducer";

import Input from "@js/app/components/common/Input";

const LoginPage = ({ login }) => {

    const [inputData, setInputData] = useState({login: '', password: ''});
    const isAuth = useSelector(state => state.auth.auth);

    useEffect(() => {
        document.title = 'Авторизация | Админ-панель | Суши-бар "Токио"';
    });

    function onSubmit(event) {
        event.preventDefault();
        login(inputData.login, inputData.password);
    }

    function getInputValue(name, value) {
        setInputData({
            ...inputData,
            [name]: value
        });
    }

    return (
        isAuth ?
            <Redirect to={'/admin/creator'} /> :
            <div className='login-page'>
                <div className={'login-form login-form--styles'}>
                    <form className={'login-form__wrapper'} onSubmit={onSubmit}>
                        <Input
                            name={'login'}
                            id={'login-form__login'}
                            type={'text'}
                            label={'Логин'}
                            onChange={getInputValue}
                        />
                        <Input
                            name={'password'}
                            id={'login-form__password'}
                            className={'login-form__input'}
                            type={'password'}
                            label={'Пароль'}
                            onChange={getInputValue}
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

export default connect(null, { login })(LoginPage);