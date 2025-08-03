'use client';

import { useAuthSignupApi } from '@/apis';
import { useEmailAuthCodeCheck, useEmailVerify } from '@/apis/email';
import { Button, Inputs } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignUp() {
  const router = useRouter();
  const [datas, setDatas] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: '',
  });

  const [password, setPassword] = useState<{
    password1: string;
    password2: string;
  }>({
    password1: '',
    password2: '',
  });

  const [code, setCode] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, password1: e.target.value }));
  };
  const handlePwdCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, password2: e.target.value }));
  };

  const handlePwdCheckBlur = () => {
    if (password.password1 && password.password2) {
      if (password.password1 !== password.password2) {
        toast.error('비밀번호가 일치하지 않습니다.');
      } else {
        toast.success('비밀번호가 일치합니다.');
        setDatas((prev) => ({ ...prev, password: password.password1 }));
      }
    }
  };

  const emailApi = useEmailVerify()
  const handleEmailClick = () => {
    emailApi.mutate({email :datas.email})
  };

  const authCodeCheckApi = useEmailAuthCodeCheck()
  const handleBlurCodeCheck = () => {
    authCodeCheckApi.mutate({email : datas.email, authCode : code})
  }

  const signupApi = useAuthSignupApi()
  const handleSignupClick = () => {
    signupApi.mutate({email : datas.email, name: datas.name, password: datas.password}, {
      onSuccess: () => {
        router.push('/login')
      }
    })
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      paddingBottom="100px"
      paddingTop="100px"
    >
      <Flex isColumn={true} gap={20} width="428px" alignItems='center'>

      <Flex isColumn={true} gap={64} width="428px">
        <Flex isColumn={true} gap={16}>
          <Text fontSize={36} fontWeight={700}>
            회원가입
          </Text>
          <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
            회원가입 후 Tripick을 이용해보세요
          </Text>
        </Flex>
        <Flex isColumn={true} gap={32} width="100%">
          <Inputs
            placeholder="이름을 입력하세요"
            label="이름"
            onChange={handleNameChange}
            value={datas.name}
          />
          <Flex gap={10} width="100%" alignItems="end">
            <Inputs
              placeholder="이메일을 입력하세요"
              label="이메일"
              onChange={handleEmailChange}
              value={datas.email}
            />
            <Button onClick={handleEmailClick}>인증</Button>
          </Flex>
          <Inputs
            placeholder="인증코드를 입력하세요"
            label="인증코드"
            onChange={handleCodeChange}
            value={code}
            onBlur={handleBlurCodeCheck}
          />
          <Inputs
            placeholder="비밀번호를 입력하세요"
            label="비밀번호"
            onChange={handlePwdChange}
            value={password.password1}
            isPwd={true}
          />
          <Inputs
            placeholder="비밀번호를 다시 입력하세요"
            label="비밀번호 확인"
            onChange={handlePwdCheckChange}
            value={password.password2}
            isPwd={true}
            onBlur={handlePwdCheckBlur}
          />
        </Flex>
        <Button onClick={handleSignupClick} width="100%">
          회원가입
        </Button>
      </Flex>
       <Flex gap={8}><Text fontSize={16} fontWeight={400} color={colors.gray[600]}>이미 계정이 있다면?</Text><Nav  onClick={() => router.push('/login')}>로그인</Nav></Flex>
      </Flex>
    </Flex>
  );
}

const Nav = styled.button `
  cursor: pointer;
  background-color: transparent;
  font-size: 16px;
`