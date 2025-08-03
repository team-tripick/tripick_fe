'use client';

import { usePlanAll } from '@/apis';
import { Button, PlanPost } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Plan() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [datas, setDatas] = useState<
    {
      id: number;
      title: string;
      content: string;
      date: string;
      keyword: string[];
    }[]
  >([]);

  const { data } = usePlanAll();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      const mapped = data.map((item) => ({
        id: item.id,
        title: item.place,
        content: item.plan,
        date: item.createdAt,
        keyword: item.keyword, 
      }));
      setDatas(mapped);
    }
  }, [data]); 
  

  return (
    <Flex
      paddingBottom="70px"
      paddingTop="70px"
      paddingLeft="100px"
      paddingRight="100px"
      width="100%"
      isColumn={true}
      gap={16}
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Text fontSize={24} fontWeight={600}>
          여행 계획
        </Text>
        <Button onClick={() => router.push('/plan-write')}>
          여행 계획 작성하기
        </Button>
      </Flex>

      <Text
        isSpan={true}
        color={colors.orange[500]}
        fontSize={20}
        fontWeight={600}
      >
        {datas.length}
        <Text isSpan={true} fontSize={20}>
          개
        </Text>
      </Text>

      <Flex width="100%" isColumn={true} gap={12}>
        {datas.map((data) => (
          <PlanPost
            key={data.id}
            isLoading={isLoading}
            onClick={() => router.push(`/plan-detail/${data.id}`)} // ✅ Next.js 방식
            title={data.title}
            content={data.content}
            date={data.date}
            keyword={data.keyword } 
          />
        ))}
      </Flex>
    </Flex>
  );
}
