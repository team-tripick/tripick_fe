'use client';

import { useLogDel, useLogDetail } from '@/apis';
import { DelModal } from '@/components';
import { colors, Flex, Skeleton, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';

export default function LogDetail() {
  const router = useRouter();
  const id = useParams();
  const logId = Number(id.id);

  const { data } = useLogDetail(logId);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    title: string;
    date: { startDate: string; endDate: string };
    log: string;
  }>({
    title: '',
    date: {
      startDate: '',
      endDate: '',
    },
    log: '',
  });

  useEffect(() => {
    if (data && typeof data === 'object') {
      setDatas({
        title: data.title,
        log: data.log,
        date: { startDate: data.startDate, endDate: data.endDate },
      });
    }
  }, [data]);

  const handleDelClick = () => {
    setIsOpen(true);
  };

  const logDelApi = useLogDel();
  const handleRealDelClick = () => {
    logDelApi.mutate(logId, {
      onSuccess: () => {
        router.push(`/plan-detail/${data.planId}`);
      },
    });
  };

  return (
    <Flex isColumn={true} width="100%" gap={50}>
      <Flex width="100%" justifyContent="space-between">
        <Flex isColumn={true} gap={12}>
          {isLoading ? (
            <TextSkeleton>{datas.title}</TextSkeleton>
          ) : (
            <Text isMedia={true} fontSize={36} fontWeight={700}>
              {datas.title}
            </Text>
          )}
          {isLoading ? (
            <TextSkeleton>
              {datas.date.startDate + '~' + datas.date.endDate}
            </TextSkeleton>
          ) : (
            <Flex alignItems="center" gap={4}>
              <Text
                isMedia={true}
                fontSize={20}
                fontWeight={400}
                color={colors.gray[600]}
              >
                {datas.date.startDate}
              </Text>
              <Text
                isMedia={true}
                fontSize={20}
                fontWeight={400}
                color={colors.gray[600]}
              >
                ~
              </Text>
              <Text
                isMedia={true}
                fontSize={20}
                fontWeight={400}
                color={colors.gray[600]}
              >
                {datas.date.endDate}
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex gap={12}>
          <Btn onClick={() => router.push(`/log-edit/${logId}`)}>수정</Btn>
          <Btn onClick={handleDelClick}>삭제</Btn>
        </Flex>
      </Flex>
      {isLoading ? (
        <TextSkeleton>{datas.log}</TextSkeleton>
      ) : (
        <Mark>
          <ReactMarkdown
            remarkPlugins={[remarkBreaks, remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
            components={{
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: '4px solid #ddd',
                    paddingLeft: '16px',
                    margin: '1em 0',
                    fontStyle: 'italic',
                    color: '#666',
                  }}
                >
                  {children}
                </blockquote>
              ),
              code: ({ children, className, ...props }) => {
                  return (
                    <code
                      style={{
                        backgroundColor: '#f6f8fa',
                        padding: '2px 4px',
                        borderRadius: '3px',
                        fontSize: '0.9em',
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre
                  style={{
                    backgroundColor: '#f6f8fa',
                    padding: '16px',
                    borderRadius: '6px',
                    overflow: 'auto',
                    marginBottom: '16px',
                  }}
                >
                  {children}
                </pre>
              ),
            }}
          >
            {datas.log.replace(/\n/g, '  \n')}
          </ReactMarkdown>
        </Mark>
      )}
      {isOpen && (
        <DelModal delClick={handleRealDelClick} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </Flex>
  );
}

const Mark = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  line-height: 1.6;
`;

const Btn = styled.div`
  font-size: 16px;
  color: ${colors.gray[600]};
  flex-shrink: 0;
`;

const TextSkeleton = styled(Skeleton)`
  font-size: 20px;
  font-weight: 600;
  color: transparent;
`;
