import { AppActions } from './actions';

const initialState = {
    map: null,
    id: null,
    isLoading: null,
    hasData: null
};

export const AppReducers = (state = initialState, {type, ...action}) => {
    switch (type) {
        case (AppActions.REQUEST_START_GAME):
            return {
                ...state,
                id: action.payload.id,
                hasData: false,
                isLoading: false
            };

        case AppActions.REQUEST_GET_MAP:
            return {
                ...state,
                isLoading: true,
                hasData: false,
                map: null
            };

        case AppActions.SUCCESS_REQUEST_GET_MAP:
            return {
                ...state,
                map: action.payload.map,
                hasData: true,
                isLoading: false
            };

        case AppActions.FAILED_REQUEST_GET_MAP:
            return {
                ...state,
                hasData: false,
                isLoading: false
            };
        default:
            return state;
    }
};