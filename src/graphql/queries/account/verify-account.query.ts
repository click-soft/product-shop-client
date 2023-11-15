import client from '../../apollo-client';
import { VERIFY_ACCOUNT } from '../../gql/account';
import { Account } from '../../interfaces/account';

type Args = {
  userId: string;
  password: string;
};

const verifyAccountQuery = async (args: Args) => {
  const response = await client.query({
    query: VERIFY_ACCOUNT,
    variables: { ...args },
  });

  const account: Account = response.data?.verifyAccount;
  return account;
};

export default verifyAccountQuery;
