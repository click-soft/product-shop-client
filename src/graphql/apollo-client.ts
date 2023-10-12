import { ApolloClient, HttpLink, InMemoryCache, Observable, concat, fromPromise } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import LocalStorageManager, { LocalStoragekey } from "../utils/local-storage-manager";
import { onError } from '@apollo/client/link/error';
import { refresh } from "./mutates/auth";
import store from "../store";
import { modalActions } from "../store/modal-slice";
import { errorActions } from "../store/error-slice";

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = LocalStorageManager.get<string>(LocalStoragekey.ACT);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            return new Observable(observer => {
              refresh()
                .then(result => {
                  let headers = {
                    // re-add old headers
                    ...operation.getContext().headers,
                    // switch out old access token for new one
                    authorization: `Bearer ${result.accessToken}`,
                  };
                  operation.setContext({
                    headers
                  });

                  const subscriber = {
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer)
                  };

                  // Retry the request, subscribe to the result and pass to the forward chain
                  forward(operation).subscribe(subscriber);
                })
                .catch(error => {
                  store.dispatch(errorActions.setError({ code: "TOKEN_EXPIRED", error: new Error(error) }))
                  observer.error(error);
                });
            });

          // return forward(operation);
        }
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // apollo-link-retry
    }
  }
);

const apolloLink = concat(errorLink, concat(authLink, httpLink));

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: apolloLink,
  cache: new InMemoryCache(),
});

export default client;
