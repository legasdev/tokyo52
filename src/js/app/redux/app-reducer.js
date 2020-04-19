/**
 *
 * Редьюсер приложения
 *
*/
import {appAPI} from "@js/app/api/api";

const
    actionTypes = new Map([

    ]);

const initialState = {

};


// Reducer

const appReducer = (state=initialState, action) => {

    switch (action.type) {
        default:
            return state;
    }

};

export default appReducer;


// Actions


// Thunks
export const addNewSubgroup = (nameGroup, name) => async dispatch => {
    // TODO: Заменить на номральынй запрос с await
    const res = appAPI.addNewSubgroup(nameGroup, name);
};

export const deleteSubgroup = (nameGroup, name) => async dispatch => {
    // TODO: Заменить на номральынй запрос с await
    const res = appAPI.deleteSubgroup(nameGroup, name);
};