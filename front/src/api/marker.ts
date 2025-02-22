import {axiosInstance} from './axios.ts';

const getMarkers = async () => {
  const {data} = await axiosInstance.get('/markers/my');
  return data;
};

export {getMarkers};
