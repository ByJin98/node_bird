import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// 첫 번째 게시글 #해시태그 #익스프레스
// 해시태그 값 구하기
const PostCardConetnt = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, index) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={index}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardConetnt.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardConetnt;
