import { all, fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { AppActions } from './actions';
import Axios from 'axios';
import { server } from './constant';
import * as selector from './selector';
import App from "../App";

const fetchMap = () => Axios.get(`${server.host}/matches/16`).then(data => data).catch(err => console.log(err));
const doAction = (id, body) => Axios.post(`${server.host}/matches/${id}/action`, {...body}).then(data => data).catch(err => console.log(err));

function* workerRequestGetMap(action) {
    try {
        const response = yield call(fetchMap);
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
        const body = yield select(selector.actions);
        const id = yield select(selector.teamId);
        console.log("Start send action ...");
        const response = yield call(() => doAction(id, body));
        console.log("End send ...");
        if (response.status === 200){
            yield put({
                type: AppActions.SUCCESS_REQUEST_ACTION
            });
            yield put({
                type: AppActions.REQUEST_GET_MAP
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

export function* rootSagas () {
    yield all([
        fork(requestGetMap),
        fork(requestAction)
    ])
}