import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import { createSelector } from 'reselect'

import useRedirectToHome from "@js/app/hooks/useRedirectToHome";
import {getAllGroups, setCurrentPage} from "@js/app/redux/app-reducer";
import {idsCategoryByName as idsCategory, nameMenu} from "@js/app/common/categoriesName";

import NavigateCategory from "@js/app/components/common/NavigateCategory";
import ItemGroup from "@js/app/components/Creator/ItemGroup";
import NewItemGroup from "@js/app/components/Creator/NewItemGroup";
import useRedirectToCreator from "@js/app/hooks/useRedirectToCreator";

// Получает группы в категории
const selectGroupsInCategory = createSelector(
    state => state.app.categories,
    state => state.app.currentNamePage,
    (categories, currentNamePage) => {
        const
            category = categories && categories[currentNamePage],
            groups = category && category.groups && Object.values(category.groups);
        return groups && groups.sort((groupFirst, groupNext) => groupFirst.id - groupNext.id);
    }
);

const CreatorPage = ({ match, getAllGroups, setCurrentPage }) => {

    const isRedirect = useRedirectToHome();
    const isHasNameMenu = useRedirectToCreator(match.params.nameMenu);

    const
        [idCategory, setIdCategory] = useState(idsCategory.get(match.params.nameMenu)),
        [isLoadedAllGroups, setIsLoadedAllGroups] = useState(false);

    const
        groups = useSelector(selectGroupsInCategory);

    // Сменить Title
    useEffect(() => {
        const
            urlNameMenu = match.params.nameMenu;
        document.title = `${urlNameMenu ? `${nameMenu.get(urlNameMenu)} | ` : ''}Редактор меню | Админ-панель | Суши-бар "Токио"`;
    });

    // Запомнить id текущей категории
    useEffect(() => {
        setCurrentPage(match.params.nameMenu);
        setIdCategory(idsCategory.get(match.params.nameMenu));
    }, [match]);

    // Загрузить все категории
    // если они еще не были загружены
    useEffect(() => {
        if (!isLoadedAllGroups) {
            getAllGroups();
            setIsLoadedAllGroups(true);
        }
    }, [isLoadedAllGroups]);

    return (
        isRedirect ||
            isHasNameMenu ||
                <div className='admin-page admin-page--styles'>
                    <h1 className='h1'>Редактор меню</h1>
                    <NavigateCategory />
                    {
                        groups &&
                        groups.map(group =>
                            <ItemGroup
                                key={group.id}
                                id={group.id}
                                title={group.name}
                                idCategory={idCategory}
                                items={group.goods}
                            />)
                    }
                    <NewItemGroup
                        idCategory={idCategory}
                    />
                </div>
    );
};

export default compose(
    connect(null, {getAllGroups, setCurrentPage}),
    withRouter
)(CreatorPage);