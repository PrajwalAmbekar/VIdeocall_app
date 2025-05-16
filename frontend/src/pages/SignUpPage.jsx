import React from 'react'
import { useState } from 'react';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router';
const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(signUpData);
  }
  return (
    //container
    <div className='h-screen flex justify-center items-center p-4 sm:p-6 md:p-8' data-theme="forest">
      {/*inner container having two sides left-right*/}
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
      {/*left side having form*/}
        <div className=' w-full lg:w-1/2 flex flex-col  p-4 sm:p-8 ' >

          <div className='mb-4 flex justify-start items-center gap-2'>
            <ShipWheelIcon className='text-primary size-9' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              Streamify
            </span>
          </div>
          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className='space-y-4'>
                <h2 className='text-xl font-semibold'>Create an account</h2>
                <p className='text-sm opacity-70'> Join Streamify and start your language learning journey</p>
              </div>
              <div className='space-y-3'>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Username</span>
                  </label>
                  <input type="text"
                    placeholder="Enter your name"
                    className='input input-bordered w-full'
                    value={signUpData.username}
                    onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                    required />
                </div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type="email"
                    placeholder="Enter your email"
                    className='input input-bordered w-full'
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required />
                </div>
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input type="password"
                    placeholder="*********"
                    className='input input-bordered w-full'
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required />
                  <p className='text-xs opacity-70 mt-1'> Password must be at least 6 characters</p>
                </div>
                <div className='form-control'>
                  <label className='label cursor-pointer justify-start gap-2'>
                    <input type="checkbox" className='checkbox checkbox-sm' required />
                    <span className='text-xs leading-tight'>I agree to the {""}
                      <span className='text-primary hover:underline cursor-pointer'>Terms and Conditions</span> and {" "}<span className='text-primary hover:underline cursor-pointer'>Privacy Policy</span>
                    </span>
                  </label>
                </div>
                <div className='form-control'>
                  <button type="submit" className='btn btn-primary w-full'>Create Account</button>
                  <div className='text-center mt-4'>
                    <p className='text-sm'>Already have an account? {" "} <Link to="/login" className='text-primary hover:underline cursor-pointer'>Login</Link></p>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>
      {/*right side having image and text*/}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div
              className='max-w-md p-8'>
              <div className='relative aspect-square max-w-sm mx-auto'>
                <img src="./public/Video call-bro.svg" alt="Language collection Illustration" className='w-full h-full' /></div>
              <div className=' text-center space-y-3 mt-6'>
                <h2 className='text-xl font-semibold'>Connect with people from around the world</h2>
                <p className=' opacity-70'>Practice conversations,make friends and improve your language skills with Streamify</p>
              </div>
            </div>
        </div>
      </div>
    </div>

  )
}

export default SignUpPage;
