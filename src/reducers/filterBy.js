import * as R from 'ramda';

import {
    ADD_MANUFACTURER_TO_FILTER,
    REMOVE_MANUFACTURER_FROM_FILTER,
    SET_MIN_PRICE_FILTER,
    SET_MAX_PRICE_FILTER,
} from '../constants/actionTypes';

const initialState = {
    manufacturer: [],
    price: { min: 0, max: 1000 },
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_MANUFACTURER_TO_FILTER:
            return {
                ...state,
                manufacturer: R.concat(R.prop('manufacturer', state), [payload]),
            };
        case REMOVE_MANUFACTURER_FROM_FILTER:
            return {
                ...state,
                manufacturer: R.without(payload, R.prop('manufacturer', state)), // state.manufacturer.filter((item) => item !== payload),
            };
        case SET_MIN_PRICE_FILTER:
            return { ...state, price: R.assoc('min', payload, R.prop('price', state)) };
        case SET_MAX_PRICE_FILTER:
            return { ...state, price: R.assoc('max', payload, R.prop('price', state)) };

        default:
            return state;
    }
};