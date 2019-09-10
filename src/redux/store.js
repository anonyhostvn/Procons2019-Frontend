import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSagas } from './sagas';
import { AppReducers } from './reducers';
import thunk from 'redux-thunk';

const sagaMiddleWare = createSagaMiddleware();

const middleware = [ sagaMiddleWare, thunk ];

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

const store = createStore(
    combineReducers({
        AppReducers
    }),
    composeEnhancers(applyMiddleware(...middleware))
    );
sagaMiddleWare.run(rootSagas);

export { store };
