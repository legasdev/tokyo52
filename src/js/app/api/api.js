import Instance from './instance'

/**
 * Добавляет токен к заголовкам
 *
 * @param options - Объект заголовков запроса
 * @returns {{Authorization: string}}
 */
function addToken(options={}) {
    return {
        ...options,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
}

// API авторизации
export const authAPI = {

    // Логин
    async login(login, password) {
        return await Instance.post('/v1/login',{login, password});
    },

    // Проверка авторизации
    async getAuth(token) {
        return await Instance.post('/v1/auth', {token});
    },

};

// API работы в приложении
export const appAPI = {

    // Добавление группы
    async addNewSubgroup(nameGroup, name) {
        // TODO: Исправить
        return {data: {ok: true}}
        // return await Instance.post('/v1/add-group', {name}, {
        //     headers: addToken()
        // });
    },

    async deleteSubgroup(nameGroup, name) {
        // TODO: Исправить
        return {data: {ok: true}}
        // return await Instance.post('/v1/add-group', {name}, {
        //     headers: addToken()
        // });
    },

};