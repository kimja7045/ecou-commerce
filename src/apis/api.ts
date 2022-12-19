import axios from 'axios'

const isDev = process?.env?.NODE_ENV === 'development'

const baseURL = `${process?.env?.NEXT_PUBLIC_BASE_URL}/api/`

export const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
