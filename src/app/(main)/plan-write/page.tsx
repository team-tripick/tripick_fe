'use client';

import { usePlanWrite } from '@/apis';
import {
  Button,
  DateInput,
  DropDown,
  Inputs,
  Keyword,
  MarkDownContent,
} from '@/components';
import { colors, Flex, Text } from '@/design-token';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PlanWrite() {
  const router = useRouter();
  const dropData = [
  '선택안함',
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '수원시',
  '성남시',
  '고양시',
  '용인시',
  '부천시',
  '안산시',
  '청주시',
  '천안시',
  '전주시',
  '포항시',
  '창원시',
  '화성시',
  '전주시',
  '김해시',
  '광명시',
  '광양시',
  '안양시',
  '남양주시',
  '평택시',
  '구리시',
  '군포시',
  '하남시',
  '이천시',
  '여수시',
  '동두천시',
  '의정부시',
  '오산시',
  '양산시',
  '양주시',
  '진주시',
  '김천시',
  '밀양시',
  '영주시',
  '동해시',
  '속초시',
  '서귀포시',
  '제주시'
];

  const [datas, setDatas] = useState<{
    place: string;
    keyword: string[];
    date: { startDate: string; endDate: string };
    plan: string;
  }>({
    place: '',
    keyword: [],
    date: { startDate: '', endDate: '' },
    plan: '',
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
    setDatas((prev) => ({ ...prev, plan: e.target.value }));
  };

  const [inputKeyword, setInputKeyword] = useState<string>('');

  const handleKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(e.target.value);
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputKeyword.trim()) {
      e.preventDefault();

      if (!datas.keyword.includes(inputKeyword.trim())) {
        setDatas((prev) => ({
          ...prev,
          keyword: [...prev.keyword, inputKeyword.trim()],
        }));
      }

      setInputKeyword('');
    }
  };


  const handleKeywordDel = (index: number) => {
    setDatas((prev) => {
      const newKeywords = [...prev.keyword];
      newKeywords.splice(index, 1);
      return { ...prev, keyword: newKeywords };
    });
  };

  const writeApi = usePlanWrite()

  const handleWriteClick = () => {
    writeApi.mutate({place : datas.place, keyword: datas.keyword, date: datas.date, plan: datas.plan},
      {
        onSuccess: () => {
          router.push('/plan')
        }
      }
    )
  };

  return (
    <Flex
      isColumn={true}
      gap={80}
    >
      <Flex width="100%" gap={12} flexWrap='wrap' justifyContent="space-between" alignItems="center">
        <Flex isColumn={true} gap={16}>
          <Text isMedia={true} fontSize={36} fontWeight={700}>
            여행계획 작성
          </Text>
          <Text isMedia={true} fontSize={20} fontWeight={400} color={colors.gray[600]}>
            여행 계획을 작성해보세요
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
        <DropDown
          onChange={(value) =>
            setDatas((prev) => ({ ...prev, place: value.toString() }))
          }
          label="여행지"
          datas={dropData}
        />
        <Flex isColumn={true} gap={14} width={'100%'}>
          <Inputs
            onChange={handleKeywordInput}
            onKeyUp={handleKeywordKeyDown}
            value={inputKeyword}
            label="키워드"
            placeholder="키워드를 입력하세요"
          />
          <Flex gap={12} flexWrap="wrap">
            {datas.keyword.map((data, index) => (
              <Keyword key={index} onClick={() => handleKeywordDel(index)}>
                {data}
              </Keyword>
            ))}
          </Flex>
        </Flex>
        <DateInput label="일정" data={date} setData={setDate} />
        <MarkDownContent
          onChange={handleMarkdownChange}
          value={datas.plan}
          label="일정 계획"
          placeholder="일정을 입력하세요"
        />
      </Flex>
    </Flex>
  );
}
