import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";

import useRedirectToHome from "@js/app/hooks/useRedirectToHome";

import NavigateCategory from "@js/app/components/common/NavigateCategory";
import ItemGroup from "@js/app/components/Creator/ItemGroup";
import NewItemGroup from "@js/app/components/Creator/NewItemGroup";
import useRedirectToCreator from "@js/app/hooks/useRedirectToCreator";

const nameMenu = new Map([
    ['rolls', 'Суши и роллы'],
    ['sets', 'Сеты'],
    ['rolls_hot', 'Горячие роллы'],
    ['salad', 'Салаты'],
    ['hot_meat', 'Горячие блюда'],
    ['sup', 'Супы'],
    ['fastfood', 'Фаст-фуд'],
    ['child', 'Детское меню'],
    ['beverages', 'Напитки'],
    ['desert', 'Десерты'],
]);

const CreatorPage = ({ match }) => {

    const isRedirect = useRedirectToHome();
    const isHasNameMenu = useRedirectToCreator(match.params.nameMenu);

    useEffect(() => {
        const
            urlNameMenu = match.params.nameMenu;
        document.title = `${urlNameMenu ? `${nameMenu.get(urlNameMenu)} | ` : ''}Редактор меню | Админ-панель | Суши-бар "Токио"`;
    });

    return (
        isRedirect ||
            isHasNameMenu ||
                <div className='admin-page admin-page--styles'>
                    <h1 className='h1'>Редактор меню</h1>
                    <NavigateCategory />
                    <ItemGroup
                        title={'Классические роллы'}
                        nameGroup={match.params.nameMenu}
                    />
                    <NewItemGroup nameGroup={match.params.nameMenu} />
                </div>
    );
};

export default withRouter(CreatorPage);