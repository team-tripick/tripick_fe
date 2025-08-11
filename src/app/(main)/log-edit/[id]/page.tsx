'use client';

import { useLogDetail, useLogEdit } from '@/apis';
import { Button, DateInput, Inputs, MarkDownContent } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useParams, useRouter } from 'next/navigation';
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

  const id = useParams()
  const logId = Number(id.id);
  
  const {data} = useLogDetail(logId)

    useEffect(() => {
      if (data && typeof data === 'object') {
        setDatas((prev) => ({
          ...prev,
          title: data.title,
          log: data.log,
        }));
        setDate({
          startDate: data.startDate,
          endDate: data.endDate
        })
      }
    }, [data]);

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


  const editApi = useLogEdit()
  const handleEditClick = () => {
    editApi.mutate({title : datas.title, date: datas.date, log: datas.log, logId: logId}, {
      onSuccess: () => {
        router.push(`/log-detail/${logId}`)
      }
    })
  };

  return (
    <Flex
      isColumn={true}
      gap={80}
    >
      <Flex gap={12} flexWrap='wrap' width="100%" justifyContent="space-between" alignItems="center">
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
