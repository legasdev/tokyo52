import React, {useEffect} from "react";

import useRedirectToHome from "@js/app/hooks/useRedirectToHome";

import NavigateCategory from "@js/app/components/common/NavigateCategory";
import ItemGroup from "@js/app/components/Creator/ItemGroup";
import NewItemGroup from "@js/app/components/Creator/NewItemGroup";

const CreatorPage = props => {

    const isRedirect = useRedirectToHome();

    useEffect(() => {
        document.title = 'Редактор меню | Админ-панель | Суши-бар "Токио"';
    });

    return (
        isRedirect ||
        <div className='admin-page admin-page--styles'>
            <h1 className='h1'>Редактор меню</h1>
            <NavigateCategory />
            <ItemGroup title={'Классические роллы'} />
            <NewItemGroup />
        </div>
    );
};

export default CreatorPage;