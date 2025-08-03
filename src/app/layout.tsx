import { RootLayout } from '@/layouts';
import { ReactQueryProvider } from '../providers';

export const metadata = {
  title: 'Tripick',
  description:
    '여행 준비부터 기록까지, 한 번에! Tripick으로 쉽고 간편하게 여행을 관리하세요.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Tripick</title>
        <meta
          name="description"
          content="여행 준비부터 기록까지, 한 번에! Tripick으로 쉽고 간편하게 여행을 관리하세요."
        />
      </head>
      <body>
        <ReactQueryProvider>
          <RootLayout>{children}</RootLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
