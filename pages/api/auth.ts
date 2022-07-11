import type { NextApiRequest, NextApiResponse } from 'next';

import { allPostsQuery } from '../../utils/queries';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = req.body;

    // this will create new user in sanity database
    client.createIfNotExists(user).then(()=> res.status(200).json('Login success'))
  } 
}
