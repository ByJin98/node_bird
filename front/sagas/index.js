import { all, fork, take } from 'redux-saga/effects';

function* watchLogin() {
  yield take('LOG_IN');
}

function* watchLogOut() {
  yield take('LOG_IN');
}

function* watchAddPost() {
  yield take('LOG_IN');
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogOut), fork(watchAddPost)]);
}
