import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import {motion} from 'framer-motion'

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);

  const { user, userVideos, userLikedVideos } = data;
  //for that underline effect
  const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

  useEffect(()=>{
    if(showUserVideos){
      setVideosList(userVideos)
    }else{
      setVideosList(userLikedVideos)
    }
  },[showUserVideos, userLikedVideos, userVideos])

  return (
    <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: 1 }}
    >
      <div className='w-full'>
    <div className='flex gap-6 md:gap-10 mb-4 dark:bg-slate-800 bg-white w-full'>
      <div className='w-16 h-16 md:w-32 md:h-32'>
        {/* user profile section  */}
        <Image
          width={120}
          height={120}
          layout='responsive'
          className='rounded-full'
          src={user.image}
          alt='user-profile'
        />
      </div>

      <div>
        <div className='text-md  md:text-2xl text-slate-200 font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
          <span>{user.userName.replace(/\s+/g, '')} </span>
          <GoVerified className='text-blue-400  md:text-xl text-md' />
        </div>
        <p className='text-sm font-medium text-slate-400'> {user.userName}</p>
      </div>
    </div>
    <div>
      {/* liked and video buttons  */}
      <div className='flex dark:bg-slate-800 gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
        <p className={`text-xl font-semibold text-white cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
          Videos
        </p>
        <p className={`text-xl font-semibold text-white cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
          Liked
        </p>
      </div>
      {/* video element  */}
      <div className='flex gap-6 flex-wrap md:justify-start'>
        {videosList.length > 0 ? (
          videosList.map((post: Video, idx: number) => (
            <VideoCard key={idx} post={post} />
          ))
        ) : (
          <NoResults
            text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
          />
        )}
      </div>
    </div>
  </div>
    </motion.div>
  )
}

export const getServerSideProps = async ({params: { userId },}: {params: { userId: string };}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};

export default Profile