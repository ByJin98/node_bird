export const initalState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '진진',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__480.png',
        },
        {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuJuDigTVs9ptEp3rImqj0EesIabngFYnjuh9lmG261_flgi2stqYm8CWOEIiD-3KHDZs&usqp=CAU',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '꽁꽁',
          },
          content: '우와 신기하네요',
        },
        {
          User: {
            nickname: '꽁치',
          },
          content: '웃기다 이거 ㅋㅋㅋ',
        },
      ],
    },
  ],
  imagePaths: [], // 이미지 경로들
  postAdded: false, // 게시글 추가가 완료 됐을때
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터 ',
  User: {
    id: 1,
    nickname: '지로초',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        imagePath: [...state.imagePaths],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
