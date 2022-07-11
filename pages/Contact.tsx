import React from 'react'
import Link from 'next/link';

const Contact = () => {
  return (
    <div className='w-full'>
        <div className='flex-col gap-6 md:gap-10 mb-4 mt-5  w-full bg-gray-700 p-5 rounded-3xl'>
            
        <p className='text-7xl flex justify-center align-center font-semibold tracking-wide text-black-400 font-sans text-white'>
                Need  <p className='text-yellow-300 ml-5 '> Help?</p>
            </p>



                <p className=' flex justify-center mt-10 p-2 text-2xl font-semibold text-gray-200 '>
                    This is Priyansh Sharma founder of  <p className='text-yellow-300 ml-2 text-transparent bg-clip-text bg-gradient-to-br from-red-200 to-yellow-200 '> DoTok</p>. <br />
                </p>



                <p className='flex justify-center mt-5 p-2 text-6xl font-semibold text-gray-200'>
                    Have a <p className='text-yellow-400 ml-4 mr-4'>doubt</p> or query?<br />
                </p>

                <p className='flex justify-center mt-9 p-2 text-4xl font-semibold text-gray-200'>
                   Mail Us At: <br />
                </p>

                <p className='flex justify-center mt-1 p-2 text-4xl font-semibold text-gray-200'>
                    <a href="mailto:piyuindia4@gmail.com" className='text-yellow-400'>piyuindia4@gmail.com</a>
                </p>

                <p className='flex justify-center mt-20 p-2 text-4xl font-semibold text-gray-200'>
                    Want to <span className='text-yellow-400 ml-4 mr-4'>Join</span> <br />
                </p>
                <p className='flex justify-center mt-1 p-2 text-5xl font-semibold text-gray-600 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-pink-400'>
                    DoTok Team?
                </p>
                <p className='flex justify-center mt-9 p-2 text-4xl font-semibold text-gray-200'>
                   Mail Us At: <br />
                </p>
                <p className='flex justify-center mt-1 p-2 text-4xl font-semibold text-gray-600'>
                    <a href="mailto:piyuindia220@gmail.com" className='text-yellow-400'>piyuindia220@gmail.com</a>
                </p>
                
        </div>
    </div>
  )
}

export default Contact