import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { motion, transform } from 'framer-motion';

import useAuthStore from '../store/authStore';
import NoResults from './NoResults';
import { IUser } from '../types';

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
//additional interface for comment
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

//fetching all the props from details page
const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
  const { allUsers, userProfile }: any = useAuthStore();

  return (
    <div className='border-t-2 dark:bg-slate-400 border-gray-200 pt-4 px-10 mt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll  lg:h-[457px]'>
        {comments?.length > 0 ? ( // if comment exist
          comments?.map((item: IComment, idx: number) => (//map to all the user and check if userId == postedById
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=' p-2 items-center dark:bg-slate-300 rounded-xl m-2' key={idx}>
                      {/* user info who commented */}
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex items-start gap-3'>
                          <div className='w-12 h-12'>
                            <Image
                              width={48}
                              height={48}
                              className='rounded-full cursor-pointer'
                              src={user.image}
                              alt='user-profile'
                              layout='responsive'
                            />
                          </div>

                          <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                            {user.userName}{' '}
                            <GoVerified className='text-blue-500' />
                          </p>
                        </div>
                      </Link>
                      <div>
                        {/* actual comment  */}
                        <p className='-mt-5 ml-16 text-[16px] mr-8'>
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='No Comments Yet! Be First to do add the comment.' />
        )}
      </div>
      {/* // if user profile exist then show form */}
     {userProfile && <div className='absolute bottom-0 left-0  pb-6 px-2 md:px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='bg-primary dark:bg-slate-400 px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <motion.button  
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} 
          className='text-md text-gray-100 ' 
          onClick={addComment}>
            {isPostingComment ? 'Commenting...' : 'Comment'}
          </motion.button>
        </form>
      </div>}
    </div>
  );
};

export default Comments;