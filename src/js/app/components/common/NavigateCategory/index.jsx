import React from "react";
import {NavLink} from "react-router-dom";

const NavigateCategory = props => {

    return (
        <div className='admin-nav admin-nav--styles admin-nav--min'>
            <NavLink
                exact to={'/admin/creator/rolls'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Суши и роллы</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/sets'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Сеты</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/pizza'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Пицца</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/rolls_hot'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Горячие роллы</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/salad'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Салаты</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/hot_meat'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Горячие блюда</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/sup'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Супы</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/fastfood'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Фаст-фуд</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/child'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Детское меню</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/beverages'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Напитки</span>
            </NavLink>
            <NavLink
                exact to={'/admin/creator/desert'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Десерты</span>
            </NavLink>
        </div>
    );
};

export default NavigateCategory;