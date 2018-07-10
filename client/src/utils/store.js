import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import _reducer, { createReducer } from './reducer';
import _saga from './saga';

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}, reducer = {}, saga = null) => {
    const middewares = [
        reduxImmutableStateInvariant(),
        sagaMiddleware
    ];

    const store = createStore(
        createReducer({...reducer, ..._reducer}),
        initialState,
        compose(
            applyMiddleware(...middewares),
            window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
        )
    );

    sagaMiddleware.run(_saga);
    if (saga)
        sagaMiddleware.run(saga);

    return store;
}
