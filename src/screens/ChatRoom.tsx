import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { GiftedChat } from 'react-native-gifted-chat';
import useText from '@hooks/useText';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHATMESSAGE_LIST } from '@api/query';
import { MUTATION_SEND_MESSAGE } from '@api/mutation';
import { HomeNavigationProps } from '@navigator/Routes';
import { logError } from '@util/Error';

interface Sender {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  nationality?: object;
  gender?: string;
  birthday?: string;
}

interface ChatMessage {
  id: number;
  message: string;
  createdAt: string;
  sender: Sender;
  sent?: boolean;
  received?: boolean;
}

const ChatRoom = ({ route }: HomeNavigationProps<'Chat'>): JSX.Element => {
  const { roomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [skip] = useState(0);
  const [first] = useState(100);
  const [serverErrorMessage, setServerErrorMessage] = useText('');
  const [user, setUser] = useState({} as Sender);
  const [getMessages] = useLazyQuery(QUERY_CHATMESSAGE_LIST, {
    notifyOnNetworkStatusChange: false,
    onCompleted: ({ chatMessages }) => {
      if (chatMessages.length > 0) {
        setMessages(
          chatMessages.map((message: ChatMessage) => {
            return {
              _id: message.id,
              text: message.message,
              createdAt: message.createdAt,
              user: {
                _id: message.sender.id === user.id ? 1 : 2,
                name: `${message.sender.firstName} ${message.sender.lastName}`,
              },
            };
          }),
        );
      }
    },
    onError: logError(setServerErrorMessage),
  });

  useEffect(() => {
    const getMessageList = async (): Promise<void> => {
      const _user = (await AsyncStorage.getItem('USER')) as string;
      setUser(JSON.parse(_user));
      getMessages({ variables: { chatRoomId: roomId, skip, first } });
    };

    getMessageList();
  }, []);

  const [sendMessage] = useMutation(MUTATION_SEND_MESSAGE, {
    notifyOnNetworkStatusChange: false,
    fetchPolicy: 'no-cache',
    onError: logError(setServerErrorMessage),
  });

  const onSend = useCallback((messages = [], userId: number) => {
    setMessages((previousMessages) => {
      const message = messages[messages.length - 1].text;

      sendMessage({
        variables: {
          data: {
            message,
            chatRoom: { connect: { id: roomId } },
            sender: { connect: { id: userId } },
          },
        },
      });

      return GiftedChat.append(previousMessages, messages);
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages, user.id)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatRoom;
