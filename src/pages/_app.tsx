import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


export default function App({ Component, pageProps }: AppProps) {
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
})

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* TODO: globalStyle 적용하기 */}
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}
