import { AppActions } from './actions';
import {setNewActions} from '../component/utility/utility';

const initialState = {
    map: null,
    id: null,
    isLoading: false,
    hasData: null,
    formInformation: {
        actions: []
    },
    mapId: null,
    maxTurn: 0
};

export const AppReducers = (state = initialState, {type, ...action}) => {
    switch (type) {
        case (AppActions.REQUEST_START_GAME):
            return {
                ...state,
                id: parseInt(action.payload.teamId),
                hasData: false,
                isLoading: false,
                mapId: action.payload.mapId,
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
                isLoading: false,
                formInformation: {
                    actions: []
                }
            };

        case AppActions.ERROR_REQUEST_ACTION:
            return {
                ...state,
                isLoading: false
            };

        case AppActions.REQUEST_CONTINUE_GAME:
            return {
                ...state,
                id: parseInt(action.payload.teamId),
                mapId: action.payload.mapId
            };

        case AppActions.ERROR_REQUEST_CONTINUE_GAME:
            return {
                ...state
            };

        case AppActions.SUCCESS_REQUEST_CONTINUE_GAME:
            return {
                ...state
            };

        case AppActions.REQUEST_GET_MAP_INFO:
            return {
                ...state,
                isLoading: true
            };

        case AppActions.ERROR_REQUEST_GET_MAP_INFO:
            return {
                ...state,
                isLoading: false
            };

        case AppActions.SUCCESS_REQUEST_GET_MAP_INFO:
            return {
                ...state,
                maxTurn: parseInt(action.payload.maxTurn)
            };

        default:
            return state;
    }
};