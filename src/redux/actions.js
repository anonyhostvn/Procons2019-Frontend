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
    }
};