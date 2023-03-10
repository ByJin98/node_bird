import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu
        mode='horizontal'
        items={[
          {
            label: (
              <Link href='/'>
                <a>노드버드</a>
              </Link>
            ),
            key: '/',
          },
          {
            label: (
              <Link href='/profile'>
                <a>프로필</a>
              </Link>
            ),
            key: '/profile',
          },
          { label: <SearchInput enterButton />, key: '/search' },
        ]}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href='https://google.com'
            target='_blank'
            rel='noreferrer noopener'
          >
            Google
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
