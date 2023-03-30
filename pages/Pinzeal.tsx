import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'


const pinzeal = () => {
  return (
    <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: 1 }}
    >
<div className='w-full dark:bg-slate-800'>
        <div className='flex-col gap-6 md:gap-10 mb-4 mt-5 dark:bg-slate-800 bg-white w-full'>
            <p className='text-7xl font-semibold text-white tracking-wide text-black-400 font-sans'>
                Pinzeal 👋
            </p>
            <p className='mt-10 p-2 text-2xl font-semibold text-gray-600 dark:text-slate-400'>
                This is Priyansh Sharma from DoTok. <br />
            </p>
                .
                <p className='mt-2 p-2 text-2xl font-semibold text-gray-600 dark:text-slate-400'>
                If you enjoyed using DoTok, then you will be more than happy to see Pinzeal. <br />
                Pinzeal is image sharing social media where you can share your images, arts with everyone and intract with other people. <br />
                You can download other arts too.
                Its a better Pinterest.
                </p>

                <div className="mt-8">
                <a target="_blank" rel="noreferrer" href="https://pinzeal.netlify.app/"  className="p-3  bg-pink-500 text-white rounded-2xl">Pinzeal</a>
                </div>

        </div>
    </div>
    </motion.div>
    
  )
}

export default pinzeal