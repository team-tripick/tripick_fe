'use client';

import { useLogWrite } from '@/apis';
import { Button, DateInput, Inputs, MarkDownContent } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogWrite() {
  const router = useRouter();
  const id = useParams()
    const planId = Number(id.id);
  const [datas, setDatas] = useState<{
    title: string;
    date: { startDate: string; endDate: string };
    log: string;
  }>({
    title: '',
    date: { startDate: '', endDate: '' },
    log: '',
  });

  const  logWriteApi = useLogWrite()

  const [date, setDate] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setDatas((prev) => ({
      ...prev,
      date: { startDate: date.startDate, endDate: date.endDate },
    }));
  }, [date]);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDatas((prev) => ({ ...prev, log: e.target.value }));
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatas((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleWriteClick = () => {
    logWriteApi.mutate({title: datas.title, log: datas.log, date: datas.date, planId: planId}, {
      onSuccess: () => {
        router.push(`/plan-detail/${planId}`)
      }
    })
  };

  return (
    <Flex
      isColumn={true}
      gap={80}
      paddingLeft="100px"
      paddingRight="100px"
      paddingTop="70px"
      paddingBottom="70px"
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <Flex isColumn={true} gap={16}>
          <Text fontSize={36} fontWeight={700}>
            여행일지 작성
          </Text>
          <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
            여행 일지을 작성해보세요
          </Text>
        </Flex>
        <Flex gap={8}>
          <Button
            borderColor={colors.gray[400]}
            backgroundColor={colors.gray[100]}
            color={colors.gray[900]}
            onClick={() => router.back()}
          >
            취소
          </Button>
          <Button onClick={handleWriteClick}>작성하기</Button>
        </Flex>
      </Flex>
      <Flex gap={40} isColumn={true} width="100%">
        <Inputs
          width="743px"
          onChange={handleTitleChange}
          value={datas.title}
          label="제목"
          placeholder="제목을 입력하세요"
        />
        <DateInput label="일정" data={date} setData={setDate} />
        <MarkDownContent
          onChange={handleMarkdownChange}
          value={datas.log}
          label="일정 계획"
          placeholder="일정을 입력하세요"
        />
      </Flex>
    </Flex>
  );
}

