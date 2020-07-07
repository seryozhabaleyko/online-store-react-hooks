import * as R from 'ramda';

import * as types from '../constants/types';
import initialState from '../constants/initialState';

export default (state = initialState.phonesPage, { type, payload }) => {
    switch (type) {
        case types.phones.SUCCESS:
            return R.merge(state, {
                ids: R.pluck('id', payload)
            });
        case types.phones.LOAD_MORE_SECCESS:
            const ids = R.pluck('id', payload)
            return R.merge(state, {
                ids: R.concat(state.ids, ids)
            });
        case types.search.PHONE:
            return R.merge(state, {
                search: payload
            });
        default:
            return state;
    }
};