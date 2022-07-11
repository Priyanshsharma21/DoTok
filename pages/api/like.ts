// import type { NextApiRequest, NextApiResponse } from 'next';

// import { allPostsQuery } from '../../utils/queries';
// import { client } from '../../utils/client';
// import { uuid } from 'uuidv4';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PUT') {
//     const { userId, postId, like } = req.body;

//     const data = 
//     like ? await client // only if we like
//     .patch(postId) // only update dont overwrite
//     .setIfMissing({likes : []}) // fot initial state
//     .insert('after', 'likes[-1]', [ // insert at end
//         {
//             _key : uuid(),
//             _ref: userId
//         }
//     ])
//     .commit()
//     : await client //else this
//     .patch(postId)
//     .unset([`likes[_ref=="${userId}"]`]) // unset the likes
//     .commit()


//     res.status(200).json(data);
// } 
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    const data = 
    like ? await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit()
    : await client
      .patch(postId)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();

    res.status(200).json(data);
  }
}