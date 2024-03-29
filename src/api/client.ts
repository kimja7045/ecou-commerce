import axios from 'axios';

const isDev = process?.env?.NODE_ENV === 'development';
const baseURL = isDev
  ? 'http://localhost:3000/api/'
  : `${process?.env?.NEXT_PUBLIC_BASE_URL}/api/`;

export const client = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const headers = ({ token }: { token: string }) => ({
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});
