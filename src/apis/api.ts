import axios from 'axios'

const isDev = process?.env?.NODE_ENV === 'development'

const baseURL = isDev
  ? 'http://localhost:3000/api/'
  : 'http://localhost:3000/api/'

export const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
