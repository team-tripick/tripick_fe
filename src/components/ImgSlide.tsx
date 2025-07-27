import { FirstImg, FourthImg, SecondImg, ThirdImg } from '@/assets';
import { AnimationBox, Flex } from '@/design-token';

export default function ImgSlide() {
  return (
    <AnimationBox rotate="left">
      <Flex gap={44} alignItems="center" paddingRight="44px">
        <FirstImg />
        <SecondImg />
        <ThirdImg />
        <FourthImg />
      </Flex>
    </AnimationBox>
  );
}
