import { ApolloClient, HttpLink, InMemoryCache, concat } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
// import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//   if (graphQLErrors) {
//     for (let err of graphQLErrors) {
//       switch (err.extensions.code) {
//         // Apollo Server sets code to UNAUTHENTICATED
//         // when an AuthenticationError is thrown in a resolver
//         case "UNAUTHENTICATED":
//           // Modify the operation context with a new token
//           const oldHeaders = operation.getContext().headers;
//           operation.setContext({
//             headers: {
//               ...oldHeaders,
//               // authorization: getNewToken(),
//             },
//           });
//           // Retry the request, returning the new observable
//           return forward(operation);
//       }
//     }
//   }

//   // To retry on network errors, we recommend the RetryLink
//   // instead of the onError link. This just logs the error.
//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`);
//   }
// });
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
