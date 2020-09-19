import React, { useState } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Content, HSpace } from '@components';
import { FlatList } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import { Colors } from '@constants';
import { Text } from '@components';
import { HomeNavigationProps } from '@navigator/Routes';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { QUERY_CHAT_LIST } from '@api/query';
import moment from 'moment';

const Chat = ({ navigation }: HomeNavigationProps<'Chat'>): JSX.Element => {
  const [chatList, setChatList] = useState([]);

  const { loading } = useQuery(QUERY_CHAT_LIST, {
    variables: {
      email: 'axoghks@gmail.com',
    },
    notifyOnNetworkStatusChange: false,
    onCompleted: ({ matchings }) => {
      if (matchings.length > 0) {
        console.log(matchings);
        const list = matchings.map((chat) => ({
          id: chat.chatRoom.id,
          state: chat.state[0] + chat.state.slice(1).toLowerCase(),
          participant: `${chat.requestedMember.firstName} ${chat.requestedMember.lastName}`,
          message: chat.chatRoom?.title,
          thumbnail:
            chat.requestedMember.thumbnail.length > 0
              ? chat.requestedMember.thumbnail
              : 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
          date: moment(chat.chatRoom?.updatedAt).startOf('hour').fromNow(),
        }));
        setChatList(list);
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const renderChatListItem = ({
    item,
  }: {
    item: {
      id: number;
      title?: string;
      participant: string;
      message: string;
      state: string;
      thumbnail: string;
      date: string;
    };
  }): JSX.Element => {
    return (
      <TouchableScale
        onPress={(): void =>
          navigation.navigate('ChatRoom', {
            roomId: item.id,
            title: item.title,
          })
        }
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
          source={{ uri: item.thumbnail }}
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
            {item.participant}
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
                color: item.state === 'Active' ? Colors.brightSkyBlue : 'red',
                lineHeight: 17,
              }}>
              {' '}
              {item.state}
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
        data={chatList}
        style={{ paddingHorizontal: 20 }}
        renderItem={renderChatListItem}
        keyExtractor={(item): string => item.id.toString()}
      />
    </Content>
  );
};

export default Chat;
