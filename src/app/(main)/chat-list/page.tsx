'use client'

import { useGetChatUserList } from "@/apis";
import { ChatPost } from "@/components";
import { Flex } from "@/design-token";

export default function ChatList() {
  const { isLoading, data } = useGetChatUserList()

  return (
    <Flex>
      <Flex isColumn width="100%">
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          data?.map((user) => (
            <ChatPost
              key={user.id}
              name={user.name}
              id={user.id}
              place={user.latestPlace}
            />
          ))
        )}
      </Flex>
    </Flex>
  )
}
