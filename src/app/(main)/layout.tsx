import { HeadLayout } from '@/layouts';

export default function layout({ children }: { children: React.ReactNode }) {
  return <HeadLayout>{children}</HeadLayout>;
}
