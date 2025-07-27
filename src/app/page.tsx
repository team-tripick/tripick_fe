'use client';

import { Logo, MainMacImg } from '@/assets';
import { Header, ImgSlide } from '@/components';
import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';

export default function Main() {
  return (
    <Flex isColumn={true} gap={140} paddingTop="100px">
      <Header />
      <Flex
        paddingLeft="70px"
        paddingRight="70px"
        width="100%"
        justifyContent="space-between"
        paddingTop="68px"
      >
        <Flex isColumn={true}>
          <Text fontSize={32} fontWeight={600} isSpan={true}>
            당신의{' '}
            <Text
              fontSize={32}
              fontWeight={600}
              color={colors.orange[500]}
              isSpan={true}
            >
              여행
            </Text>
            을
          </Text>
          <Text fontSize={40} fontWeight={600}>
            기억에 남겨보세요
          </Text>
        </Flex>
        <MainMacImg />
      </Flex>
      <Flex paddingLeft="70px" paddingRight="70px" isColumn={true} gap={77}>
        <Flex isColumn={true} gap={20}>
          <Text fontSize={32} isSpan={true} fontWeight={600}>
            <Text
              fontWeight={600}
              fontSize={32}
              isSpan={true}
              color={colors.orange[500]}
            >
              Tripick
            </Text>
            은 여행의 모든 순간에 주목합니다.
          </Text>
          <Text fontWeight={600} fontSize={32}>
            여행을 떠나기 전{' '}
            <Text
              fontWeight={600}
              fontSize={32}
              isSpan={true}
              color={colors.orange[500]}
            >
              설렘 가득한 계획
            </Text>
            부터, 돌아온 후의{' '}
            <Text
              fontWeight={600}
              fontSize={32}
              isSpan={true}
              color={colors.orange[500]}
            >
              따뜻한 기록
            </Text>
            까지.
          </Text>
          <Text fontWeight={600} fontSize={32}>
            Tripick은 당신의 여정을 온전히 담아내기 위해 만들어졌습니다.
          </Text>
        </Flex>
        <ImgSlide />
      </Flex>
      <ThirdBack>
        <Text fontSize={36} fontWeight={600} isSpan={true}>
          떠나기 전에도, 돌아온 후에도.{' '}
          <Text
            fontSize={36}
            fontWeight={600}
            color={colors.orange[500]}
            isSpan={true}
          >
            여행
          </Text>
          엔 언제나
        </Text>
        <Logo width="167.2" height="38" />
      </ThirdBack>
    </Flex>
  );
}

const ThirdBack = styled.div`
  width: 100%;
  height: 430px;
  background-color: ${colors.orange[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
`;
