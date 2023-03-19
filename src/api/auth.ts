import { client } from './client';

const AuthAPI = {
  getToken: async (credential: string) => {
    const response = await client.get(
      `auth/get-token?credential=${credential}`,
    );
    return response.data;
  },
};
export default AuthAPI;
