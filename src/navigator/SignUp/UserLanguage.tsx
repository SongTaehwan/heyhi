import React from 'react';
import { Content, Title, BarButton, ContentContainer } from '@components';
import { SignUpNavigationProps } from '@navigator/Routes';

const UserLanguage = ({
  navigation,
}: SignUpNavigationProps<'UserLanguage'>): JSX.Element => {
  return (
    <ContentContainer>
      <Content>
        <Title title>{'Language'}</Title>
      </Content>
      <BarButton />
    </ContentContainer>
  );
};

export default UserLanguage;
