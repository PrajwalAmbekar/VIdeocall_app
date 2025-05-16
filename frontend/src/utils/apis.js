import { axiosInstance } from "./axios.js";
export const signup = async (data) => {
  const res = await axiosInstance.post('/auth/Signup', data);
  return res.data;
};
export const getAuthUser = async () => {
  async () => {
    const res = await axiosInstance.get('/auth/Protected');
    return res.data;
  };
};

export const onBoarding = async (data) => { 
  const res = await axiosInstance.post('/auth/Onboarding', data);
  return res.data;
};
