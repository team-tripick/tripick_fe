import { RootLayout } from '@/layouts';

export const metadata = {
  title: 'Tripick',
  description:
    '여행 준비부터 기록까지, 한 번에! Tripick으로 쉽고 간편하게 여행을 관리하세요.',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
