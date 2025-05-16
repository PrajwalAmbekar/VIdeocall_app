import { LoaderPinwheel } from 'lucide-react';
import React from 'react'

const PageLoader = () => {
  return (
      <div className='h-screen flex justify-center items-center'>
        <span className='loading loading-spinner loading-lg text-primary'> <LoaderPinwheel/> </span>
      </div>
    )
}

export default PageLoader;
