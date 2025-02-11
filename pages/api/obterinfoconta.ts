import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { tb_contas, timestampToDate } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && hasCookie("__session", { req, res })) {
        res.setHeader("Cache-Control", "private")
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dados = await tb_contas.getByEmail(email)
        if (dados) {
            res.send({
                id: dados.id,
                email: dados.email,
                nome: dados.nome,
                genero: dados.genero,
                nascimento: timestampToDate(dados.nascimento),
                motivos: dados.motivos,
                foto_url: dados.foto_url,
                creditos: dados.creditos,
                admin: dados.admin
            })
        }
        else {
            res.status(400).end()
        }

    }
    else {
        res.status(401).end()
    }
}