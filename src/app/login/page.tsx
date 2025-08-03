'use client';

import { useAuthLoginApi } from '@/apis';
import { Button, Inputs } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';


export default function Login() {
  const router = useRouter();
  const [datas, setDatas] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, password: e.target.value }));
  };

  const loginApi = useAuthLoginApi()

  const handleLoginClick = () => {
    loginApi.mutate({email : datas.email, password: datas.password}, {
      onSuccess: () => {
        router.push('/')
      }
    })
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="calc(100vh - 80px)"
    >
      <Flex isColumn={true} gap={20} width="428px" alignItems='center'>
      <Flex isColumn={true} gap={64} width="100%">
        <Flex isColumn={true} gap={16}>
          <Text fontSize={36} fontWeight={700}>
            로그인
          </Text>
          <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
            로그인 후 Tripick을 이용해보세요
          </Text>
        </Flex>
        <Flex isColumn={true} gap={32} width="100%">
          <Inputs
            placeholder="이메일을 입력하세요"
            label="이메일"
            onChange={handleEmailChange}
            value={datas.email}
          />
          <Inputs
            placeholder="비밀번호를 입력하세요"
            label="비밀번호"
            onChange={handlePwdChange}
            value={datas.password}
            isPwd={true}
          />
        </Flex>
        <Button onClick={handleLoginClick} width="100%">
          로그인
        </Button>
      </Flex>
      <Flex gap={8}><Text fontSize={16} fontWeight={400} color={colors.gray[600]}>계정이 없다면?</Text><Nav onClick={() => router.push('/signup')}>회원가입</Nav></Flex>
      </Flex>
    </Flex>
  );
}

const Nav = styled.button `
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
`
