// import thunkMiddleware from 'redux-thunk';
// thunk
// const loggerMiddleware =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     console.log(action);
//     return next(action);
//   };

export const loginRequestAction = (data) => {
  return (dispatch, getState) => {
    // getState = initailState
    const state = getState();
    dispatch(loginRequestAction());
    axios
      .post('/api/login')
      .then(() => {
        dispatch(loginSuccessAction());
      })
      .catch(() => {
        dispatch(loginFailureAction());
      });
  };
};

export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const loginFailureAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

// 3 단계

// 1단계 : request
// 2단계 : Success
// 3단계 : failure
