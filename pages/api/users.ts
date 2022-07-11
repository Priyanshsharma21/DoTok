import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../utils/client';
import { allUsersQuery } from '../../utils/queries' // return all the users from database


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
        const data = await client.fetch(allUsersQuery()) // get all user data

        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json([])
        }
  } 
}
