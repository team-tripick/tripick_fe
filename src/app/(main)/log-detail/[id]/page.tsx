'use client';

import { DelModal } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function LogDetail() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    title: string;
    date: { startDate: string; endDate: string };
    log: string;
  }>({
    title: '2025 여름 제주 여행',
    date: {
      startDate: '2025-07-15',
      endDate: '2025-07-20',
    },
    log: '# 제주 여행 계획\n\n## Day 1\n- 공항 도착\n- 렌트카 픽업\n- 숙소 체크인\n\n## Day 2\n- 성산 일출봉 등반\n- 우도 배 타고 다녀오기\n\n## Day 3\n- 협재 해수욕장\n- 카페 투어\n\n## Day 4\n- 시장 구경\n- 기념품 쇼핑\n\n## Day 5\n- 체크아웃 및 귀가',
  });

  const handleDelClick = () => {
    setIsOpen(true);
  };

  const handleRealDelClick = () => {
    //del api
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
          <Text fontSize={36} fontWeight={700}>
            {datas.title}
          </Text>
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
        </Flex>
        <Flex gap={12}>
          <Btn onClick={() => router.push('/log-edit')}>수정</Btn>
          <Btn onClick={handleDelClick}>삭제</Btn>
        </Flex>
      </Flex>
      <Mark>
        <ReactMarkdown>{datas.log}</ReactMarkdown>
      </Mark>
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
