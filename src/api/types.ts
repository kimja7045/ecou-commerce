import { AxiosError } from 'axios';

type AuthErrorData = {
  messages: {
    id: string;
    message: string;
  };
};

export type AuthError = AxiosError<{
  statusCode: number;
  error: string;
  message: AuthErrorData;
  data: AuthErrorData;
}>;
