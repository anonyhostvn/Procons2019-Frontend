import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import { AppActions } from './actions';
import Axios from 'axios';
import { server } from './constant'

const fetchMap = () => Axios.get(`${server.host}api/game`).then(data => data).catch(err => console.log(err));

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

export function* rootSagas () {
    yield all([
        fork(requestGetMap)
    ])
}