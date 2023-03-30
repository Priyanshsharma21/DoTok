//  when we have one single source of state we call it store

import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

import { BASE_URL } from '../utils';

const authStore = (set: any) => ({
  userProfile: null, // userprofile not exist
  allUsers: [], // no users exist
  
  addUser: (user: any) => set({ userProfile: user }), // add users when login and get all there data
  removeUser: () => set({ userProfile: null }), // remove users when logout

  //fetching all the users
  fetchAllUsers: async () => {
    const response = await axios.get(`http://localhost:3000/api/users`);
    // const response = await axios.get(`https://do-tok-app.vercel.app/api/users`);

    set({ allUsers: response.data });
  },
});

const useAuthStore = create((
  persist(authStore, {
    name: 'auth',
  })
));

export default useAuthStore;