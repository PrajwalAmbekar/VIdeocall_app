import React from 'react'
import useAuthUser from '../hooks/useAuthUser.jsx';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { onBoarding } from '../utils/apis.js';

const OnboardingPage = () => {
  const queryClient = useQueryClient();
  const {authUser} = useAuthUser(); 

  const  {formData, setFormData} = useState({
    username: authUser?.username,
    bio: authUser?.bio,
    nativeLanguage: authUser?.nativeLanguage,
    learningLanguage: authUser?.learningLanguage,
    location: authUser?.location,
    profilrePicture: authUser?.profilePicture,
  });

  const { mutate:onBoardingMutation, isPending, error} = useMutation({
    mutationFn: onBoarding,
    
    onSuccess: () => {
      toast.success('Onboarding completed successfully');
      queryClient.invalidateQueries(['authUser']);
    }
  });
  const handleOnboarding = (e) => {
    e.preventDefault();
    onBoardingMutation(formData);
    console.log(formData);
  }
  return (
    <div>
      
    </div>
  )
}

export default OnboardingPage;
