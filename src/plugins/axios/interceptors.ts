import { AxiosInstance, AxiosResponse } from 'axios';

const getDataFromResponse = (response: AxiosResponse) => {
  // console.log('response', response)
  // return {
  //   // data: response.data,
  //   status: response.status
  // };
  return response;
}

export default function interceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(getDataFromResponse);
};
