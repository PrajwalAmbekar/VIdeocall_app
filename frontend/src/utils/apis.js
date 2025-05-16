import { axiosInstance } from "./axios.js";
export const signup = async (data) => {
  const res = await axiosInstance.post('/auth/Signup', data);
  return res.data;
};