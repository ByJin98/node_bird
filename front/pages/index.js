import AppLayout from '../components/AppLayout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MY_INFO_REQUEST, LOAD_POSTS_REQUEST } from '../actions';

const Home = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    dispatch({ type: LOAD_MY_INFO_REQUEST });
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    function onScroll() {
      let wsY = Math.round(window.scrollY);
      let cH = document.documentElement.clientHeight;
      let dS = document.documentElement.scrollHeight;
      if (wsY + cH > dS - 300) {
        // 포스트를 더 불러올 수 있거나, loading이 false일때만, 요청이 완료가 됐거나, 실패했거나
        // 만약 loadPost가 요청중이라면 loadPostLoading은 true이므로 안됨
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({ type: LOAD_POSTS_REQUEST });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      <div>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Home;
