import { AppActions } from './actions';
import {setNewActions} from '../component/utility/utility';
import {notification} from "antd";

const initialState = {
    map: null,
    id: null,
    isLoading: false,
    hasData: null,
    formInformation: {
        actions: []
    }
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

        case AppActions.REQUEST_FIX_TURN:
            return {
                ...state,
                formInformation: {
                    actions: setNewActions(action.payload.prevActions, action.payload.newAction)
                }
            };

        case AppActions.REQUEST_ACTION:
            return {
                ...state,
                isLoading: true
            };

        case AppActions.SUCCESS_REQUEST_ACTION:
            return {
                ...state,
                isLoading: false
            };

        case AppActions.ERROR_REQUEST_ACTION:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};