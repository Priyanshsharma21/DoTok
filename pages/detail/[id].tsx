import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

import Comments from '../../components/Comments';
import LikeButton from '../../components/LikeButton';
import useAuthStore from '../../store/authStore';
import { Video } from '../../types';
import axios from 'axios';
import { BASE_URL } from '../../utils';

interface IProps {
  postDetails : Video
}

const Detail = ({ postDetails } : IProps) => {
  const [post,setPost] = useState(postDetails); // to change state of post
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement>(null);// to keep track on 
  const router = useRouter();
  const {userProfile} : any = useAuthStore(); // to track if user logged in or not

  if(!post) return null;

  const onVideoClick = ()=>{
    if(isPlaying){
      videoRef?.current?.pause();
      setIsPlaying(false);
    }else{
      videoRef?.current?.play()
      setIsPlaying(true);
    }
  }

 
  //to mute video -> whenever isVideoMuted changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]); // if we go to different video then it will not reflect on it


  // like dislike 
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      // const res = await axios.put(`http://localhost:3000/api/like`, {
        const res = await axios.put(`https://do-tok-app.vercel.app/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: res.data.likes }); // previous value, value we want t o update
    }
  };



   const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        // const res = await axios.put(`http://localhost:3000/api/post/${post._id}`, {
          const res = await axios.put(`https://do-tok-app.vercel.app/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment('');
        setIsPostingComment(false);
      }
    }
  };


  return (
    <>
    {post && (
      <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
          {/* bg image  */}
          <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center  bg-gradient-to-br from-pink-400 to-blue-600  bg-no-repeat bg-cover bg-center'>
              <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                <p className='cursor-pointer' onClick={()=>router.back()}>
                {/* back  */}
                  <MdOutlineCancel  className='text-white text-[35px]'/>
                </p>
              </div>
              {/* main video  */}
              <div className='relative'>
                  <div className='lg:h-[100vh] h-[60vh]'>
                      <video src={post?.video?.asset?.url}
                      className='h-full cursor-pointer'
                      loop
                      ref={videoRef}
                      controls
                      onClick={onVideoClick}
                      >

                      </video>
                  </div>
                  {/* play button  */}
                  <div className='absolute top-[45%] left-[43%] cursor-pointer'>
                  {isPlaying && (
                    <button type='button' onClick={onVideoClick}>
                        <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                    </button>
                  )}
                  </div>
              </div>

              <div  className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
                  {isVideoMuted ? (
                      <button onClick={() => setIsVideoMuted(false)}>
                        <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
                      </button>
                  ) : (
                    <button onClick={() => setIsVideoMuted(true)}>
                      <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
                  </button>
                  )}
              </div>
          </div>

          {/* right side  */}
          <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
            <div className='lg:mt-20 mt-10'>
              {/* our id part  */}
            <Link href={`/profile/${post.postedBy._id}`}>
                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                  <Image
                    width={60}
                    height={60}
                    alt='user-profile'
                    className='rounded-full'
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                      {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                      <GoVerified className='text-blue-400 text-xl' />
                    </div>
                    <p className='text-md'> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              {/* caption  */}
              <div className='px-10'>
                <p className='text-md text-gray-600'>{post.caption}</p>
              </div>

              {/* like button  */}
              <div className='mt-10 px-10'>
                {/* if we are loggedIn then only we can like  */}
                {userProfile && (
                  <LikeButton 
                  likes={post.likes}
                  flex='flex'
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                  />
                )}
              </div>
              {/* comment  */}
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={post.comments}
                isPostingComment={isPostingComment}
              />
            </div>

          </div>
      </div>
    )}
    </>
  )
}

export const getServerSideProps = async ({params: { id },}: {params: { id: string }}) => {
    const res = await axios.get(`${BASE_URL}/api/post/${id}`);
  
    return {
      props: { postDetails: res.data },
    };
  };

export default Detail

