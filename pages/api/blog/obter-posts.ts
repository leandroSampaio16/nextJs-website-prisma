import type { NextApiRequest, NextApiResponse } from 'next'
import { tb_blog } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const posts = await tb_blog.obterTodosPosts()
        res.send(posts)
    }
    else {
        res.status(401).end()
    }
}