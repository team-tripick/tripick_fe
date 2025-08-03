import { useMutation, useQuery } from "@tanstack/react-query"
import { instance } from "../instance"
import { toast } from "react-toastify"
import { errorConfig } from "../errorConfig"
import {IPlanEditRequest, IPlanWriteRequest } from "./types"

const path = '/plans'

export const usePlanAll = () => {
  return useQuery({
    queryKey: ['planAll'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}`);
      return data;
    },
  });
};


export const usePlanDetail = (planId : number) => {
  return useQuery({
    queryKey: ['planDetail', planId],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${planId}`);
      return data;
    },
  });
};

export const usePlanDel = () => {
  return useMutation({
    mutationFn: async(planId : number) => {
      await instance.delete(`${path}/${planId}`)
    },
    onSuccess: () => {
      toast.success('삭제가 정상적으로 완료되었습니다.')
    },
    onError : (error) => {
      errorConfig(error)
    }
  })
}

export const usePlanEdit = () => {
  return useMutation({
    mutationFn: async(data: IPlanEditRequest) => {
      const { planId, ...planData } = data;
      const response = await instance.patch(`${path}/${planId}`, planData);

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

export const usePlanWrite = () => {
  return useMutation({
    mutationFn: async(data: IPlanWriteRequest) => {
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