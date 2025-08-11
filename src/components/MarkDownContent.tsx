import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github.css';

interface IMarkdownType {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function MarkDownContent({
  label,
  placeholder,
  onChange,
  value,
}: IMarkdownType) {
  const [datas, setDatas] = useState<string>('');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDatas(e.target.value);
    onChange?.(e);
  };

  // value가 있으면 value를 사용하고, 없으면 datas를 사용
  const displayValue = value !== undefined ? value : datas;

  return (
    <Flex isColumn={true} gap={8} width="100%">
      <Text fontWeight={400} fontSize={16}>
        {label}
      </Text>
      <Line />
      <Flex gap={40} width="100%">
        <TextArea
          value={displayValue}
          onChange={handleContentChange}
          placeholder={placeholder}
        />
        <MarkDown>
          <ReactMarkdown 
            remarkPlugins={[remarkBreaks, remarkGfm]}
            rehypePlugins={[
              rehypeRaw,
              rehypeHighlight,
              rehypeSlug,
            ]}
            components={{
              blockquote: ({children}) => (
                <blockquote style={{
                  borderLeft: '4px solid #ddd',
                  paddingLeft: '16px',
                  margin: '1em 0',
                  fontStyle: 'italic',
                  color: '#666'
                }}>
                  {children}
                </blockquote>
              ),
              code: ({ children, className, ...props}) => {
                  return (
                    <code
                      style={{
                        backgroundColor: '#f6f8fa',
                        padding: '2px 4px',
                        borderRadius: '3px',
                        fontSize: '0.9em'
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
              pre: ({children}) => (
                <pre style={{
                  backgroundColor: '#f6f8fa',
                  padding: '16px',
                  borderRadius: '6px',
                  overflow: 'auto',
                  marginBottom: '16px'
                }}>
                  {children}
                </pre>
              ),
            }}
          >
            {displayValue}
          </ReactMarkdown>
        </MarkDown>
      </Flex>
    </Flex>
  );
}

const MarkDown = styled.div`
  width: 50%;
  height: 300px;
  overflow-y: scroll;
  line-height: 1.6;
`

const TextArea = styled.textarea`
  width: 50%;
  height: 300px;
  resize: none;
  font-size: 16px;
  font-weight: 400;
  color: ${colors.gray[900]};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[300]};
`;