import client from '../../apollo-client';
import { CHANGE_EMAIL } from '../../gql/account';
import { Account } from '../../interfaces/account';

type Args = {
  newEmail: string;
};

const changeEmailMutate = async (args: Args) => {
  const response = await client.mutate({
    mutation: CHANGE_EMAIL,
    variables: { ...args },
  });

  const affected: number = response.data?.changeEmail?.affected;
  return !!affected;
};

export default changeEmailMutate;
