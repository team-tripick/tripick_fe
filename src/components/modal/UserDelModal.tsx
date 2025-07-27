'use client';

import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import Button from '../Button';
import { useRef } from 'react';

interface IModalType {
  isOpen?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  delClick?: () => void;
}

export default function UserDelModal({
  isOpen,
  setIsOpen,
  delClick,
}: IModalType) {
  const backRef = useRef<HTMLDivElement>(null);

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backRef.current) {
      setIsOpen(false);
    }
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <DelBack ref={backRef} onClick={handleBackClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Flex isColumn={true} gap={32} alignItems="center">
          <Flex isColumn={true} gap={20} alignItems="center">
            <Text fontSize={32} fontWeight={700}>
              계정을 탈퇴하시겠습니까?
            </Text>
            <Text fontSize={20} fontWeight={400} color={colors.gray[600]}>
              탈퇴한 계정은 다시 되돌릴 수 없습니다.
            </Text>
          </Flex>
          <Flex gap={12}>
            <Button
              onClick={delClick ?? (() => {})}
              backgroundColor={colors.error}
              borderColor={colors.error}
            >
              탈퇴
            </Button>
            <Button
              onClick={handleCancelClick}
              borderColor={colors.gray[400]}
              backgroundColor={colors.gray[100]}
              color={colors.gray[900]}
            >
              취소
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </DelBack>
  );
}

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[100]};
  border-radius: 24px;
  padding: 67px 134px;
  z-index: 1001;
`;

const DelBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #00000081;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;
