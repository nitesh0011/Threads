import AccountProfile from '@/app/appcomponents/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const Onboarding =async () => {

  const user = await currentUser();
  if (!user) return null;
  
  const userInfo:any = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");


  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <div className="flex min-h-screen flex-col items-start  p-24">
      <div>
      <h1 className="text-2xl">Onboarding</h1>
      <p className='mt-2'>Complete your profile to use threds</p>
      </div>
      <div className="mt-6 bg-slate-700 px-10 py-10 w-full rounded-md">
       <AccountProfile  user={userData} btnTitle="continue"/>
      </div>
    </div>
  )
}

export default Onboarding
