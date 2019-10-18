import { all, fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { AppActions } from './actions';
import Axios from 'axios';
import { server} from './constant';
import * as selector from './selector';

const instanceAxios = (props) => Axios({
    method: props.method,
    baseURL: props.baseUrl,
    headers: {
        Authorization: props.token
    },
    data: props.data
});

const startGame = (mapId) => Axios.get(`${server.host}/matches/start/${mapId}`).then(data => data).catch(err => console.log(err));
const getMapInfo = () => Axios.get(`${server.host}/matches`).then(data => data).catch(err => console.log(err));

function* workerRequestSetToken(action) {
    try {
        const token = yield select(selector.token);
        const response = yield call(
            () => instanceAxios({
            baseUrl: `${server.host}/matches`,
            method: 'get',
            token
        }).then(data => data).catch(err => console.log(err)) );

        if (response.status === 200) {
            yield put ({
                type: AppActions.SUCCESS_REQUEST_SET_TOKEN,
                payload: {
                    teamId: response.data[0].teamID,
                    listMatches: response.data
                }
            });
        } else {
            yield put ({
                type: AppActions.ERROR_REQUEST_SET_TOKEN
            });
        }

    } catch (e) {
        yield put ({
            type: AppActions.ERROR_REQUEST_SET_TOKEN
        })
    }
}

function* requestSetToken() {
    yield takeEvery(AppActions.REQUEST_SET_TOKEN, workerRequestSetToken);
}

function* workerRequestGetMap(action) {
    try {
        const token = yield select(selector.token);
        const matchId = yield select(selector.matchId);
        const response = yield call(
            () => instanceAxios({
                baseUrl: `${server.host}/matches/${matchId}`,
                method: 'get',
                token
            }).then(data => data).catch(err => console.log(err))
        );
        console.log(response);
        if (response.status === 200) {
            yield put({
                type: AppActions.SUCCESS_REQUEST_GET_MAP,
                payload : {
                    map: response.data
                }
            })
        } else {
            yield put({
                type: AppActions.FAILED_REQUEST_GET_MAP
            })
        }
    } catch (e) {
        yield put({
            type: AppActions.FAILED_REQUEST_GET_MAP
        })
    }
}

function* requestGetMap() {
    yield takeEvery(AppActions.REQUEST_GET_MAP, workerRequestGetMap);
}

function* workerRequestAction(action){
    try {
        const token = yield select(selector.token);
        const body = yield select(selector.actions);
        const matchId = yield select(selector.matchId);
        console.log("Start send action ...");
        const response = yield call(
            () => instanceAxios({
                baseUrl: `${server.host}/matches/${matchId}/action`,
                method: 'post',
                token,
                data: body
            }).then(data => data).catch(err => console.log(err))
        );

        console.log("End send ...");
        if (response.status === 200){
            yield put({
                type: AppActions.SUCCESS_REQUEST_ACTION
            });
            yield put({
                type: AppActions.REQUEST_GET_MAP,
                payload: {
                    matchId: matchId
                }
            })
        } else {
            yield put({
                type: AppActions.ERROR_REQUEST_ACTION
            });
        }
    } catch (e) {
        yield put({
            type: AppActions.ERROR_REQUEST_ACTION
        })
    }
}

function* requestAction(){
    yield takeEvery(AppActions.REQUEST_ACTION, workerRequestAction);
}

function* workerRequestStartGame(action) {
    try {
        const response = yield call(startGame, action.payload.mapId);
        if (response.status === 200) {
            yield put({
                type: AppActions.SUCCESS_REQUEST_START_GAME
            });

            yield put({
                type: AppActions.REQUEST_GET_MAP
            });
        } else {
            yield put({
                type: AppActions.FAILED_REQUEST_START_GAME
            })
        }
    } catch (e) {
        yield put({
            type: AppActions.FAILED_REQUEST_START_GAME
        })
    }
}

function* requestStartGame(){
    yield takeEvery(AppActions.REQUEST_START_GAME, workerRequestStartGame);
}

function* workerRequestContinueGame(action) {
    try {
        yield put({
            type: AppActions.REQUEST_GET_MAP
        });
        yield put({
            type: AppActions.SUCCESS_REQUEST_CONTINUE_GAME
        })
    } catch (e) {
        yield put({
            type: AppActions.ERROR_REQUEST_CONTINUE_GAME
        })
    }

}


function* requestContinueGame(){
    yield takeEvery(AppActions.REQUEST_CONTINUE_GAME, workerRequestContinueGame);
}

function* workerRequestGetMapInfo(action) {
    try {
        const response = yield call(getMapInfo);
        if (response.status === 200) {
            const recentMap = response.data.filter(map => map.id === parseInt(action.payload.mapId));
            console.log(recentMap[0]);
            // const maxTurn = ;
            const maxTurn = recentMap[0].turns;
            console.log('maxTurn', maxTurn);
            yield put({
                type: AppActions.SUCCESS_REQUEST_GET_MAP_INFO,
                payload:{
                    maxTurn
                }
            })
        } else {
            yield put({
                type: AppActions.ERROR_REQUEST_GET_MAP_INFO
            })
        }
    } catch (e) {
        yield put({
            type: AppActions.ERROR_REQUEST_GET_MAP_INFO
        })

    }
}

function* requestGetMapInfo() {
    yield takeEvery(AppActions.REQUEST_GET_MAP_INFO, workerRequestGetMapInfo);
}

export function* rootSagas () {
    yield all([
        fork(requestGetMap),
        fork(requestAction),
        fork(requestStartGame),
        fork(requestContinueGame),
        fork(requestGetMapInfo),
        fork(requestSetToken)
    ])
}