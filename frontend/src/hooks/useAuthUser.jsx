import React from 'react'
import { getAuthUser } from '../utils/apis.js';
import { useQuery } from '@tanstack/react-query';

const useAuthUser = () => {
    const authData = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
  });
  return {isLoading: authData.isLoading,  user: authData.data?.user}
}

export default useAuthUser
