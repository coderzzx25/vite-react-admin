import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { RequestConfig } from './type';

class Request {
  instance: AxiosInstance;
  pendingRequests: Map<string, AbortController>;

  // request实例 => axios的实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.pendingRequests = new Map();

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        this.cancelPendingRequest(config);
        const controller = new AbortController();
        config.signal = controller.signal;
        const requestKey = this.getRequestKey(config);
        this.pendingRequests.set(requestKey, controller);
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.removePendingRequest(res.config);
        return Promise.resolve(res);
      },
      (err) => {
        this.removePendingRequest(err.config);
        return Promise.reject(err);
      }
    );

    // 针对特定的Request实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  getRequestKey(config: RequestConfig): string {
    return `${config.method}:${config.url}`;
  }

  cancelPendingRequest(config: RequestConfig) {
    const requestKey = this.getRequestKey(config);
    if (this.pendingRequests.has(requestKey)) {
      const controller = this.pendingRequests.get(requestKey);
      controller?.abort();
      this.pendingRequests.delete(requestKey);
    }
  }

  removePendingRequest(config: RequestConfig) {
    const requestKey = this.getRequestKey(config);
    if (this.pendingRequests.has(requestKey)) {
      this.pendingRequests.delete(requestKey);
    }
  }

  // 封装网络请求的方法
  request<T = any>(config: RequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            reject(new Error('请求被取消'));
          } else {
            reject(err);
          }
        });
    });
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: RequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default Request;
