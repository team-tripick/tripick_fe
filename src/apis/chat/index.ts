import { useQuery } from "@tanstack/react-query"
import { instance } from "../instance"
import { IChatUserListResponse } from "./types"


export const useGetChatUserList = () => {
  return useQuery<IChatUserListResponse[]>({
    queryKey: ['chat'],
    queryFn: async () => {
      const { data } = await instance.get('/chat/users')
      return data
    },
  })
}
export const useGetChatUserHistory = (userId : string) => {
  return useQuery({
    queryKey: ['chatHistory', userId],
    queryFn: async() => {
      const {data} = await instance.get(`/chat/history/${userId}`);
      return data
    },
    enabled: !!userId,
  })
}

