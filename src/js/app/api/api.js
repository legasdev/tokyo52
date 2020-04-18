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

export const appAPI = {

    // Добавление группы
    async addNewGroup(name) {
        return await Instance.post('/v1/add-group', {name}, {
            headers: addToken()
        });
    },

};