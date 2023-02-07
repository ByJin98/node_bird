import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

// login이란 액션이 실행될때까지 기다리겠다.
// take : 한 번만 실행 (while(true)로 감싸면 해결) [일회성] take 대신 takeEvery 사용
// takeEvery : 두 번 누르면 두번 실행 -> 비동기이기 때문
// takeLatest :  두 번 누르면 마지막 것만 실행
// throttle : 초 지정 시 해당 초 동안은 딱 한번만 실행

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}

// all은 배열 안에 있는걸 모두 실행함
// fork : 함수를 실행함(비동기 함수 호출)
// call : 함수를 실행함(동기 함수 호출)
