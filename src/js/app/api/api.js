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

    /**
     * Логин
     *
     * @param login
     * @param password
     * @returns {Promise<AxiosResponse<T>>}
     */
    async login(login, password) {
        return await Instance.post('/v1/login',{login, password});
    },

    /**
     * Проверка авторизации
     *
     * @param token
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getAuth(token) {
        return await Instance.post('/v1/auth', {token});
    },

};

// API работы в приложении
export const appAPI = {

    /**
     * Добавление группы
     *
     * @param idCategory - ID категории
     * @param name - Имя группы
     * @returns {Promise<{data: {ok: boolean}}>}
     */
    async addNewGroup(idCategory, name) {
        return await Instance.post('/v1/group/create',{
                categoryId: idCategory,
                name
            }, {
            headers: addToken()
        });
    },

    /**
     * Переименовать группу
     *
     * @param id - ID Группы
     * @param name - Новое имя
     * @returns {Promise<AxiosResponse<T>>}
     */
    async renameGroup(id, name) {
        return Instance.post('/v1/group/update', {id, name}, {
            headers: addToken()
        });
    },

    /**
     * Удаление группы
     *
     * @param id - ID группы
     * @returns {Promise<{data: {ok: boolean}}>}
     */
    async deleteGroup(id) {
        return await Instance.delete('/v1/group/delete', {
            headers: addToken(),
            data: {id},
        });
    },

    /**
     * Выполняет запрос на получение всех категорий
     *
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getAllGroups() {
        return await Instance.get('/v1/categories', {
            headers: addToken()
        });
    },

    /**
     * Получить группы в категории
     *
     * @param id - ID Категории
     * @returns {Promise<void>}
     */
    async getGroups(id) {
        return await Instance.post('/v1/category', {id}, {
            headers: addToken()
        });
    },

    /**
     * Получить определенную группу
     * по ID
     *
     * @param id
     * @returns {Promise<AxiosResponse<T>>}
     */
    async getGroup(id) {
      return await Instance.post('/v1/group', {id}, {
          headers: addToken(),
      });
    },

    /**
     * Создание/обновление товара
     *
     * @param item - Объект товара
     * @param imgFile - Файл картинки
     * @param isNew - Новый ли файл
     * @returns {Promise<void>}
     */
    async saveItem(item, imgFile, isNew) {
        const
            formData = new FormData(),
            url = isNew ? '/v1/item/create' : '/v1/item/update';

        formData.append('file', imgFile);
        formData.append('properties', new Blob([JSON.stringify(item)], {
            type: "application/json"
        }));

        return await Instance.post(url, formData, {
            headers: addToken(),
            'Content-Type': undefined
        });
    },

    /**
     * Удалить товар
     *
     * @param id - ID товара
     * @returns {Promise<void>}
     */
    async deleteItem(id) {
        return await Instance.delete('/v1/item/delete', {
            headers: addToken(),
            data: {id},
        });
    },

};