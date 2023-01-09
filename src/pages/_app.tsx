import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* TODO: globalStyle 적용하기 */}
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}
