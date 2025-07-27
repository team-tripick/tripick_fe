'use client';

import { colors, Flex, Text } from '@/design-token';
import { DropDownArrow } from '@/assets';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

interface IDropDownType {
  datas: (string | number)[];
  label?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export default function DropDown({
  datas,
  label,
  value,
  onChange,
}: IDropDownType) {
  const [content, setContent] = useState<string | number>(value || datas[0]);
  const headRef = useRef<HTMLDivElement>(null);
  const [headWidth, setHeadWidth] = useState<number | null>(null);
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    if (headRef.current) setHeadWidth(headRef.current.offsetWidth);
  }, [content]);

  useEffect(() => {
    if (value !== undefined) setContent(value);
  }, [value]);

  const handleOptionClick = (data: string | number) => {
    setContent(data);
    setIsClick(false);
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <Flex isColumn={true} gap={8}>
      <Text fontWeight={400} fontSize={16}>
        {label}
      </Text>
      <DropAllContainer>
        <Flex isColumn={true}>
          <DropHead ref={headRef} onClick={() => setIsClick(!isClick)}>
            {content}
            <DropDownArrow isClick={isClick} />
          </DropHead>
          {isClick && (
            <DropContainer width={headWidth}>
              {datas.map((data) => (
                <DropOption key={data} onClick={() => handleOptionClick(data)}>
                  {data}
                </DropOption>
              ))}
            </DropContainer>
          )}
        </Flex>
      </DropAllContainer>
    </Flex>
  );
}

const DropAllContainer = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const DropHead = styled.div`
  padding: 8px 16px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  color: ${colors.gray[800]};
  font-size: 16px;
`;

const DropOption = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.gray[800]};
  &:hover {
    transition: 0.35s ease-in-out;
    background-color: ${colors.gray[200]};
  }
  flex-shrink: 0;
`;

const DropContainer = styled.div<{ width: number | null }>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  position: absolute;
  max-height: 200px;
  overflow-y: auto;
  top: 39px;
  z-index: 1;
  background-color: ${colors.gray[100]};
`;
