import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';

interface AnimationBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  rotate: 'left' | 'right';
}

export default function AnimationBox({ children, rotate }: AnimationBoxProps) {
  return (
    <Container>
      <RollingContainer1 rotate={rotate}>{children}</RollingContainer1>
      <RollingContainer2 rotate={rotate}>{children}</RollingContainer2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

const leftRolling = keyframes`
    0% {
        transform: translateX(0)
    }
    50% {
        transform: translateX(-100%);
    }
    50.01% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
`;

const copyLeftRolling = keyframes`
    0% {
        transform: translateX(0)
    }
    100% {
        transform: translateX(-200%);
    }
`;

const rightRolling = keyframes`
    0% {
        transform: translateX(0)
    }
    50% {
        transform: translateX(100%)
    }
    50.01% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0)
    }
`;

const copyRightRolling = keyframes`
    0% {
        transform: translateX(-200%)
    }
    100% {
        transform: translateX(0);
    }
`;

const RollingContainer1 = styled.div<AnimationBoxProps>`
  display: flex;
  animation: ${({ rotate }) => (rotate === 'left' ? leftRolling : rightRolling)}
    linear 30s infinite;
`;

const RollingContainer2 = styled.div<AnimationBoxProps>`
  display: flex;
  animation: ${({ rotate }) =>
      rotate === 'left' ? copyLeftRolling : copyRightRolling}
    linear 30s infinite;
`;
