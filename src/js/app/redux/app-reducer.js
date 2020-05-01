/**
 *
 * Редьюсер приложения
 *
*/
import {appAPI} from "@js/app/api/api";
import {namesCategoryById} from "@js/app/common/categoriesName";
import {item} from "@js/app/common/item";
import {makeObjectFromArray} from "@js/app/common/makeObjectFromArray";
import sortOptionInItem from "@js/app/common/sortOptionInItem";


const
    actionTypes = new Map([
        ['addAllCategory', 'app/addAllCategory'],
        ['addAllCategoryLocal', 'app/addAllCategoryLocal'],
        ['addGroupsToCategory', 'app/addGroupsToCategory'],
        ['addGroupsToCategoryLocal', 'app/addGroupsToCategoryLocal'],
        ['setIsLoaded', 'app/setIsLoaded'],
        ['setCurrentNamePage', 'app/setCurrentNamePage'],
        ['changeCategory', 'app/changeCategory'],
        ['changeCategoryLocal', 'app/changeCategoryLocal'],
        ['addNewItem', 'app/addNewItem'],
        ['updateGroup', 'app/updateGroup'],
        ['updateGroupLocal', 'app/updateGroupLocal'],
        ['renameGroup', 'app/renameGroup']
    ]);

const initialState = {
    currentNamePage: 'rolls',
    categories: null,
    isLoaded: false,
    localCategories: null,
};


// Reducer

const appReducer = (state=initialState, action) => {

    switch (action.type) {

        case actionTypes.get('addAllCategory'):
            return {
                ...state,
                categories: action.categories
            };

        case actionTypes.get('addAllCategoryLocal'):
            return {
                ...state,
                localCategories: action.categories
            };

        case actionTypes.get('addGroupsToCategory'): {
            const
                category = state.categories[namesCategoryById.get(action.idCategory)];
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

        case actionTypes.get('addGroupsToCategoryLocal'): {
            const
                category = state.localCategories[namesCategoryById.get(action.idCategory)];
            return {
                ...state,
                localCategories: {
                    ...state.localCategories,
                    [namesCategoryById.get(action.idCategory)]: {
                        ...category,
                        groups: Object.keys(action.groups).reduce((acc, key) => {
                            return {
                                ...acc,
                                [key]: {
                                    ...action.groups[key],
                                    goods: []
                                }
                            }
                        }, {})
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

        case actionTypes.get('changeCategoryLocal'):
            return {
                ...state,
                localCategories: {
                    ...state.localCategories,
                    [namesCategoryById.get(action.newCategory.id)]: {
                        ...action.newCategory
                    }
                }
            };

        case actionTypes.get('addNewItem'): {
            const
                localCategory = state.localCategories[namesCategoryById.get(action.idCategory)],
                _groups = localCategory.groups || {},
                goods = _groups[action.idGroup] && _groups[action.idGroup].goods || [];
            return {
                ...state,
                localCategories: {
                    ...state.localCategories,
                    [namesCategoryById.get(action.idCategory)]: {
                        ...localCategory,
                        groups: {
                            ..._groups,
                            [action.idGroup]: {
                                ..._groups[action.idGroup],
                                goods: [
                                    ...goods,
                                    item(action.groupId, `new-${Math.floor(Math.random() * new Date())}`)
                                ]
                            }
                        }
                    }
                }
            };
        }

        case actionTypes.get('updateGroup'): {
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
                            ...groups,
                            [action.idGroup]: {
                                ...action.group,
                                goods: action.group.goods.map(item => sortOptionInItem(item))
                            }
                        }
                    }
                }
            };
        }

        case actionTypes.get('updateGroupLocal'):
            const
                category = state.localCategories[namesCategoryById.get(action.idCategory)],
                groups = category.groups || {};
            return {
                ...state,
                localCategories: {
                    ...state.localCategories,
                    [namesCategoryById.get(action.idCategory)]: {
                        ...category,
                        groups: {
                            ...groups,
                            [action.idGroup]: {
                                ...groups[action.idGroup],
                                goods: groups[action.idGroup].goods.filter(item => item.id !== action.idItem)
                            }
                        }
                    }
                }
            };

        case actionTypes.get('renameGroup'): {
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
                            ...groups,
                            [action.idGroup]: {
                                ...groups[action.idGroup],
                                name: action.newName
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
const _addAllCategoryLocal = categories => ({type: actionTypes.get('addAllCategoryLocal'), categories});
const _addGroupsToCategory = (idCategory, groups) => ({type: actionTypes.get('addGroupsToCategory'), idCategory, groups});
const _addGroupsToCategoryLocal = (idCategory, groups) => ({type: actionTypes.get('addGroupsToCategoryLocal'), idCategory, groups});
const _setCurrentPage = namePage => ({type: actionTypes.get('setCurrentNamePage'), namePage});
const _changeCategory = newCategory => ({type: actionTypes.get('changeCategory'), newCategory});
const _changeCategoryLocal = newCategory => ({type: actionTypes.get('changeCategoryLocal'), newCategory});
const _addNewItem = (idCategory, idGroup) => ({type: actionTypes.get('addNewItem'), idCategory, idGroup});
const _updateGroup = (idCategory, idGroup, group) => ({type: actionTypes.get('updateGroup'), idCategory, idGroup, group});
const _updateGroupLocal = (idCategory, idGroup, idItem) => ({type: actionTypes.get('updateGroupLocal'), idCategory, idGroup, idItem});
const _renameGroup = (idCategory, idGroup, newName) => ({type: actionTypes.get('renameGroup'), idCategory, idGroup, newName});

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
            dispatch(_addAllCategoryLocal(_categories));

            for (let category of categories) {
                const
                    objectGroup = makeObjectFromArray(category.groups);
                dispatch(_addGroupsToCategory(
                    category.id,
                    objectGroup
                ));
                dispatch(_addGroupsToCategoryLocal(
                    category.id,
                    objectGroup
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
 * Получить определенную группу
 *
 * @param idCategory
 * @param idGroup
 * @returns {Function}
 */
export const getGroup = (idCategory, idGroup) => async dispatch => {
    try {
        const {data} = await appAPI.getGroup(idGroup);
        if (data.ok) {
           console.log(data);
        } else {
            throw new Error('Ошибка в результате (ok = false)');
        }
    } catch(error) {
        console.group('========[ Ошибка загрузки данных ]========');
        console.info('Загрузка группы');
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
                    },
                    newCategoryLocal = {
                        ...data.category,
                        groups: makeObjectFromArray(data.category.groups, true)
                    };
                dispatch(_changeCategory(newCategory));
                dispatch(_changeCategoryLocal(newCategoryLocal));
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
 * Переименовать группу
 *
 * @param idCategory - ID Категории
 * @param idGroup - ID Группы
 * @param newName - Новое имя группы
 * @returns {Function}
 */
export const renameGroup = (idCategory, idGroup, newName) => async dispatch => {
    try {
        const {data: {ok}} = await appAPI.renameGroup(idGroup, newName);
        if (ok) {
            dispatch(_renameGroup(idCategory, idGroup, newName));
        } else {
            throw new Error('Ошибка при ренейме на сервере')
        }
    } catch(error) {
        console.group('========[ Ошибка переименования группы ]========');
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
export const deleteGroup = (idCategory, idGroup) => async dispatch => {
    try {
        const {data} = await appAPI.deleteGroup(idGroup);
        if (data.ok) {
            const {data} = await appAPI.getGroups(idCategory);
            if (data.ok) {
                const
                    newCategory = {
                        ...data.category,
                        groups: makeObjectFromArray(data.category.groups)
                    },
                    newCategoryLocal = {
                        ...data.category,
                        groups: makeObjectFromArray(data.category.groups, true)
                    };
                dispatch(_changeCategory(newCategory));
                dispatch(_changeCategoryLocal(newCategoryLocal));
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
 * @param idCategory - ID Категории
 * @returns {Function}
 */
export const saveItem = (item, imageFile, isNew, idCategory) => async dispatch => {
    try {
        const {data} = await appAPI.saveItem(item, imageFile, isNew);
        if (data.ok) {
            if (isNew) {
                const {data} = await appAPI.getGroup(item.groupId);
                if (data.ok) {
                    dispatch(_updateGroup(idCategory, item.groupId, data.group))
                } else {
                    throw new Error('Ошибка обновления группы');
                }
            }
        } else {
            throw new Error('Пришел не тот ответ');
        }
    } catch(error) {
        console.group('========[ Ошибка создания/обновления товара ]========');
        console.error(error);
        console.groupEnd();
    }
};

/**
 * Удалить продукт
 *
 * @param idCategory
 * @param idGroup
 * @param idItem
 * @param isNew
 * @returns {Function}
 */
export const deleteItem = (idCategory, idGroup, idItem, isNew) => async dispatch => {
    try {
        if (isNew) {
            dispatch(_updateGroupLocal(idCategory, idGroup, idItem));
        } else {
            const {data} = await appAPI.deleteItem(idItem);
            if (data.ok) {
                const {data} = await appAPI.getGroup(idGroup);
                if (data.ok) {
                    dispatch(_updateGroup(idCategory, idGroup, data.group));
                } else {
                    throw new Error('Ошибка обновления группы');
                }
            } else {
                throw new Error('Пришел не тот ответ');
            }
        }
    } catch(error) {
        console.group('========[ Ошибка удаления товара ]========');
        console.error(error);
        console.groupEnd();
    }
};