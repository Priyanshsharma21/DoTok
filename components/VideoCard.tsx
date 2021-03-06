import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import { motion } from 'framer-motion';

import { Video } from './../types';

interface IProps {
  post : Video;
}

// video card is of type nectPage and accept interface IProp
const VideoCard:NextPage<IProps> = ({post}) => {
  const {caption, postedBy, video, _id, likes } = post
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // our video is type HTMLVideoElement
  // ref will take referance of play and pause part of our video
  
  const onVideoPress = ()=>{
    if(playing){
      videoRef?.current?.pause();
      setPlaying(false);
    }else{
      videoRef?.current?.play()
      setPlaying(true);
    }
  }

  //to mute video -> whenever isVideoMuted changes
  useEffect(()=>{
    if(videoRef?.current){ // if valid video selected
      videoRef.current.muted = isVideoMuted; // then mute it
    }
  },[isVideoMuted])
  
  return (
    <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: 0.5 }}
    >
     
<div  className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            {/* logo of user  */}
            <div className='md:w-16 md:h-16 w-10 h-10'>
                <Link href={`/profile/${postedBy?._id}`}>
                <>
                  <Image
                   width={62}
                   height={62}
                   className=' rounded-full'
                   src={postedBy?.image}
                   alt='user-profile'
                   layout='responsive'
                  />
                </>
                </Link>
            </div>
            <div>
        {/* username  */}
        <Link href={`/profile/${postedBy?._id}`}>
                  <div className='flex items-center gap-2'>
                    <p className='flex gap-2 dark:text-slate-200 items-center md:text-md font-bold text-primary'>
                        {post.postedBy.userName}
                    {' '}
                    <GoVerified
                    className='text-blue-400 text-md'
                    />
                  </p>
                  <p className='capitalize dark:text-slate-200 font-medium text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>  
              </div>
          </Link>

          {/* caption  */}
      <Link href={`/detail/${_id}`}>
        <p className='mt-2 font-normal dark:text-slate-100'>{caption}</p>
      </Link>
            </div>
        </div>
      </div>

      {/* Video  */}
      <div className='lg:ml-2 flex gap-4 relative'>
        <div
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
         className='rounded-3xl app_video'>
            <Link href={`/detail/${_id}`}>
            <video
              loop
            // its like doc.querySelector or getElementById and play pause on condition react make it simple
              ref={videoRef}
              src={video.asset.url}
              className='lg:w-[600px] bg-gradient-to-b from-slate-700 to-slate-800 hover:dark:bg-slate-800 h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            ></video>
          </Link>
            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
                {/* play  */}
                {playing ? (
                  <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }} 
                  onClick={onVideoPress}>
                    <BsFillPauseFill className='text-white text-2xl lg:text-4xl sm:text-white lg:text-white md:text-white'/>
                  </motion.button>
                ) : (
                  <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }} 
                  onClick={onVideoPress}>
                    <BsFillPlayFill className='text-white text-2xl lg:text-4xl sm:text-white lg:text-white md:text-white' />
                  </motion.button>
                )}

                {/* mute  */}

                {isVideoMuted ? (
                  <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }} 
                  onClick={()=>setIsVideoMuted(false)}>
                    <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                  </motion.button>
                ) : (
                  <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }} 
                  onClick={()=>setIsVideoMuted(true)}>
                    <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                  </motion.button>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
    {/* </motion.button> */}
    </motion.div>
   
  )
}

export default VideoCard