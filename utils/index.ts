

import axios from "axios";
import jwt_decode from 'jwt-decode'
export const BASE_URL  = process.env.BASE_URL

export const createOrGetUser = async (response : any, addUser : any)=>{
  const decoded:{name : string, picture : string, sub : string} = jwt_decode(response.credential);

  const {name, picture, sub } = decoded; // sub is use as id

  // sanity user 
  const user = {
    _id : sub,
    _type : 'user',
    userName : name,
    image : picture,
  }

  addUser(user); // and now when we reload the page user still be there
  
  // await axios.post(`${BASE_URL}/api/auth`, user)
  await axios.post(`https://do-tok-app.vercel.app/api/auth`, user)
  
}