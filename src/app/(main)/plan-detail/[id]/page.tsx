'use client';

import { Keyword, LogPost, Button, DelModal } from '@/components';
import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PlanDetail() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    title: string;
    keyword: string[];
    date: { startDate: string; endDate: string };
    plan: string;
    log: { title: string; content: string; date: string; id: number }[];
  }>({
    title: '2025 여름 제주 여행',
    keyword: ['제주도', '여름', '맛집', '힐링'],
    date: {
      startDate: '2025-07-15',
      endDate: '2025-07-20',
    },
    plan: '# 제주 여행 계획\n\n## Day 1\n- 공항 도착\n- 렌트카 픽업\n- 숙소 체크인\n\n## Day 2\n- 성산 일출봉 등반\n- 우도 배 타고 다녀오기\n\n## Day 3\n- 협재 해수욕장\n- 카페 투어\n\n## Day 4\n- 시장 구경\n- 기념품 쇼핑\n\n## Day 5\n- 체크아웃 및 귀가',
    log: [
      {
        id: 1,
        title: '첫날, 도착과 숙소',
        content:
          '제주공항에 도착하자마자 렌트카를 픽업하고 숙소로 향했다. 바닷가 근처 숙소였는데 뷰가 정말 좋았다.',
        date: '2025-07-15',
      },
      {
        id: 1,
        title: '성산 일출봉과 우도',
        content:
          '아침 일찍 성산 일출봉에 올라 일출을 봤다. 이후 우도로 이동해 전기차 타고 한 바퀴 돌았다.',
        date: '2025-07-16',
      },
      {
        id: 1,
        title: '협재 해변에서의 하루',
        content:
          '물이 너무 맑고 시원했다. 해수욕을 실컷 하고 근처 유명 카페에서 쉬었다.',
        date: '2025-07-17',
      },
      {
        id: 1,
        title: '마지막 날 쇼핑',
        content:
          '동문시장에 들러 귤 초콜릿과 오메기떡을 샀다. 비행기 시간 전에 간단히 식사 후 귀가.',
        date: '2025-07-18',
      },
    ],
  });

  const handleDelClick = () => {
    setIsOpen(true);
  };

  const handleRealDelClick = () => {
    //del api
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Flex
      isColumn={true}
      width="100%"
      gap={50}
      paddingBottom="70px"
      paddingLeft="100px"
      paddingRight="100px"
      paddingTop="70px"
    >
      <Flex width="100%" justifyContent="space-between">
        <Flex isColumn={true} gap={12}>
          <Flex gap={24} alignItems="center">
            {isLoading ? (
              <TextSkeleton>{datas.title}</TextSkeleton>
            ) : (
              <Text fontSize={36} fontWeight={700}>
                {datas.title}
              </Text>
            )}
            <Flex gap={12}>
              {isLoading ? (
                <TextSkeleton>{datas.keyword}</TextSkeleton>
              ) : (
                datas.keyword.map((data, index) => (
                  <Keyword key={index}>{data}</Keyword>
                ))
              )}
            </Flex>
          </Flex>
          {isLoading ? (
            <TextSkeleton>
              {datas.date.startDate + '~' + datas.date.endDate}
            </TextSkeleton>
          ) : (
            <Flex alignItems="center" gap={4}>
              <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
                {datas.date.startDate}
              </Text>
              <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
                ~
              </Text>
              <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
                {datas.date.endDate}
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex gap={12}>
          <Btn onClick={() => router.push('/plan-edit')}>수정</Btn>
          <Btn onClick={handleDelClick}>삭제</Btn>
        </Flex>
      </Flex>
      {isLoading ? (
        <TextSkeleton>{datas.plan}</TextSkeleton>
      ) : (
        <Mark>
          <ReactMarkdown>{datas.plan}</ReactMarkdown>
        </Mark>
      )}
      <Flex isColumn={true} gap={20} width="100%">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize={24} fontWeight={600}>
            여행 일지
          </Text>
          <Button onClick={() => router.push('/log-write')}>
            여행 일지 작성하기
          </Button>
        </Flex>
        <Flex width="100%" isColumn={true} gap={16}>
          {datas.log.map((data, index) => (
            <LogPost
              isLoading={isLoading}
              onClick={() => router.push(`/log-detail/:${data.id}`)}
              key={index}
              title={data.title}
              content={data.content}
              date={data.date}
            />
          ))}
        </Flex>
      </Flex>
      {isOpen && (
        <DelModal
          delClick={handleRealDelClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </Flex>
  );
}

const Mark = styled.div`
  width: 100%;
`;

const Btn = styled.div`
  font-size: 16px;
  color: ${colors.gray[600]};
`;

const TextSkeleton = styled(Skeleton)`
  font-size: 20px;
  font-weight: 600;
  color: transparent;
`;
