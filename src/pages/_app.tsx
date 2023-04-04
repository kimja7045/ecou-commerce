import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/AppLayout/Header';
import { SessionProvider } from 'next-auth/react';
import styled from '@emotion/styled';
import { Suspense } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        suspense: true,
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          {/* TODO: globalStyle 적용하기 */}
          <Container>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <Component {...pageProps} />
            </Suspense>
          </Container>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const Container = styled.div`
  padding: 0 36px;
`;
