import { useMutation, useQuery } from "@tanstack/react-query";
import { instance } from "../instance";
import { toast } from "react-toastify";
import { errorConfig } from "../errorConfig";

const path = '/users'

export const useUserMe = () => {
  return useQuery({
    queryKey: ['userMe'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}`);
      return data;
    },
  });
};

export const useUserDel = () => {
  return useMutation({
    mutationFn: async() => {
      await instance.delete(`${path}`)
    },
    onSuccess: () => {
      toast.success('회원탈퇴가 정상적으로 완료되었습니다.')
    },
    onError : (error) => {
      errorConfig(error)
    }
  })
}