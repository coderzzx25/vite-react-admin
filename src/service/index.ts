import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
import { message } from 'antd';
import store from '@/store';
import axios, { AxiosError } from 'axios';
import { refreshTokenAsyncThunk } from '@/store/modules/auths';
import { localCache } from '@/utils/cache';

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
      return Promise.reject(error);
    },
    responseSuccessFn: (response) => {
      NProgress.done();
      return response.data;
    },
    responseFailureFn: async (error) => {
      NProgress.done();

      if (axios.isCancel(error)) {
        message.warning('请勿频繁操作');
        return Promise.reject(error);
      }

      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        message.warning('正在刷新token,请稍后重试');
        const result = await store.dispatch(refreshTokenAsyncThunk());
        if (refreshTokenAsyncThunk.fulfilled.match(result)) {
          message.success('刷新token成功,请重新操作');
        } else {
          message.error('刷新token失败,请重新登录');
          // 跳转到登录页
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          // 清除本地存储
          localCache.deleteCache('userInfo');
          localCache.deleteCache('accessToken');
          localCache.deleteCache('refreshToken');
        }
      }
      return Promise.reject(error);
    }
  }
});

export default VrRequest;
