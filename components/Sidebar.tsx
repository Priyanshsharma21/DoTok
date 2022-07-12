import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import {GoogleLogin} from 'react-google-login';
// import useAuthStore from '../store/authStore';
import {motion} from 'framer-motion'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const { pathname } = useRouter() // to get the path name

  const userProfile = false

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      {/* for mobile  */}
      <div onClick={()=> setShowSidebar((prevState)=>!prevState)} className='block xl:hidden m-2 ml-4 mt-3 text-xl'>
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
              <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                {/* all post  */}
                  <p className='text-2xl'>
                    <AiFillHome />
                  </p>
                  <span className='text-xl hidden xl:block'>
                      For You 
                      {/* this will be hidden in small device but in xl it show for you  */}
                  </span>
              </div>
              </Link>

              {/* new shorts  */}
              <Link href='/shorts'>
              <div className={pathname === '/shorts' ? activeLink : normalLink}>
                  <p className='text-2xl'>
                    <AiOutlineVideoCameraAdd />
                  </p>
                  <span className='text-xl hidden xl:block'>
                      Shorts
                      {/* this will be hidden in small device but in xl it show for you  */}
                  </span>
              </div>
              </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar