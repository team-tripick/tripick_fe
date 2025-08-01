'use client';

import { Logo } from '@/assets';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState<string>('박지연');
  const accessToken = '2345';

  const [planPath, setPlanPath] = useState<boolean>(false);

  useEffect(() => {
    if (pathname.includes('plan') || pathname.includes('log')) {
      setPlanPath(true);
    } else {
      setPlanPath(false);
    }
  }, [pathname]);

  return (
    <HeaderContainer>
      <Logo onClick={() => router.push('/')} />
      {accessToken ? (
        <Flex gap={55} alignItems="center">
          <Text
            onClick={() => router.push('/plan')}
            isCursor={true}
            fontSize={16}
            fontWeight={400}
            color={planPath ? colors.orange[500] : colors.gray[900]}
          >
            여행 계획
          </Text>
          <Text
            onClick={() => router.push('/mypage')}
            isCursor={true}
            fontSize={16}
            fontWeight={400}
          >
            {name} 님
          </Text>
        </Flex>
      ) : (
        <Btn onClick={() => router.push('/login')}>로그인</Btn>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 68px;
  background-color: ${colors.gray[100]};
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 190px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Btn = styled.div`
  padding: 10px 20px;
  border-radius: 12px;
  background-color: ${colors.orange[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.gray[100]};
  cursor: pointer;
  font-size: 16px;
`;
