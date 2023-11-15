import UserProfile from '../../../interfaces/user-profile';
import client from '../../apollo-client';
import { GET_USER } from '../../gql/user';

async function getUserQuery() {
  const response = await client.query({
    query: GET_USER,
    fetchPolicy: 'no-cache',
  });

  const user: UserProfile = response.data?.getUser;
  return user;
}

export default getUserQuery;
