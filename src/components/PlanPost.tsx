import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import Keyword from './Keyword';

interface IPostType {
  title: string;
  content: string;
  date: string;
  keyword: string[];
  onClick?: () => void;
  isLoading?: boolean;
}

export default function PlanPost({
  title,
  content,
  date,
  keyword,
  onClick,
  isLoading,
}: IPostType) {
  return (
    <PostContainer onClick={onClick}>
      <Flex isColumn={true} gap={24}>
        <Flex isColumn={true} gap={8}>
          {isLoading ? (
            <TextSkeleton>{title}</TextSkeleton>
          ) : (
            <Text fontSize={20} fontWeight={600}>
              {title}
            </Text>
          )}
          {isLoading ? (
            <TextSkeleton>{content}</TextSkeleton>
          ) : (
            <Text fontSize={16} fontWeight={400}>
              {content}
            </Text>
          )}
        </Flex>
        <Flex gap={24} alignItems="center">
          {isLoading ? (
            <TextSkeleton>{date}</TextSkeleton>
          ) : (
            <Text fontSize={16} fontWeight={400} color={colors.gray[500]}>
              {date}
            </Text>
          )}

          <Flex gap={8} alignItems="center">
            {isLoading ? (
              <TextSkeleton>{keyword}</TextSkeleton>
            ) : (
              keyword.map((data, index) => (
                <Keyword key={index}>{data}</Keyword>
              ))
            )}
          </Flex>
        </Flex>
      </Flex>
    </PostContainer>
  );
}

const TextSkeleton = styled(Skeleton)`
  font-size: 20px;
  font-weight: 600;
  color: transparent;
`;

const PostContainer = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 32px 42px;
  border-radius: 20px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.gray[100]};
`;
