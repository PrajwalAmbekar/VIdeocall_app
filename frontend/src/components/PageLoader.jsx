import { LoaderPinwheel } from 'lucide-react';
import React from 'react'
import { useThemeStore } from '../stores/useThemeStore.jsx';

const PageLoader = () => {
  const {theme} = useThemeStore();
  return (
      <div className='h-screen flex justify-center items-center' data-theme={theme}>
        <span className='loading loading-spinner loading-lg text-primary'> <LoaderPinwheel/> </span>
      </div>
    )
}

export default PageLoader;
