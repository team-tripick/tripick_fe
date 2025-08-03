'use client';

import { usePlanDel, usePlanDetail } from '@/apis';
import { Keyword, LogPost, Button, DelModal } from '@/components';
import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type LogItem = {
  title: string;
  log: string;
  createdAt: string;
  logId: number;
};

export default function PlanDetail() {
  const router = useRouter();
  const id = useParams()
  const planId = Number(id.id);

  const {data} = usePlanDetail(planId)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    title: string;
    keyword: string[];
    date: { startDate: string; endDate: string };
    plan: string;
    log: { title: string; content: string; date: string; id: number }[];
  }>({
    title: '',
    keyword: [],
    date: {
      startDate: '',
      endDate: '',
    },
    plan: '',
    log: [],
  });

  useEffect(() => {
  if (data && typeof data === 'object') {
    setDatas({
      title: data.place,
      plan: data.plan,
      date: { startDate: data.startDate, endDate: data.endDate },
      keyword: data.keyword ?? [],
      log: (data.logs ?? []).map((logItem: LogItem) => ({
        title: logItem.title,
        content: logItem.log,
        date: logItem.createdAt,
        id: logItem.logId,
      })),
    });
  }
}, [data]);


  const handleDelClick = () => {
    setIsOpen(true);
  };

  const planDelApi = usePlanDel()
  const handleRealDelClick = () => {
    planDelApi.mutate(planId, {
      onSuccess: () => {
        router.push('/plan')
      }
    })
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
          <Flex gap={24} alignItems="center" flexWrap='wrap'>
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
          <Btn onClick={() => router.push(`/plan-edit/${planId}`)}>수정</Btn>
          <Btn onClick={handleDelClick}>삭제</Btn>
        </Flex>
      </Flex>
      {isLoading ? (
        <TextSkeleton>{datas.plan}</TextSkeleton>
      ) : (
        <Mark>
          <ReactMarkdown>{datas.plan.replace(/\n/g, '  \n')}</ReactMarkdown>
        </Mark>
      )}
      <Flex isColumn={true} gap={20} width="100%">
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize={24} fontWeight={600}>
            여행 일지
          </Text>
          <Button onClick={() => router.push(`/log-write/${planId}`)}>
            여행 일지 작성하기
          </Button>
        </Flex>
        <Flex width="100%" isColumn={true} gap={16}>
          {datas.log.map((data, index) => (
            <LogPost
              isLoading={isLoading}
              onClick={() => router.push(`/log-detail/${data.id}`)}
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
  height: 300px;
  overflow-y: scroll;
  line-height: 1.6;
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
