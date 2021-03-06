import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import { motion, transform } from 'framer-motion';
import useAuthStore from '../store/authStore';

interface IProps {
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, flex, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
      <div className={`${flex} gap-6`}>
        <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
          <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
          {alreadyLiked ? (
              <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] like' onClick={handleDislike} >
                
                  <MdFavorite className='text-lg md:text-2xl' />
              </div>
          ) : (
            // <motion.div
            // whileTap={{ opacity: [0, 1] }}
            // >
              <div className='bg-primary rounded-full p-2 md:p-4 like ' onClick={handleLike} >
                <MdFavorite className='text-lg md:text-2xl' />
              </div>
            // </motion.div>
          
          )}
          <p className={`text-md font-semibold mt-2 ${alreadyLiked ? 'text-[#ffffff]' :' text-black' }`}>{likes?.length || 0}</p>
        </div>
        </motion.button>
    </div>
  );
};

export default LikeButton;