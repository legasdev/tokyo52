import React, {useEffect} from "react";

import useRedirectToHome from "@js/app/hooks/useRedirectToHome";

const OrdersPage = props => {

    const isRedirect = useRedirectToHome();

    useEffect(() => {
        document.title = 'Заказы | Админ-панель | Суши-бар "Токио"';
    });

    return (
        isRedirect ||
        <div className='admin-page admin-page--styles'>
            <h1 className={'h1'}>Заказы</h1>
        </div>
    );
};

export default OrdersPage;