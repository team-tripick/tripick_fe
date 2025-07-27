import { colors, Flex, Text } from '@/design-token';
import styled from '@emotion/styled';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

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
  return (
    <Flex isColumn={true} gap={8} width="100%">
      <Text fontWeight={400} fontSize={16}>
        {label}
      </Text>
      <Line />
      <Flex gap={40} width="100%">
        <TextArea
          value={value}
          onChange={handleContentChange}
          placeholder={placeholder}
        />
        <MarkDown>
          <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
            {datas}
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
`;

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
