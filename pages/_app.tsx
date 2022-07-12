import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingBar from 'react-top-loading-bar'

const MyApp = ({ Component, pageProps }: AppProps)=> {
  const [progress,setProgress] = useState(0)
  const [isSSR,setIsSSR] = useState(true)
  //check we are server side rendering-> at start we want this to be ssr
  useEffect(()=>{
    //check SSR at start 
    setIsSSR(false)
  },[])

  if(isSSR) return null //if we are ssr then we dont wanna show component

  const handleClick = ()=>{
      setProgress(100)
  }

  return (
    
    <GoogleOAuthProvider clientId={`117770236294-t55socfh5e5sch0b4bostm8crjvfpmd3.apps.googleusercontent.com`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Navbar /> 
      <LoadingBar
        color='red'
        progress={progress}
      />
      <div className="flex gap-6 md:gap-20">
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div  className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} onClick={handleClick}/>
        </div>
      </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
