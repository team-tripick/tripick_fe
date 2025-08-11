'use client';

import { colors } from '@/design-token';
import styled from '@emotion/styled';

interface IKeywordType {
  children: string;
  onClick?: () => void;
}

export default function Keyword({ children, onClick }: IKeywordType) {
  return <KeywordContainer onClick={onClick}>{children}</KeywordContainer>;
}

const KeywordContainer = styled.div`
  padding: 5px 15px;
  border-radius: 100px;
  border: 1px solid ${colors.orange[400]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${colors.orange[400]};
  background-color: #ffae3d16;
  @media (max-width: 420px) {
    font-size: 9px;
  }
`;
