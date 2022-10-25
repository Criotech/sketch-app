import axios, { AxiosRequestConfig } from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BASEURL || 'http://localhost:5200/v1/api';

axios.defaults.baseURL = baseUrl;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
