import { useMutation, useQuery } from "@tanstack/react-query"
import { instance } from "../instance"
import { toast } from "react-toastify"
import { errorConfig } from "../errorConfig"
import {ILogEditRequest, ILogWriteRequest } from "./types"

const path = '/logs'

export const useLogDetail = (logId : number) => {
  return useQuery({
    queryKey: ['logDetail', logId],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${logId}`);
      return data;
    },
  });
};

export const useLogDel = () => {
  return useMutation({
    mutationFn: async(logId : number) => {
      await instance.delete(`${path}/${logId}`)
    },
    onSuccess: () => {
      toast.success('삭제가 정상적으로 완료되었습니다.')
    },
    onError : (error) => {
      errorConfig(error)
    }
  })
}

export const useLogEdit = () => {
  return useMutation({
    mutationFn: async(data: ILogEditRequest) => {
      const { logId, ...logData } = data;
      const response = await instance.patch(`${path}/${logId}`, logData);

      return response;
    }, 
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    }
  })
}

export const useLogWrite = () => {
  return useMutation({
    mutationFn: async(data: ILogWriteRequest) => {
      const response = await instance.post(`${path}`, data);

      return response;
    }, 
    onSuccess: () => {
      toast.success('작성이 완료되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    }
  })
}