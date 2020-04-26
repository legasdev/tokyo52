/**
 *
 * Редьюсер приложения
 *
*/
import {appAPI} from "@js/app/api/api";
import {namesCategoryById} from "@js/app/common/categoriesName";
import {item} from "@js/app/common/item";
import {makeObjectFromArray} from "@js/app/common/makeObjectFromArray";


const
    actionTypes = new Map([
        ['addAllCategory', 'app/addAllCategory'],
        ['addGroupsToCategory', 'app/addGroupsToCategory'],
        ['setIsLoaded', 'app/setIsLoaded'],
        ['setCurrentNamePage', 'app/setCurrentNamePage'],
        ['changeCategory', 'app/changeCategory'],
        ['addNewItem', 'app/addNewItem']
    ]);

const initialState = {
    currentNamePage: 'rolls',
    categories: null,
    isLoaded: false,
};


// Reducer

const appReducer = (state=initialState, action) => {

    switch (action.type) {

        case actionTypes.get('addAllCategory'):
            return {
                ...state,
                categories: action.categories
            };

        case actionTypes.get('addGroupsToCategory'): {
            const
                category = state.categories[namesCategoryById.get(action.idCategory)],
                groups = category.groups || {};
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [namesCategoryById.get(action.idCategory)]: {
                        ...category,
                        groups: {
                            ...action.groups
                        }
                    }
                }
            };
        }

        case actionTypes.get('setIsLoaded'):
            return {
                ...state,
                isLoaded: true
            };

        case actionTypes.get('setCurrentNamePage'):
            return {
                ...state,
                currentNamePage: action.namePage
            };

        case actionTypes.get('changeCategory'):
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [namesCategoryById.get(action.newCategory.id)]: {
                        ...action.newCategory
                    }
                }
            };

        case actionTypes.get('addNewItem'): {
            const
                category = state.categories[namesCategoryById.get(action.idCategory)],
                _groups = category.groups || {},
                goods = _groups[action.idGroup] && _groups[action.idGroup].goods || [];
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [namesCategoryById.get(action.idCategory)]: {
                        ...category,
                        groups: {
                            ..._groups,
                            [action.idGroup]: {
                                ..._groups[action.idGroup],
                                goods: [
                                    ...goods,
                                    item(action.groupId)
                                ]
                            }
                        }
                    }
                }
            };
        }

        default:
            return state;
    }

};

export default appReducer;


// Actions
const _setIsLoaded = () => ({type: actionTypes.get('setIsLoaded')});
const _addAllCategory = categories => ({type: actionTypes.get('addAllCategory'), categories});
const _addGroupsToCategory = (idCategory, groups) => ({type: actionTypes.get('addGroupsToCategory'), idCategory, groups});
const _setCurrentPage = namePage => ({type: actionTypes.get('setCurrentNamePage'), namePage});
const _changeCategory = newCategory => ({type: actionTypes.get('changeCategory'), newCategory});
const _addNewItem = (idCategory, idGroup) => ({type: actionTypes.get('addNewItem'), idCategory, idGroup});

// Thunks

/**
 * Установить id выбранной категории
 *
 * @param namePage - ID категории
 * @returns {Function}
 */
export const setCurrentPage = namePage => dispatch => {
    dispatch(_setCurrentPage(namePage));
};

/**
 * Получить все категории
 * Грубо говоря, получает вообще все данные
 *
 * @returns {Function}
 */
export const getAllGroups = () => async dispatch => {
    try {
        const {data: {ok, categories}} = await appAPI.getAllGroups();
        if (ok) {
            const
                _categories = categories.reduce((obj, category) => ({
                    ...obj,
                    [namesCategoryById.get(category.id)]: {
                        id: category.id,
                        name: category.name,
                        groups: null,
                    }
                }), {});

            await dispatch(_addAllCategory(_categories));

            for (let category of categories) {
                dispatch(_addGroupsToCategory(
                    category.id,
                    makeObjectFromArray(category.groups)
                ));
            }
            dispatch(_setIsLoaded());
        } else {
            throw new Error('Ошибка в результате (ok = false)');
        }
    } catch(error) {
        console.group('========[ Ошибка загрузки данных ]========');
        console.info('Загрузка всех данных');
        console.error(error);
        console.groupEnd();
    }
};

/**
 * Добавляет новую группу в категорию
 *
 * @param idCategory - ID выбранной категории
 * @param name - Название новой группы
 * @returns {Function}
 */
export const addNewGroup = (idCategory, name) => async dispatch => {
    try {
        const {data} = await appAPI.addNewGroup(idCategory, name);
        if (data.ok) {
            const {data} = await appAPI.getGroups(idCategory);
            if (data.ok) {
                const
                    newCategory = {
                        ...data.category,
                        groups: makeObjectFromArray(data.category.groups)
                    };
                dispatch(_changeCategory(newCategory));
            } else {
                throw new Error('Ошибка обновления группы');
            }
        } else {
            throw new Error('Ошибка добавления');
        }
    } catch(error) {
        console.group('========[ Ошибка добавления новой группы ]========');
        console.error(error);
        console.groupEnd();
    }
};

/**
 * Удалить группу в категории
 *
 * @param idGroup - ID Группы
 * @param idCategory - ID Категории
 * @returns {Function}
 */
export const deleteGroup = (idGroup, idCategory) => async dispatch => {
    try {
        const {data} = await appAPI.deleteGroup(idGroup);
        if (data.ok) {
            const {data} = await appAPI.getGroups(idCategory);
            if (data.ok) {
                const
                    newCategory = {
                        ...data.category,
                        groups: makeObjectFromArray(data.category.groups)
                    };
                dispatch(_changeCategory(newCategory));
            } else {
                throw new Error('Ошибка обновления группы');
            }
        } else {
            throw new Error('Ошибка удаления');
        }
    } catch(error) {
        console.group('========[ Ошибка удаления группы ]========');
        console.error(error);
        console.groupEnd();
    }
};

/**
 * Доавить новый предмет
 * (добавляет только локально)
 * Для сохранения, нужно нажать "Сохранить"
 *
 * @param idCategory - ID Категории
 * @param idGroup - ID Группы
 * @returns {Function}
 */
export const addNewItem = (idCategory, idGroup) => dispatch => {
    dispatch(_addNewItem(idCategory, idGroup));
};

/**
 * Создать/обновить на сервере
 *
 * @param item - Объект продукта
 * @param imageFile - Файл картинки
 * @param isNew - Новый ли файл
 * @returns {Function}
 */
export const saveItem = (item, imageFile, isNew) => async dispatch => {
    try {
        const {data} = await appAPI.saveItem(item, imageFile, isNew);
        if (data.ok) {
            // const {data} = await appAPI.getGroups(idCategory);
            console.log('SAVE ITEM')
        } else {
            throw new Error('Пришел не тот ответ');
        }
    } catch(error) {
        console.group('========[ Ошибка создания/обновления товара ]========');
        console.error(error);
        console.groupEnd();
    }
};

export const deleteItem = idItem => async dispatch => {
    try {
        const {data} = await appAPI.deleteItem(idItem);
        if (data.ok) {
            // const {data} = await appAPI.getGroups(idCategory);
            console.log('DELETE ITEM')
        } else {
            throw new Error('Пришел не тот ответ');
        }
    } catch(error) {
        console.group('========[ Ошибка удаления товара ]========');
        console.error(error);
        console.groupEnd();
    }
};