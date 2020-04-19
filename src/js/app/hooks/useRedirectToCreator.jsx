import React from "react";
import {Redirect} from "react-router-dom";

const useRedirectToCreator = nameMenu => {
    console.log(nameMenu)
    if (!nameMenu) return <Redirect to={'/admin/creator/rolls'} />;
    return !nameMenu;
};

export default useRedirectToCreator;