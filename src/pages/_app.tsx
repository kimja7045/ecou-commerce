import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Layout/Header';
import { SessionProvider } from 'next-auth/react';
import styled from '@emotion/styled';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          {/* TODO: globalStyle 적용하기 */}
          <Container>
            <Header />
            <Component {...pageProps} />
          </Container>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const Container = styled.div`
  padding: 0 36px;
`;
