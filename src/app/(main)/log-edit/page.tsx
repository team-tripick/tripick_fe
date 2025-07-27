'use client';

import { Button, DateInput, Inputs, MarkDownContent } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LogEdit() {
  const router = useRouter();
  const [datas, setDatas] = useState<{
    title: string;
    date: { startDate: string; endDate: string };
    log: string;
  }>({
    title: '',
    date: { startDate: '', endDate: '' },
    log: '',
  });

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

  const handleEditClick = () => {
    //edit api
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
            여행일지 수정
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
          <Button onClick={handleEditClick}>수정하기</Button>
        </Flex>
      </Flex>
      <Flex gap={40} isColumn={true} width="100%">
        <Inputs
          width="743px"
          onChange={handleTitleChange}
          value={datas.title}
          label="키워드"
          placeholder="키워드를 입력하세요"
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
