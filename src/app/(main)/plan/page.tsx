'use client';

import { usePlanAll } from '@/apis';
import { Button, PlanPost } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Plan() {
  const router = useRouter();
  const [isMedia, setIsMedia] = useState<boolean>(false);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMedia(window.innerWidth <= 510);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  },[])

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
      width="100%"
      isColumn={true}
      gap={16}
      flexWrap='wrap'
    >
      <Flex flexWrap='wrap' width="100%" justifyContent="space-between" alignItems="center">
        <Text isMedia={true} fontSize={24} fontWeight={600}>
          여행 계획
        </Text>
        <Button onClick={() => router.push('/plan-write')}>
          {isMedia? "계획 작성" :  "여행 계획 작성하기"}
        </Button>
      </Flex>

      <Text
        isMedia={true}
        isSpan={true}
        color={colors.orange[500]}
        fontSize={20}
        fontWeight={600}
      >
        {datas.length}
        <Text isMedia={true} isSpan={true} fontSize={20}>
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
