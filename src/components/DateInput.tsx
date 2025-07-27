'use client';

import { DateIcon } from '@/assets';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useRef } from 'react';

interface IDateType {
  label?: string;
  data: { startDate: string; endDate: string };
  setData: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
}

export default function DateInput({ label, data, setData }: IDateType) {
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, endDate: e.target.value }));
  };

  return (
    <Flex isColumn={true} gap={8}>
      <Text fontWeight={400} fontSize={16}>
        {label}
      </Text>
      <Flex alignItems="center" gap={16}>
        <DateInputContainer>
          {data.startDate || '시작일 선택'}
          <DateIcon
            onClick={(e: React.MouseEvent) => {
              startDateRef.current?.click();
              startDateRef.current?.showPicker();
              e.stopPropagation();
            }}
          />
          <Date
            value={data.startDate}
            onChange={handleStartDateChange}
            ref={startDateRef}
            type="date"
          />
        </DateInputContainer>
        <Text fontSize={20} fontWeight={600} color={colors.gray[500]}>
          ~
        </Text>
        <DateInputContainer>
          {data.endDate || '종료일 선택'}{' '}
          <DateIcon
            onClick={(e: React.MouseEvent) => {
              endDateRef.current?.click();
              endDateRef.current?.showPicker();
              e.stopPropagation();
            }}
          />
          <Date
            value={data.endDate}
            onChange={handleEndDateChange}
            ref={endDateRef}
            type="date"
          />
        </DateInputContainer>
      </Flex>
    </Flex>
  );
}

const Date = styled.input`
  opacity: 0;
  position: absolute;
  top: 50px;
  left: 0;
`;

const DateInputContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: auto;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
  font-size: 16px;
  color: ${colors.gray[400]};
  font-weight: 400;
  display: flex;
  gap: 20px;
  align-items: center;
`;
