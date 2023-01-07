import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { Client } from "@notionhq/client";

const queryClient = new QueryClient()

export const notionClient = new Client({
  auth: process?.env?.NEXT_PUBLIC_NOTION_SECRET,
})

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
