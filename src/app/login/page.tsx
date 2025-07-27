'use client';

import { Button, Inputs } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [datas, setDatas] = useState<{ id: string; password: string }>({
    id: '',
    password: '',
  });

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, id: e.target.value }));
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, password: e.target.value }));
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="calc(100vh - 80px)"
    >
      <Flex isColumn={true} gap={64} width="428px">
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
            placeholder="아이디를 입력하세요"
            label="아이디"
            onChange={handleIdChange}
            value={datas.id}
          />
          <Inputs
            placeholder="비밀번호를 입력하세요"
            label="비밀번호"
            onChange={handlePwdChange}
            value={datas.password}
            isPwd={true}
          />
        </Flex>
        <Button onClick={() => router.push('/')} width="100%">
          로그인
        </Button>
      </Flex>
    </Flex>
  );
}
