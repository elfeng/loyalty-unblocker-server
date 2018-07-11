import { put } from 'redux-saga/effects';

const http = function* (url, path, option) {
    try {
        const data = yield fetch(url, option).then(x => x.json());
        yield put({type: 'set', path, payload: data});
    } catch (e) {
        yield put({type: 'error', e})
    }
}

export const get = ({url, path}) => http(url, path, {
    method: "GET",
    // credentials: 'include'
})

export const post = ({url, path, body}) => http(url, path, {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
    //mode: 'no-cors',
    // credentials: 'include',
    body: JSON.stringify(body)
})
