import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill, BsDiscFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import disc from '../utils/disc.png'
import { Video } from './../types';
import ShortsSidebar from './ShortsSidebar';
import {motion} from 'framer-motion'

interface IProps {
  post : Video;
}

// video card is of type nectPage and accept interface IProp
const ShortVideo:NextPage<IProps> = ({post}) => {
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
    >
      <div  className='flex flex-col border-b-2 border-gray-200 pb-6 short_video'>
      <div className=''>
        {/* Video  */}
      <div className='lg:ml-2 flex gap-4 relative'>
        <div
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
         className='rounded-3xl app_video'>
            <Link href={`detail/${_id}`}>
              <video
              ref={videoRef} // its like doc.querySelector or getElementById and play pause on condition react make it simple
              loop
              src={video.asset.url}
              className="short_video_player snap_video lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
               >
              </video>
            </Link>

            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[80px] md:w-[70px] lg:w-[350px] p-3'>
                {/* play  */}
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className=' text-2xl lg:text-4xl text-white'/>
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className=' text-2xl lg:text-4xl text-white' />
                  </button>
                )}

                {/* mute  */}

                {isVideoMuted ? (
                  <button onClick={()=>setIsVideoMuted(false)}>
                    <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                  </button>
                ) : (
                  <button onClick={()=>setIsVideoMuted(true)}>
                    <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
      <div>

        {/* shorts footer  */}
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            {/* logo of user  */} 
            <div className='md:w-10 md:h-10 w-8 h-8'> 
                <Link href={`/profile/${postedBy?._id}`}>
                <>
                  <Image
                   width={62}
                   height={62}
                   className='rounded-full' 
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
                  <div className='flex items-center gap-2 justify-between'>
                    <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                        {post.postedBy.userName}
                    {' '}
                    <GoVerified
                    className='text-blue-400 text-md'
                    />
                  </p>
              </div>
          </Link>



          {/* caption  */}
      <Link href={`/detail/${_id}`}>
        <p className='mt-2 font-normal'>{caption}</p>
      </Link>

            </div>
      <BsDiscFill className='videoFooter_record text-4xl absolute right-2'/>

        </div>
      </div>
        
      </div>
      <div>
            <ShortsSidebar />
        </div>
    </div>
    </motion.div>
  )
}

export default ShortVideo