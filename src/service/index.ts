import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
import { message } from 'antd';
import store from '@/store';
import axios, { AxiosError } from 'axios';

// 统一的请求对象
const VrRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = store.getState().auths.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      NProgress.start();
      return config;
    },
    requestFailureFn: (error) => {
      NProgress.done();
      return error;
    },
    responseSuccessFn: (response) => {
      NProgress.done();
      return response.data;
    },
    responseFailureFn: (error) => {
      NProgress.done();
      if (axios.isCancel(error)) {
        message.warning('请勿频繁操作');
      } else {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data as { message?: string })?.message || '请求失败';
        message.error(errorMessage);
      }
    }
  }
});

export default VrRequest;
