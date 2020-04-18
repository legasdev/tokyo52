/**
 *
 * Редьюсер авторизации
 *
 */
import {authAPI} from "@js/app/api/api";

const
    actionTypes = new Map([
        ['auth', 'app/auth'],
        ['initialized', 'app/initialized']
    ]);

const initialState = {
    initialized: false,
    auth: false,
    token: null
};


// Reducer

const authReducer = (state=initialState, action) => {

    switch (action.type) {

        case actionTypes.get('initialized'):
            return {
                ...state,
                initialized: true
            };

        case actionTypes.get('auth'):
            return {
                ...state,
                auth: action.status,
                token: action.token,
            };

        default:
            return state;
    }

};

export default authReducer;


// Actions
export const _setAuth = (status, token) => ({type: actionTypes.get('auth'), status, token});
export const _initialized = () => ({type: actionTypes.get('initialized')});

// Thunks

/**
 * Проверка авторизации
 *
 * @returns {Function}
 */
export const getAuth = () => async dispatch => {
    const myToken = localStorage.getItem('token');
    if (myToken) {
        try {
            const res = await authAPI.getAuth(myToken);
            if (res) {
                dispatch(_setAuth(true, localStorage.getItem('token')));
            }
        } catch(error) {
            console.group('=======[ Ошибка подтверждения авторизации ]=======');
            console.error(error);
            console.groupEnd();
        }
    }
    dispatch(_initialized());
};

/**
 * Авторизация по логину и паролю с формы
 *
 * @param login
 * @param password
 * @returns {Function}
 */
export const login = (login, password) => async dispatch => {

    try {
        const {data} = await authAPI.login(login, password);

        if (data.ok) {
            localStorage.setItem('token', data.token);
            dispatch(getAuth());
        }
        // TODO: Показать ошибку
    } catch (error) {
        console.group('========[ Ошибка авторизации ]========');
        console.error(error);
        console.groupEnd();
    }
};

