'use client';

import { Header } from '@/components';
import styled from '@emotion/styled';
import { GlobalStyle } from '@/design-token';


export default function HeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
`;
