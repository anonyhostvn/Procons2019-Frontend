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
    },
    matchId: null,
    maxTurn: 0,
    token: null,
    isTokenValid: false,
    teamId: null,
    listMatches: []
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

        case AppActions.REQUEST_SET_TOKEN:
            return {
                ...state,
                token: action.payload.token,
                isTokenValid: false,
                isLoading: true
            };

        case AppActions.SUCCESS_REQUEST_SET_TOKEN:
            notification.success({
                message: 'Token hợp lệ',
                description:
                    '',
            });
            return {
                ...state,
                isTokenValid: true,
                isLoading: false,
                teamId: action.payload.teamId,
                id: action.payload.teamId,
                listMatches: action.payload.listMatches
            };

        case AppActions.ERROR_REQUEST_SET_TOKEN:
            notification.error({
                message: 'Token không hợp lệ',
                description:
                    '',
            });
            return {
                ...state,
                isTokenValid: false,
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

        case AppActions.REQUEST_SET_MATCH_ID:
            return {
                ...state,
                matchId: action.payload.matchId
            };

        default:
            return state;
    }
};