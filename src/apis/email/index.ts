import { useMutation } from "@tanstack/react-query"
import { IEmailAuthCodeCheckRequest, IEmailAuthCodeCheckResponse, IEmailAuthCodeRequest, IEmailVerifyRequest, IEmailVerifyResponse } from "./types"
import { instance } from "../instance"
import { toast } from "react-toastify"
import { errorConfig } from "../errorConfig"

const path = '/email'

export const useEmailVerify = () => {
  const emailAuthCode = useEmailAuthCode();

  return useMutation({
    mutationFn: async(data : IEmailVerifyRequest)  => {
      const response = await instance.post(`${path}/verify`, data)
      return [response.data, data];
    },
    onSuccess: (data) => {
      toast.success('이메일 중복확인이 정상적으로 완료되었습니다.')      
      if(data[0].success) {
        emailAuthCode.mutate({email : data[1].email});//useEmailAuthCode
      }
      return data;
    },
    onError: (error) => {
      errorConfig(error)
    }
  })
}

export const useEmailAuthCode = () => {
  return useMutation({
    mutationFn: async(data : IEmailAuthCodeRequest) => {
      const response = await instance.post(`${path}/auth-code`, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('인증코드가 발송되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    }
  })
}

export const useEmailAuthCodeCheck = () => {
  return useMutation({
    mutationFn: async(data : IEmailAuthCodeCheckRequest) : Promise<IEmailAuthCodeCheckResponse> => {
      const response = await instance.post(`${path}/auth-code/verify`, data)
      return response.data
    },
    onSuccess: () => {
      toast.success('인증이 완료되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    }
  })
}