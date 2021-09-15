import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

import { GET_TOKEN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_TOKEN);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signIn = async ({ username, password }) => {
    const credentials = {
      credentials: {
        username,
        password
      }
    }
    const { data } = await mutate({ variables: credentials });
    await authStorage.setAccessToken(data.authorize.accessToken)
    client.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;