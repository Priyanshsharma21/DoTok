import type { NextApiRequest, NextApiResponse } from 'next';

import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

// specify that req is of nextApiRequest and res in nextAPiResponse in tsx
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
     //to get data first make a query and pass that to client.fetch
    const query = allPostsQuery();

    const data = await client.fetch(query);

    res.status(200).json(data);
  } else if (req.method === 'POST') { // post video
    const doc = req.body;

    client.create(doc).then(() => {
      res.status(201).json('video created');
    });
  }
}
