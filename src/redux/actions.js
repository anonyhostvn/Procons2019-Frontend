import App from "../App";

export const AppActions = {
    REQUEST_START_GAME: "REQUEST_START_GAME",
    SUCCESS_REQUEST_START_GAME: "SUCCESS_REQUEST_START_GAME",
    FAILED_REQUEST_START_GAME: "FAILED_REQUEST_START_GAME",

    REQUEST_FINISH_GAME: "REQUEST_FINISH_GAME",
    SUCCESS_REQUEST_FINISH_GAME: "SUCCESS_REQUEST_FINISH_GAME",
    FAILED_REQUEST_FINISH_GAME: "FAILED_REQUEST_FINISH_GAME",

    REQUEST_GET_MAP: "REQUEST_GET_MAP",
    SUCCESS_REQUEST_GET_MAP: "SUCCESS_REQUEST_GET_MAP",
    FAILED_REQUEST_GET_MAP: "FAILED_REQUEST_GET_MAP",

    requestStartGame: (params) => {
        return (dispatch, getState) => {
            dispatch({
                type: AppActions.REQUEST_START_GAME,
                payload: {
                    ...params
                }
            })
        }
    },

    requestFinishGame: (params) => {
        return (dispatch, getState) => {
            dispatch ({
                type: AppActions.REQUEST_FINISH_GAME,
                payload: {
                    ...params
                }
            })
        }
    },

    requestGetMap: (params) => {
        return (dispatch, getState) => {
            dispatch ({
                type: AppActions.REQUEST_GET_MAP,
                payload: {
                    ...params
                }
            })
        }
    },

    REQUEST_FIX_TURN: "REQUEST_FIX_TURN",
    requestFixTurn: (props) => {
        return (dispatch, getState) => {
            const prevActions = getState().AppReducers.formInformation.actions;
            dispatch({
                type: AppActions.REQUEST_FIX_TURN,
                payload: {
                    ...props,
                    prevActions
                }
            })
        }
    },

    REQUEST_ACTION: "REQUEST_ACTION",
    SUCCESS_REQUEST_ACTION: "SUCCESS_REQUEST_ACTION",
    ERROR_REQUEST_ACTION: "ERROR_REQUEST_ACTION",
    requestAction: (props) => {
        return (dispatch, getState) => {
            dispatch({
                type: AppActions.REQUEST_ACTION,
                payload: {
                    ...props
                }
            })
        }
    }
};