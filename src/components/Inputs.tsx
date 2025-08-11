'use client';

import { Eyes } from '@/assets';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useState } from 'react';

interface IInputsType {
  label?: string;
  isPwd?: boolean;
  isError?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  onBlur?: () => void;
  width?: string;
}

export default function Inputs({
  label,
  isPwd,
  onChange,
  value,
  placeholder,
  isError,
  onBlur,
  width,
  onKeyUp,
}: IInputsType) {
  const [isEyeClose, setIsEyeClose] = useState<boolean>(false);

  const handleEyeClick = () => {
    setIsEyeClose(!isEyeClose);
  };
  return (
    <Flex isColumn={true} gap={8} width="100%">
      <Text  isMedia={true} fontWeight={400} fontSize={16}>
        {label}
      </Text>
      <InputContainer>
        <Input
          onKeyUp={onKeyUp}
          width={width}
          onBlur={onBlur}
          isError={isError}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type={isEyeClose ? 'password' : 'text'}
        />
        {isPwd && <Eyes onClick={handleEyeClick} isEye={isEyeClose} />}
      </InputContainer>
    </Flex>
  );
}

const InputContainer = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Input = styled.input<Pick<IInputsType, 'isError' | 'width'>>`
  width: ${({ width }) => (width ? width : '100%')};
  border-radius: 12px;
  border: 1px solid
    ${({ isError }) => (isError ? colors.error : colors.gray[300])};
  background-color: ${colors.gray[200]};
  font-size: 16px;
  font-weight: 400;
  padding: 17px 19px;
  &::placeholder {
    color: ${colors.gray[400]};
  }
`;
