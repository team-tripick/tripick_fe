'use client';

import { useLogDel, useLogDetail } from '@/apis';
import { DelModal } from '@/components';
import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function LogDetail() {
  const router = useRouter();
  const id = useParams()
  const logId = Number(id.id);

  const {data} = useLogDetail(logId)

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    title: string;
    date: { startDate: string; endDate: string };
    log: string;
  }>({
    title: '',
    date: {
      startDate: '',
      endDate: '',
    },
    log: '',
  });

  useEffect(() => {
    if (data && typeof data === 'object') {
      setDatas({
        title: data.title,
        log: data.log,
        date: { startDate: data.startDate, endDate: data.endDate },
      });
    }
  }, [data]);

  const handleDelClick = () => {
    setIsOpen(true);
  };

  const logDelApi = useLogDel()
  const handleRealDelClick = () => {
    logDelApi.mutate(logId, {
      onSuccess: () => {
        router.push(`/plan-detail/${data.planId}`)
      }
    })
  };

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
          {isLoading ? (
            <TextSkeleton>{datas.title}</TextSkeleton>
          ) : (
            <Text fontSize={36} fontWeight={700}>
              {datas.title}
            </Text>
          )}
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
          <Btn onClick={() => router.push(`/log-edit/${logId}`)}>수정</Btn>
          <Btn onClick={handleDelClick}>삭제</Btn>
        </Flex>
      </Flex>
      {isLoading ? (
        <TextSkeleton>{datas.log}</TextSkeleton>
      ) : (
        <Mark>
          <ReactMarkdown>{datas.log.replace(/\n/g, '  \n')}</ReactMarkdown>
        </Mark>
      )}
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
