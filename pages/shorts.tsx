import React,{useState,useEffect} from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResults';
import type {NextPage} from 'next'
import ShortVideo from '../components/ShortVideo';


interface IProps {
    videos: Video[];
  }
  

const shorts = ({videos} : IProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  return (
    <>
  <div className='app_shorts '>
    <div className="app_video_shorts rounded-lg lg:w-[400px] xl:h-[80vh]  flex gap-4 flex-wrap ">
        {videos.length ? (
            videos.map((video : Video)=>( // video is of type video
                <ShortVideo post={video} key={video._id} />
            ))
        ):(
            <NoResults text={`No Videos`}/>
        )}
    </div>
  </div>
    </>
  )
}
export const getServerSideProps = async({query : {topic}}:{query : {topic:string}})=>{
    //calling nextjs server inside api/post 
  
    let res = null
    if(topic){
      // res = await axios.get(`http://localhost:3000/api/discover/${topic}`)
      res = await axios.get(`https://do-tok-app.vercel.app/api/discover/${topic}`)
    }else{
      res = await axios.get(`https://do-tok-app.vercel.app/api/post`)
      // res = await axios.get(`http://localhost:3000/api/post`)
    }
  
      return {
        props : {
          videos : res.data
        }
      }
  }
  
export default shorts








