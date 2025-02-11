import type { NextApiRequest, NextApiResponse } from 'next'

import { tb_blog, timestampToDate } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && req.query["id"] && typeof req.query["id"] === "string") {
        const post = await tb_blog.obterUmPost(Number(req.query["id"]))
        if(post){
            res.send({
                id: post.id,
                titulo: post.titulo,
                mensagem: post.mensagem,
                img_url: post.img_url,
                data: timestampToDate(post.data),
            })
        }
        else{
            res.status(204).end()
        }
    }
    else {
        res.status(401).end()
    }
}