'use client';

import { Header } from '@/components';
import styled from '@emotion/styled';
import { GlobalStyle } from '@/design-token';
import { useLoginCheck } from '@/hooks';


export default function HeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useLoginCheck();
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <GlobalStyle />
    </>
  );
}

const MainContent = styled.main`
  margin-top: 68px;
  padding: 70px 100px;
  @media (max-width : 420px) {
    padding: 40px 40px;
  }
`;
