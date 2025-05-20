import { axiosInstance } from "./axios.js";
export const signup = async (data) => {
  const res = await axiosInstance.post('/auth/Signup', data);
  return res.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/Protected');
    return res.data ?? {}; // Make sure it always returns something
  } catch (error) {
    console.error('Error fetching auth user:', error);
    return {}; // Return fallback data instead of undefined
  }
};


export const onBoarding = async (data) => { 
  const res = await axiosInstance.post('/auth/Onboarding', data);
  return res.data;
};
