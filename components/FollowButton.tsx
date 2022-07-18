import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { motion, transform } from 'framer-motion';
import useAuthStore from '../store/authStore';
import {RiUserFollowLine,RiUserUnfollowLine} from 'react-icons/ri'

interface IProps {
  follows: any;
  flex: string;
  handleFollow: () => void;
  handleUnfollow: () => void;
}

const FollowButton: NextPage<IProps> = ({ follows, flex, handleFollow, handleUnfollow }) => {
  const [alreadyFollow, setAlreadyFollow] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterFollow = follows?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterFollow?.length > 0) {
      setAlreadyFollow(true);
    } else {
      setAlreadyFollow(false);
    }
  }, [filterFollow, follows]);

  return (
      <div className={`${flex} gap-6`}>
        <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
          <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
          {alreadyFollow ? (
              <div className='bg-primary flex flex-row rounded-full p-2 md:p-4 text-[#0800ff] like' onClick={handleUnfollow} >
                  <RiUserFollowLine className='text-lg md:text-2xl flex justify-center mr-3' /> 
                  <p className='flex justify-center'>Unfollow</p>
              </div>
          ) : (
            // <motion.div
            // whileTap={{ opacity: [0, 1] }}
            // >
              <div className='bg-primary flex flex-row rounded-full p-2 md:p-4 like ' onClick={handleFollow} >
                <RiUserUnfollowLine className='text-lg md:text-2xl flex justify-center mr-3' /> Follow
              </div>
            // </motion.div>
          
          )}
          <p className={`${alreadyFollow ? 'text-md font-semibold mt-2 text-[#ffffff]' : 'text-md mt-2 font-semibold '}`}>{follows?.length || 0}</p>
        </div>
        </motion.button>
    </div>
  );
};

export default FollowButton;