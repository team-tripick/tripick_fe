'use client'

import { colors, Flex, Text } from "@/design-token";
import Keyword from "./Keyword";
import styled from "@emotion/styled";
import { ChatPostIcon } from "@/assets";
import { useRouter } from "next/navigation";

interface IChatPostType {
  id: string,
  name: string,
  place: string,
}

export default function ChatPost ({id, name, place} : IChatPostType) {
  const router = useRouter()
  const handleConnectClick = () => {
    //api 연동
    router.push(`chat-list/${id}`)
  }
  return (
    <PostWrapper>
      <Flex isColumn gap={16}>
        <Text>{name}</Text>
        <Keyword>{place}</Keyword>
      </Flex>
      <BtnWrapper onClick={handleConnectClick}>
        <ChatPostIcon/>
      </BtnWrapper>
    </PostWrapper>
  )
}

const PostWrapper = styled.div `
  width: 100%;
  padding: 30px 45px;
  border-bottom: 1px solid ${colors.gray[300]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`


const BtnWrapper = styled.button ` 
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
  display: flex;
  justify-content: center;
  align-items: center;
`