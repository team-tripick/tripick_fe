'use client';

import { Button, UserDelModal } from '@/components';
import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Mypage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{ email: string; name: string }>({
    email: 'pjylove08@gmail.com',
    name: '박지연',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUserDelClick = () => {
    setIsOpen(true);
  };

  const handleUserRealDelClick = () => {
    //탈퇴 api
  };

  const handleLogoutClick = () => {
    //쿠키 삭제
    router.push('/login');
  };
  return (
    <Flex paddingTop="100px" paddingLeft="100px" paddingRight="100px">
      <Flex isColumn={true} gap={24} width="100%">
        <Flex isColumn={true} gap={12}>
          {isLoading ? (
            <TextSkeleton>{datas.name}님</TextSkeleton>
          ) : (
            <Text isSpan={true} fontSize={32} fontWeight={700}>
              {datas.name}
              <Text isSpan={true} fontSize={32} fontWeight={400}>
                님
              </Text>
            </Text>
          )}
          {isLoading ? (
            <TextSkeleton>{datas.email}</TextSkeleton>
          ) : (
            <Text fontSize={14} fontWeight={400} color={colors.gray[500]}>
              {datas.email}
            </Text>
          )}
        </Flex>
        <MessageContainer>
          <Text fontSize={20} fontWeight={600} color={colors.gray[800]}>
            tripick의 한마디
          </Text>
          <Line />
          <Text fontSize={20} fontWeight={400} color={colors.gray[800]}>
            Tripick은 당신의 여행 계획과 소중한 추억을 하나로 기록하는 여행
            동반자입니다.
          </Text>
        </MessageContainer>
        <Flex gap={12}>
          <Button onClick={handleUserDelClick}>탈퇴하기</Button>
          <Button
            onClick={handleLogoutClick}
            backgroundColor={colors.gray[100]}
            color={colors.orange[500]}
          >
            로그아웃
          </Button>
        </Flex>
      </Flex>
      {isOpen && (
        <UserDelModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          delClick={handleUserRealDelClick}
        />
      )}
    </Flex>
  );
}

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[300]};
`;

const MessageContainer = styled.div`
  width: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 12px;
  background-color: ${colors.gray[200]};
`;

const TextSkeleton = styled(Skeleton)`
  font-size: 20px;
  font-weight: 600;
  color: transparent;
`;
