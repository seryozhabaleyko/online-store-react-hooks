import { fetchCatalog as fetchCatalogApi, loadMorePhones as loadMorePhonesApi } from '../api';
import {
    GET_CATALOG_REQUEST,
    GET_CATALOG_SUCCESS,
    GET_CATALOG_FAILURE,
    LOAD_MORE_REQUEST,
    LOAD_MORE_SUCCESS,
    LOAD_MORE_FAILURE,
} from '../constants/actionTypes';
import { getRenderedPhonesLength } from '../selectors';
import { defaultErrorMessage } from '../constants/defaults';

const catalogRequest = () => ({
    type: GET_CATALOG_REQUEST,
});

const catalogSuccess = (phones) => ({
    type: GET_CATALOG_SUCCESS,
    payload: phones,
});

const catalogFailure = (errorMessage = defaultErrorMessage, errorName) => ({
    type: GET_CATALOG_FAILURE,
    payload: { message: errorMessage, name: errorName },
});

export const fetchCatalog = () => async (dispatch) => {
    dispatch(catalogRequest());
    try {
        // throw new Error('Сервер временно недоступен.');
        const catalog = await fetchCatalogApi();
        dispatch(catalogSuccess(catalog));
    } catch (error) {
        dispatch(catalogFailure(error.message, error.name));
    }
};

export const loadMorePhones = () => async (dispatch, getState) => {
    const offset = getRenderedPhonesLength(getState());

    dispatch({
        type: LOAD_MORE_REQUEST,
    });

    try {
        const phones = await loadMorePhonesApi({ offset });

        dispatch({
            type: LOAD_MORE_SUCCESS,
            payload: phones,
        });
    } catch (error) {
        dispatch({
            type: LOAD_MORE_FAILURE,
            payload: error,
            error: true,
        });
    }
};
