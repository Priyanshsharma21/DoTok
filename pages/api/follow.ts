import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, follow } = req.body;

    const data = 
    follow ? await client // only if we follow
      .patch(postId)
      .setIfMissing({ follows: [] }) // fot initial state
      .insert('after', 'follows[-1]', [// insert at end
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit()
    : await client //else this
      .patch(postId)// only update dont overwrite
      .unset([`follows[_ref=="${userId}"]`])// unset the follows
      .commit();

    res.status(200).json(data);
  }
}