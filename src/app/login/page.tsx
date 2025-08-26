'use client';

import { useAuthLoginApi } from '@/apis';
import { Button, Inputs } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { BeatLoader } from 'react-spinners';


export default function Login() {
  const router = useRouter();
  const [datas, setDatas] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, password: e.target.value }));
  };

  const loginApi = useAuthLoginApi()

  const handleLoginClick = () => {
    setIsLoading(true);
    loginApi.mutate(
      { email: datas.email, password: datas.password },
      {
        onSuccess: () => {
          setTimeout(() => {
            setIsLoading(false);
            router.push('/');
          }, 100);
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };


  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="calc(100vh - 80px)"
      paddingLeft='20px'
      paddingRight='20px'
    >
      <Flex isColumn={true} gap={20} width="428px" alignItems='center'>
      <Flex isColumn={true} gap={64} width="100%">
        <Flex isColumn={true} gap={16}>
          <Text fontSize={36} fontWeight={700} isMedia={true}>
            로그인
          </Text>
          <Text fontSize={20} fontWeight={400}  isMedia={true} color={colors.gray[600]}>
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
      {isLoading && (
        <Background>
          <BeatLoader color={colors.orange[500]} size={"20px"}/>
        </Background>
      )}
    </Flex>
  );
}
const Background = styled.div `
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.08);
  z-index: 1000;
`

const Nav = styled.button `
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
`
