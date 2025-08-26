'use client';

import { Logo } from '@/assets';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies  from 'js-cookie';
import { useUserMe } from '@/apis';


export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState<string>('Error');
  const accessToken = Cookies.get('accessToken');

  const {data} = useUserMe();

  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  },[data])

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
        <NavContainer>
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
        </NavContainer>
      ) : (
        <Btn onClick={() => router.push('/login')}>로그인</Btn>
      )}
    </HeaderContainer>
  );
}

const NavContainer = styled.div `
  display: flex;
  align-items: center;
  gap: 55px;
  @media (max-width : 480px) {
    display: none;
  }
`

const HeaderContainer = styled.header`
  width: 100vw;
  height: 68px;
  background-color: ${colors.gray[100]};
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 0 190px;
  @media (max-width : 610px) {
    padding: 0 40px;
  }
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
