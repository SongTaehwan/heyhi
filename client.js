import AsyncStorage from '@react-native-community/async-storage';
import {
  InMemoryCache
} from 'apollo-cache-inmemory';
import {
  ApolloLink,
  Observable
} from 'apollo-link';
import {
  createHttpLink
} from 'apollo-link-http';
import {
  RetryLink
} from 'apollo-link-retry';
import {
  ApolloClient
} from 'apollo-client';
import {
  onError
} from 'apollo-link-error';
import Config from 'react-native-config';
import resolvers from './resolvers';
import {
  typeDefs
} from './schema';

// TODO: Customize ApolloClient setting ie. error handling, advanced options and cache setting
// TODO: dig into request Link logic
const httpLink = createHttpLink({
  uri: Config.API_HOST
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem('ACCESS_TOKEN');
  console.log(token);
  console.log('AUTH: ', Config.HEYHI_AUTHENTICATION)
  operation.setContext(({
    headers = {}
  }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
      'heyhi-authorization': Config.HEYHI_AUTHENTICATION,
    },
  }));
};

const getRefreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
  return refreshToken;
};

const checkTokenValidation = (message) => {
  try {
    const parsedData = JSON.parse(message).statusCode === 401;
    return parsedData;
  } catch {
    return false;
  }
};

const getAccessToken = () => {
  // Add url
  return fetch(`${Config.API_HOST}/`);
};

const getNewAccessToken = async (operation) => {
  const headers = operation.getContext().headers;
  const refreshToken = await getRefreshToken();
  const newAccessToken = await getAccessToken(refreshToken);
  await AsyncStorage.setItem('ACCESS_TOKEN', newAccessToken.data.at);

  operation.setContext({
    headers: {
      ...headers,
      authorization: `Bearer ${newAccessToken.data.at}`,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
  new Observable((observer) => {
    let handle;
    Promise.resolve(operation)
      .then((oper) => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  }),
);

const errorLink = onError(
  ({
    response,
    operation,
    graphQLErrors,
    networkError
  }) => {
    if (graphQLErrors) {
      // TODO: 엑세스 토큰 만료 시 서버로부터 응답 받을 메시지를 정하고 checkTokenValidation 로직 수정
      // const isTokenExpired = checkTokenValidation(graphQLErrors[0].message);
      const isTokenExpired = false;

      if (isTokenExpired) {
        let handle;
        return new Observable((observer) => {
          getNewAccessToken(operation)
            .then(() => {
              handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(observer.error.bind(observer));

          return () => {
            if (handle) handle.unsubscribe();
          };
        });
      }

      graphQLErrors.forEach(({
        message,
        locations,
        path
      }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  resolvers,
  link: ApolloLink.from([retryLink, requestLink, errorLink, httpLink]),
  cache,
  connectToDevTools: true,
  typeDefs,
});

cache.writeData({
  data: {
    user: {
      email: null,
      firstName: null,
      lastName: null,
      gender: null,
      nationality: null,
      password: null,
      birthDate: null,
      thumbnail: null,
      photos: [],
      __typename: 'Member',
    },
  },
});

export default client;