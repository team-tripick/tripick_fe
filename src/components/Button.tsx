'use client';

import { colors } from '@/design-token';
import styled from '@emotion/styled';

interface IButtonType {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  onClick: () => void;
  children: string;
  isBlocked?: boolean;
  width?: string;
}

export default function Button({
  backgroundColor = colors.orange[500],
  color = colors.gray[100],
  borderColor = colors.orange[500],
  onClick,
  children,
  isBlocked,
  width,
}: IButtonType) {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      color={color}
      borderColor={borderColor}
      onClick={onClick}
      isBlocked={isBlocked}
      width={width}
    >
      {children}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button<
  Omit<IButtonType, 'onClick' & 'children'>
>`
  width: ${({ width }) => (width ? width : 'fit-content')};
  padding: 14px 29px;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: 20px;
  opacity: ${({ isBlocked }) => (isBlocked ? 0.5 : 1)};
  pointer-events: ${({ isBlocked }) => (isBlocked ? 'none' : 'cursor')};
  white-space: nowrap;
`;
