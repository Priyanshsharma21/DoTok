import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import axios from 'axios';

import NoResults from '../../components/NoResults';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';

const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState<Boolean>(true)

        // get searchTerm from endpoint 
        const router = useRouter()
        const {searchTerm}:any = router.query
    
        //get all users from auth store
        const {allUsers} = useAuthStore();
        const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm))
        
        
        // usderline effect 
        const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
        const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  
  return (
    <div className='w-full dark:bg-slate-800 '>
      <div className='flex  gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 dark:bg-slate-800 bg-white w-full'>
        <p onClick={() => setIsAccounts(true)} className={`text-xl dark:bg-slate-800 text-white  font-semibold cursor-pointer ${accounts} mt-2`}>
          Accounts
        </p>
        <p className={`text-xl text-white font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        //get all accounts
        <div className='md:mt-16 '>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (

              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=' flex hover:bg-slate-700   gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 dark:bg-slate-800 border-gray-200'>
                  <div>
                    <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                  </div>
                  <div>
                    <div>
                      <p className='flex gap-1 items-center text-lg font-bold text-slate-200'>
                        {user.userName} <GoVerified className='text-blue-400' />
                      </p>
                      <p className='capitalize  text-gray-400 text-sm'>
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        //get all videos
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
          {videos.length ? (
            videos.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;