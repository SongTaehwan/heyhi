import AsyncStorage from '@react-native-community/async-storage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';

// TODO: Customize ApolloClient setting ie. error handling, advanced options and cache setting
// TODO: dig into request Link logic
const httpLink = createHttpLink({ uri: '' });

const request = async operation => {
  const token = await AsyncStorage.getItem('ACCESS_TOKEN');
  console.log(token);
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
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
  ({ response, operation, forward, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
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

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: ApolloLink.from([httpLink, requestLink, errorLink]),
  cache,
  connectToDevTools: true,
});

export default client;
