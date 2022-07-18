import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import   useAuthStore from '../store/authStore'
import { IUser } from '../types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}


const suggestedAccounts = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fetchAllUsers, allUsers } = useAuthStore();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    fetchAllUsers();
  },[fetchAllUsers]) // when we fetch all users and users change this will load

  const users = allUsers
  .sort(()=> 0.5 - Math.random())
  .slice(0, allUsers.length)

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 dark:text-slate-400 font-semibold m-3 mt-4 hidden xl:block'>
          Suggested Accounts
      </p>

      <div>
        {allUsers?.slice(0,6).map((user : IUser)=>( // we want to show only 6 accounts on profile page
        <Link key={user._id} href={`/profile/${user._id}` }>
          <div className='flex gap-3 hover:dark:bg-slate-600  p-2 cursor-pointer font-semibold rounded'>
            <div className='w-8 h-8'>
              <Image
              width={34}
              height={34}
              className='rounded-full'
              src={user.image}
              alt="user profile picture"
              layout='responsive'
              />
            </div>

            <div className='hidden xl:block'>
              <p className='flex gap-1 items-center hover:text-white dark:text-slate-300 text-md font-bold text-primary lowercase '>
                {user.userName.replace(/\s+/g,'')}{' '}
                {/* remove the space */}
                <GoVerified className='text-blue-400'/>
              </p>  
              <p className='capitalized text-gray-400 hover:text-white dark:text-slate-400 text-xs'>
                {user.userName}
              </p>

            </div>
          </div>
        </Link>

        ))}
      </div>

    </div>
  )
}

export default suggestedAccounts