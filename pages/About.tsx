import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
    whileInView={{ opacity: [0, 1] }}
    transition={{ duration: 1 }}
    >
<div className='w-full'>
        <div className='flex-col gap-6 md:gap-10 mb-4 mt-5 bg-white w-full'>
            <p className='text-7xl font-semibold tracking-wide text-black-400 font-sans'>
                Hello There 👋
            </p>
            <p className='mt-10 p-2 text-2xl font-semibold text-gray-600'>
                This is Priyansh Sharma from DoTok. <br />
            </p>
                .
                <p className='mt-2 p-2 text-2xl font-semibold text-gray-600'>
                DoTok is an video sharing Social Media. <br />
                Here you can upload, download Videos of your choice <br />
                You can watch videos from different categories like <p className='text-red-400'>coding, food, sports, fitness, self development, music, dance </p> etc.
                </p>

                <p className='mt-1 p-2 text-2xl font-semibold text-gray-600'>
                You can like, share & comment on videos after login. <br />
                Everything is free here and Your data is 100% safe.
                </p>

                <p className='mt-1 p-2 text-2xl font-semibold text-gray-600'>
                We are here for you to provide best User Experience. <br />
                Once you started using this application it will become an <br />
                partner which will add more value to your life.
                </p>

                <p className='mt-1 p-2 text-2xl font-semibold text-gray-600'>
                You can check out what other people sharing. <br />
                We made it very Minimalist to use. <br />
                You can also search for accounts of other people and videos you like.
                You can watch videos from different categories like <p className='text-red-400'>#AddValueToLife</p>

                </p>

                <p className='mt-1 p-2 text-2xl font-semibold text-gray-600'>
                For any query you can contact us. <br />
                <Link  key={"Contact"} href={`/Contact`}> 
                    <>
                        <p className='text-red-400 cursor-pointer underline'> contact page</p>
                    </>
                </Link> <br />
                
                </p>
        </div>
    </div>
    </motion.div>
    
  )
}

export default About