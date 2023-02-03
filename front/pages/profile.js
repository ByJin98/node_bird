import Head from 'next/head';
import React from 'react';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const followerList = [
    { nickname: '진진1' },
    { nickname: '진진2' },
    { nickname: '진진3' },
  ];

  const followingList = [
    { nickname: '진진자라1' },
    { nickname: '진진자라2' },
    { nickname: '진진자라3' },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
