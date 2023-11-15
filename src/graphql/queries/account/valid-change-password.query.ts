import client from '../../apollo-client';
import { VALID_CHANGE_PASSWORD } from '../../gql/account';
import { Account } from '../../interfaces/account';

type Args = {
  userId: string;
  token: string;
};

const validChangePasswordQuery = async (args: Args) => {
  const response = await client.query({
    query: VALID_CHANGE_PASSWORD,
    variables: { ...args },
  });

  const isValid: boolean = response.data?.validChangePassword;
  return isValid;
};

export default validChangePasswordQuery;
