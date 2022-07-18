// import axios from 'axios';

// export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// export const createOrGetUser = async (response: any, addUser: any) => {
//   var base64Url = response.credential.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));
  
//   const { name, picture, sub } = JSON.parse(jsonPayload)
  
//   const user = {
//     _id: sub,
//     _type: 'user',
//     userName: name,
//     image: picture,
//   };
  
//   addUser(user);

//   await axios.post(`${BASE_URL}/api/auth`, user);
// };

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