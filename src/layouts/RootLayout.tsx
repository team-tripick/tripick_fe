'use client';

import { GlobalStyle } from '@/design-token';
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <MainContent>{children}</MainContent>
      <GlobalStyle />
    </>
  );
}

const MainContent = styled.main`
  width: 100vw;
`;
