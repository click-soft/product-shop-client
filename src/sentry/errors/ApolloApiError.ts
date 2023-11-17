import { ApolloError, ServerError, ServerParseError } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import { GraphQLErrorExtensions } from 'graphql';

class ApolloClientError extends Error implements ApolloError {
  name: string;
  message: string;
  graphQLErrors: GraphQLErrors;
  protocolErrors: readonly { message: string; extensions?: GraphQLErrorExtensions[] | undefined }[];
  clientErrors: readonly Error[];
  networkError: Error | ServerParseError | ServerError | null;
  extraInfo: any;
  stack?: string | undefined;
  cause?: unknown;

  constructor(error: ApolloError, message?: string) {
    const msg = message ?? error.message;
    super(msg);

    let name = 'ApolloClientError';

    for (let err of error.graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          name = 'ApolloClientUnauthenticatedError';
          break;
        case 'FORBIDDEN':
          name = 'ApolloClientForbiddenError';
          break;
        case 'NOT_FOUND':
          name = 'ApolloClientNotFoundError';
          break;
        case 'BAD_USER_INPUT':
          name = 'ApolloClientBadUserInputError';
          break;
        case 'INTERNAL_SERVER_ERROR':
          name = 'ApolloClientInternalServerError';
          break;
        default:
          name = 'ApolloClientError';
          break;
      }
      break;
    }

    this.name = name;
    this.message = msg;
    this.stack = error.stack;
    this.protocolErrors = error.protocolErrors;
    this.clientErrors = error.clientErrors;
    this.graphQLErrors = error.graphQLErrors;
    this.networkError = error.networkError;
  }
}

export default ApolloClientError;
