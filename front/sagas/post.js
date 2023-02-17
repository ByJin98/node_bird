import axios from 'axios';
import {
  all,
  call,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import shortid from 'shortid';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../actions';
import { generateDummpyPost } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 실제 요청
function loadPostsAPI() {
  return axios.get('/api/post');
}

function* loadPosts(action) {
  try {
    //요청의 결과를 받음
    // const result = yield call(addPostAPI) ;
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummpyPost(10),
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// 실제 요청
function addPostAPI(data) {
  return axios.post(
    '/post',
    { content: data },
    {
      withCredentials: true,
    },
  );
}

function* addPost(action) {
  try {
    //요청의 결과를 받음
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
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
  return axios.post(`/post/${data.postId}/comment`, data, {
    withCredentials: true,
  });
}

function* addComment(action) {
  try {
    //요청의 결과를 받음
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    // 실패 시
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
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
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
