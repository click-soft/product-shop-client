import { ApolloClient, HttpLink, InMemoryCache, Observable, concat, fromPromise } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { LocalStoragekey } from '../utils/enums';
import { onError } from '@apollo/client/link/error';
import { refresh } from './mutates/auth';
import { environment } from '../config';
import store from '../store';
import { errorActions } from '../store/error-slice';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LocalStoragekey.ACT);

  return {
    headers: {
      ...headers,
      'X-Is-Test': environment,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          return new Observable((observer) => {
            refresh()
              .then((result) => {
                let headers = {
                  // re-add old headers
                  ...operation.getContext().headers,
                  // switch out old access token for new one
                  authorization: `Bearer ${result.accessToken}`,
                };
                operation.setContext({
                  headers,
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                // Retry the request, subscribe to the result and pass to the forward chain
                forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                store.dispatch(errorActions.setError({ status: 401, message: 'UNAUTHORIZED' }));
                observer.error(error);
              });
          });

        // return forward(operation);
      }
    }
  }
  if (networkError) {
    // console.log(`[Network error]: ${networkError}`);
    // if you would also like to retry automatically on
    // network errors, we recommend that you use
    // apollo-link-retry
  }
});

const apolloLink = concat(errorLink, concat(authLink, httpLink));

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: apolloLink,
  cache: new InMemoryCache(),
});

export default client;
