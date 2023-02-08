import axios from 'axios';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
} from '../actions';

function followAPI() {
  return axios.post('/api/login');
}

function* follow(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unFollowAPI() {
  return axios.post('/api/login');
}

function* unFollow(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI() {
  return axios.post('/api/login');
}

function* login(action) {
  try {
    console.log('saga loading');
    //요청의 결과를 받음
    // const result = yield call(loginAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    //요청의 결과를 받음
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI() {
  return axios.post('/api/signup');
}

function* signUp(data) {
  try {
    //요청의 결과를 받음
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
