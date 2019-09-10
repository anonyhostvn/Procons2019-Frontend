import { AppActions } from './actions';
import App from "../App";

const initialState = {
    map: {},
    id: null
};

export const AppReducers = (state = initialState, {type, ...action}) => {
    switch (type) {
        case (AppActions.REQUEST_START_GAME):
            return {
                ...state,
                id: action.payload.id
            };

        case AppActions.SUCCESS_REQUEST_GET_MAP:
            return {
                ...state,
                map: action.payload.map
            };
        default:
            return state;
    }
};