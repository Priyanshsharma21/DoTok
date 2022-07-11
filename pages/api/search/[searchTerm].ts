import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { searchTerm } = req.query; // this is similar to our file name

    const videosQuery = searchPostsQuery(searchTerm);// sending video query to sanity queries

    const videos = await client.fetch(videosQuery); // get all videos from backend

    //  sending all search possible results
    res.status(200).json(videos);
  }
}