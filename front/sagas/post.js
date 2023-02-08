import axios from 'axios';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../actions';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 실제 요청
function addPostAPI() {
  return axios.post('/api/post');
}

function* addPost(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(addPostAPI) ;
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 실제 요청
function removePostAPI() {
  return axios.post('/api/post');
}

function* removePost(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(addPostAPI) ;
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

// 실제 요청
function addCommentAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(addPostAPI) ;
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
