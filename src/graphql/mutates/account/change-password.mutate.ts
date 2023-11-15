import client from '../../apollo-client';
import { CHANGE_PASSWORD } from '../../gql/account';
import { Account } from '../../interfaces/account';

type Args = {
  userId: string;
  password: string;
};

const changePasswordMutate = async (args: Args) => {
  const response = await client.mutate({
    mutation: CHANGE_PASSWORD,
    variables: { ...args },
  });

  const affected: number = response.data?.changePassword?.affected;
  return !!affected;
};

export default changePasswordMutate;
