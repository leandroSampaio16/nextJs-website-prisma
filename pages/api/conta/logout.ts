import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, deleteCookie } from "cookies-next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (hasCookie("__session", { req, res })) {
        deleteCookie("__session", { req, res })
        res.setHeader("Cache-Control", "private")
        res.redirect("/?erro=false&msg=Logout feito com sucesso!")
    }
    else {
        res.status(401).end()
    }
}