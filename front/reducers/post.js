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
          src: 'https://www.crowdpic.net/photo/%EA%B7%B8%EB%A6%BC-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%93%9C%EB%A1%9C%EC%9E%89-%EB%B0%B0%EA%B2%BD-2795973',
        },
        {
          src: 'https://www.crowdpic.net/photo/%ED%92%8D%EB%A0%A5%EB%B0%9C%EC%A0%84-%EB%88%88%EB%B0%AD-%EB%AA%A9%EC%9E%A5-%EA%B2%A8%EC%9A%B8%EB%AA%A9%EC%9E%A5-%EB%88%88-886754',
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
