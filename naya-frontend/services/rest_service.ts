import axiosInstance from './axios_instance_services';

export async function post<T extends Record<string, any>>(
  url: string,
  data: T
) {
  return await axiosInstance.post(url, data);
}

export async function patch<T extends Record<string, any>>(
  url: string,
  data: T
) {
  return await axiosInstance.patch(url, data);
}

export const get = async (url: string) => {
  return await axiosInstance.get(url);
};
