import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const errorConfig = <T>(error: unknown): void => {
  const err = error as AxiosError<T & { message?: string }>;
  const msg = err.response?.data?.message || '요청 중 오류가 발생했습니다.';
  toast.error(msg);
};