import React from "react";
import {NavLink} from "react-router-dom";

const NavigatePages = props => {

    return (
        <nav className={'admin-nav admin-nav--styles'}>
            <NavLink
                to={'/admin/creator'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Редактор меню</span>
            </NavLink>
            <NavLink
                exact to={'/admin/orders'}
                className={'admin-nav__item'}
                activeClassName={'admin-nav__item--active'}>
                <span>Заказы</span>
            </NavLink>
        </nav>
    );
};

export default NavigatePages;