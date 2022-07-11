import type { NextApiRequest, NextApiResponse } from 'next';

import { topicPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query; // should be same as file

    const videosQuery = topicPostsQuery(topic); // sending query to sanity to fetch videos

    const videos = await client.fetch(videosQuery); // get all videos

    res.status(200).json(videos); // send to frontend
  }
}