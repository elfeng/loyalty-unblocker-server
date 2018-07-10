import { takeEvery, all } from 'redux-saga/effects';
import { get, post } from './http';

function* handleGet(a) {
    yield get(a);
}

function* handlePost(a) {console.log(a);
  yield post(a);
}

export default function* () {
  yield all([
    takeEvery('get', handleGet),
    takeEvery('post', handlePost),
  ]);
}
