// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { AiOutlineLogout } from 'react-icons/ai';
// import { BiSearch } from 'react-icons/bi';
// import { IoMdAdd } from 'react-icons/io';
// import { GoogleLogin, googleLogout  } from '@react-oauth/google';

// import useAuthStore from '../store/authStore';
// import { IUser } from '../types';
// import { createOrGetUser } from '../utils';
// import Logo from '../utils/logo.png'
// import newLogo from '../utils/DoTok.png'

// const Navbar = () => {
//   const [user, setUser] = useState<IUser | null>();
//   const {userProfile, addUser, removeUser}:any = useAuthStore();
//   const [searchValue, setSearchValue] = useState(' ')
//   const router = useRouter();


//   const handleSubmit = ()=>{

//   }

//   const handleSearch = (e : {preventDefault : ()=>void})=>{
//     e.preventDefault()

//     if(searchValue){
//       router.push(`/search/${searchValue}`)
//     }
//   }

//   return (
//     // logo 
//     <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
//       <Link href='/'>
//       <div className='w-[100px] md:w-[129px] md:h-[30px] h-[38px]'>
//         <Image 
//         className='cursor-pointer'
//         src={Logo}
//         alt="tiktik logo image"
//         layout='responsive'
//         />
//       </div>
//       </Link>
//       {/* search  */}
//       <div className='relative hidden md:block'>
//         <form
//         onSubmit={handleSubmit}
//         className='absolute md:static top-10 -left-20 bg-white'
//         >
//           <input type="text"
//           value={searchValue}
//           onChange={(e)=>setSearchValue(e.target.value)}
//            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
//            placeholder='Search accounts and videos'
//           />
//           <button
//           onClick={handleSearch}
//           className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
//           >
//               <BiSearch />
//           </button>
//         </form>
//       </div>

//       {/* google oAuth  */}
//       <div>
//         {/* upload  */}
//         {userProfile ? (
//           <div className='flex gap-5 md:gap-10'>
//             <Link href='/upload'>
//               <button className='border-2 px-2 md:px-4 text:md font-semibold flex items-center gap-2'>
//                   <IoMdAdd className='text-xl'/>{ ' ' }
//                   <span className='hidden md:block'>Upload</span>
//               </button>
//             </Link>

//             {/* userPic after login */}
//             {userProfile?.image && (
//               <Link href={`/profile/${user?._id}`}>
//               <>
//                 <Image
//                  width={40}
//                  height={40}
//                  className=' rounded-full cursor-pointer'
//                  src={userProfile?.image}
//                  alt='user-profile'
//                 />
//               </>
//               </Link>
//             )}
//             {/* //logout  */}
//             <button type='button' className='px-2' onClick={()=>{
//                 googleLogout();
//                 removeUser();
//               }}>
//               <AiOutlineLogout color='red' fontSize={21}/>
//             </button>
//           </div>
//         ) : (
//           <GoogleLogin 
//           onSuccess={(res)=>{createOrGetUser(res, addUser)}}
//           onError={()=>{console.log('error')}}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar

// -------------------------------------------------Testing -----------------------
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout  } from '@react-oauth/google';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { createOrGetUser } from '../utils';
import Logo from '../utils/logo.png'
import newLogo from '../utils/dotok.png'
import { motion } from 'framer-motion';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const {userProfile, addUser, removeUser}:any = useAuthStore();
  const [searchValue, setSearchValue] = useState(' ')
  const router = useRouter();


  const handleSubmit = ()=>{

  }

  const handleSearch = (e : {preventDefault : ()=>void})=>{
    e.preventDefault()

    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    // logo 
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
      <div className='w-[100px] md:w-[129px] md:h-[30px] mt-2 h-[38px]'>
        <Image 
        className='cursor-pointer'
        src={newLogo}
        alt="tiktik logo image"
        layout='responsive'
        />
      </div>
      </Link>
      {/* search  */}
      <div className='relative hidden md:block '>
        <form
        onSubmit={handleSubmit}
        className='absolute md:static dark:bg-slate-800 top-10 -left-20 bg-white'
        >
          <input type="text"
          value={searchValue}
          placeholder='Search for videos & accounts'
          onChange={(e)=>setSearchValue(e.target.value)}
          className='bg-primary text-slate-100 p-3 md:text-md font-medium border-2 dark:text-slate-400 dark:bg-slate-800 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
           
          />
          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }} 
          onClick={handleSearch}
           className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
              <BiSearch />
          </motion.button>
        </form>
      </div>

      {/* google oAuth  */}
      <div>
        {/* upload  */}
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }} 
              className='border-2 px-2 md:px-4 text:md font-semibold flex items-center gap-2'>
                  <IoMdAdd className='text-xl  dark:text-slate-400'/>{ ' ' }
                  <span className='hidden md:block  dark:text-slate-400'>Upload</span>
              </motion.button>
            </Link>

            {/* userPic after login */}
            {userProfile?.image && (
              <Link href={`/profile/${user?._id}`}>
              <>
                <Image
                 width={40}
                 height={40}
                 className=' rounded-full cursor-pointer'
                 src={userProfile?.image}
                 alt='user-profile'
                />
              </>
              </Link>
            )}
            {/* //logout  */}
            <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} 
            type='button' className='px-2' onClick={()=>{
                googleLogout();
                removeUser();
              }}>
              <AiOutlineLogout  color='#75f519' fontSize={21}/>
            </motion.button>
          </div>
        ) : (
          <GoogleLogin 
          onSuccess={(res)=>{createOrGetUser(res, addUser)}}
          onError={()=>{console.log('error')}}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar