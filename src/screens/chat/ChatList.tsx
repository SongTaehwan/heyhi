import React from 'react';
import { View, Dimensions } from 'react-native';
import { ContentContainer, Content, HSpace, VSpace } from '@components';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Image } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { getRelativeHeight } from '@util/Dimensions';
import { Colors, StyleSheets } from '@constants';
import { Text } from '@components';

const list = [
  {
    id: 1,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '10 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 2,
    name: 'Jang Lim',
    message: 'No Way!!!',
    date: '9 days ago',
    status: 'Block',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 3,
    name: 'Yeong Park',
    message: 'How r u doin?',
    date: '8 days ago',
    status: 'Active',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 4,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '7 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 5,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '10 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 6,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '10 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 7,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '10 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
  {
    id: 8,
    name: 'Jay Lim',
    message: 'Hello from the other side',
    date: '10 days ago',
    status: 'Cancelled',
    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  },
];

const ChatList = (): JSX.Element => {
  const renderChatListItem = ({
    item,
  }: {
    item: {
      id: number;
      name: string;
      message: string;
      status: string;
      uri: string;
      date: string;
    };
  }): JSX.Element => {
    console.log(item);
    return (
      <TouchableScale
        activeScale={0.95}
        tension={50}
        style={{
          alignItems: 'center',
          height: 80,
          backgroundColor: 'white',
          width: Dimensions.get('screen').width - 40,
          paddingHorizontal: 15,
          paddingVertical: 12,
          flexDirection: 'row',
          marginBottom: 20,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }}>
        <Image
          source={{ uri: item.uri }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            // backgroundColor: Colors.veryLightPinkFour,
          }}
        />
        <HSpace space={15} />
        <View>
          <Text bold style={{ lineHeight: 19 }}>
            {item.name}
          </Text>
          <Text smallText style={{ lineHeight: 17 }}>
            {item.message}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: Colors.brownGreyTwo,
              lineHeight: 17,
            }}>
            {item.date}
            <Text
              style={{
                fontSize: 11,
                color: item.status === 'Active' ? Colors.brightSkyBlue : 'red',
                lineHeight: 17,
              }}>
              {' '}
              {item.status}
            </Text>
          </Text>
        </View>
      </TouchableScale>
    );
  };

  return (
    <Content style={{ paddingHorizontal: 0, paddingTop: 20 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        style={{ paddingHorizontal: 20 }}
        renderItem={renderChatListItem}
        keyExtractor={(item): string => item.id.toString()}
      />
    </Content>
  );
};

export default ChatList;
