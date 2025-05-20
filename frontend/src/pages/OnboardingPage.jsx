import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from 'react-hot-toast';
import { onBoarding } from '../utils/apis.js';
import { CameraIcon, MapPinIcon, ShipWheelIcon } from 'lucide-react';
import { ShuffleIcon } from 'lucide-react';
import { LANGUAGES } from '../constants/index.js';

const OnboardingPage = () => {
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();

  const [formData, setFormData] = useState({
    username: authUser?.username,
    bio: authUser?.bio,
    nativeLanguage: authUser?.nativeLanguage,
    learningLanguage: authUser?.learningLanguage,
    location: authUser?.location,
    profilePic: authUser?.profilePic,
  });

  const { mutate: onBoardingMutation, isPending, error } = useMutation({
    mutationFn: onBoarding,

    onSuccess: () => {
      toast.success('Onboarding completed successfully');
      queryClient.invalidateQueries(['authUser']);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  const handleOnboarding = (e) => {
    e.preventDefault();
    onBoardingMutation(formData);
    console.log(formData);
  }

  const handleRandomImage = () => {
    const idx = Math.floor(Math.random() * 100) + 1; 
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormData({ ...formData, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");

  }
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-base-100'>
      <div className='card w-full max-w-3xl shadow-xl bg-base-200'>
        <div className='card-body p-6 sm:p:8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'> Complete your Profile</h1>
          <form onSubmit={handleOnboarding} className='space-y-6 '>
            {/* profile container  */}
            <div className=' flex flex-col  items-center justify-center space-y-4'>
              {/* profile picture  */}
              <div className='rounded-full size-32 bg-base-300 overflow-hidden'>
                {formData.profilePic ? (
                  <img src={formData.profilePic} alt="Profile" className='w-full h-full object-cover' />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className='w-12 h-12 text-base-content opacity-40 ' />
                  </div>
                )}
              </div>


              {/* generate random image */}
              <div className='flex items-center gap-2'>
                <button type='button' onClick={handleRandomImage} className='btn btn-accent'>
                  <ShuffleIcon className=" size-4 mr-2" />
                  Generate Random Image
                </button>
              </div>
            </div>
            {/*Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'> Full Name</span>
              </label>
              <input type="text" name='username' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder='Enter your full name' className='input input-bordered w-full' />
            </div>
            {/* bio */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'> Bio</span>
              </label>
              <textarea name='bio' value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder='Enter your bio' className='textarea textarea-bordered h-24' />
            </div>
            {/*Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
                  {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={(e) => setFormData({ ...formData, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
              {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
            
          </form>
        </div>

      </div>

    </div>
  )
}

export default OnboardingPage;
