import React from 'react';
import { Audio,Rings,Puff,Hearts,BallTriangle,MutatingDots,Watch } from  'react-loader-spinner'

interface IProp {
    message : string
}

export const Spinner2 = ({message}:IProp) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Audio
            type="Audio"
            color="#ff0095"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg text-center px-2">{message}</p>
        </div>
      );
}

export const Spinner3 = ({message}:IProp) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Rings
            type="Rings"
            color="#ff0095"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg text-center px-2">{message}</p>
        </div>
      );
}

export const Spinner4 = ({message}:IProp) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <MutatingDots
            type="MutatingDots"
            color="#ff0095"
            height={50}
            width={200}
            className="m-5"
          />
    
          <p className="text-lg text-center px-2">{message}</p>
        </div>
      );
}
