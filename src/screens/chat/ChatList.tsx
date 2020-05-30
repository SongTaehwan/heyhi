import React from 'react';
import { View, Text } from 'react-native';
import { ContentContainer } from '@components';
import { FlatList } from 'react-native-gesture-handler';

const list = [{}];
const ChatList = (): JSX.Element => {
  const renderChatListItem = (): JSX.Element => {
    return <Text>123123</Text>;
  };

  return (
    <ContentContainer containerStyle={{ paddingHorizontal: 20 }}>
      {renderChatListItem()}
    </ContentContainer>
  );
};

export default ChatList;
