import type { NextApiRequest, NextApiResponse } from 'next';

import { postDetailQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';
import { uuid } from 'uuidv4';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET'){
    const {id} = req.query // we pass id to axios request in details page we can pull out like this
    
    // query to sanity 
    const query = postDetailQuery(id)

    //getting data of all the post
    const data = await client.fetch(query)

    res.status(200).json(data[0]) // sending clicked post to frontend

} else if (req.method === 'PUT') {
  const { comment, userId } = req.body; // getting user info

  const { id }: any = req.query; //extracting id of user who liked

  const data = await client
    .patch(id)
    .setIfMissing({ comments: [] })
    .insert('after', 'comments[-1]', [ // comments comes in dec order
      {
        comment,
        _key: uuid(),
        postedBy: { _type: 'postedBy', _ref: userId },
      },
    ])
    .commit();

  res.status(200).json(data); // sewnding data to frontend
}
}