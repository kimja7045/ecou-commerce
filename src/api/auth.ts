import { client } from './client';

const AuthAPI = {
  signUp: async (credential: string) => {
    const response = await client.get(`auth/sign-up?credential=${credential}`);
    return response.data;
  },
};
export default AuthAPI;
