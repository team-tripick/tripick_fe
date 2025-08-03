'use client';

import { useMutation } from '@tanstack/react-query';
import { instance } from '../instance';
import { ILoginRequestType, ILoginResponseType, ISignupRequestType } from './types';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { errorConfig } from '../errorConfig';


const path = '/auth';

export const useAuthLoginApi = () => {
  return useMutation({
    mutationFn: async (data: ILoginRequestType): Promise<ILoginResponseType> => {
      const response = await instance.post(`${path}/login`, data);
      return response.data;
    },
    onSuccess:  (data) => {
      const { accessToken, refreshToken } = data;

      Cookies.set('accessToken', accessToken, { expires: 7 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });

      toast.success('로그인이 완료되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    },
  });
};

export const useAuthSignupApi = () => {
  return useMutation({
    mutationFn: async(data: ISignupRequestType) => {
      const response = await instance.post(`${path}/signup`, data);

      return response.data;
    },
    onSuccess: async () => {
      toast.success('회원가입이 완료되었습니다.')
    },
    onError: (error) => {
      errorConfig(error)
    },
  });
};

// export const useAuthRefresh = () => {
//   return useMutation({
//     mutationFn: async() => {
//       const refreshToken = Cookies.get('refreshToken');
//       if (!refreshToken) {
//         toast.error('refresh token이 없습니다.')
//       }

//       const response = await instance.post(
//         '/auth/refresh',
//         {}, 
//         {
//           headers: {
//             Authorization: `Bearer ${refreshToken}`,
//           },
//         }
//       );
//       return response.data;
//     },
//     onSuccess: async (data)=> {
//       const newAccessToken = data.accessToken;
//       const newRefreshToken = data.refreshToken;
//       Cookies.set('accessToken', newAccessToken);
//       Cookies.set('refreshToken', newRefreshToken);
//     } ,
//      onError: () => {
//       toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
//       Cookies.remove('accessToken');
//       Cookies.remove('refreshToken');
//     },
//   })
// }