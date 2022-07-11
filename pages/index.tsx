import React from 'react';
import axios from 'axios';

import VideoCard from '../components/VideoCard';
import { BASE_URL } from '../utils';
import { Video } from '../types';
import NoResults from '../components/NoResults';
import type {NextPage} from 'next'


interface IProps {
  videos: Video[];
}

const Home = ({videos} : IProps) => { // this video is of type video[array]

  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video : Video)=>( // video is of type video
            <VideoCard post={video} key={video._id} />
        ))
      ):(
        <NoResults text={`No Videos`}/>
      )}
    </div>
  );
};


// when we want to fetch data during request time we use getServerSideProps method (api calls)

export const getServerSideProps = async({query : {topic}}:{query : {topic:string}})=>{
  //calling nextjs server inside api/post 

  let res = null
  if(topic){
    res = await axios.get(`http://localhost:3000/api/discover/${topic}`)
  }else{
    res = await axios.get(`http://localhost:3000/api/post`)
  }

    return {
      props : {
        videos : res.data
      }
    }
}

export default Home

