import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { tb_compras, tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && hasCookie("__session", { req, res })) {
        res.setHeader('Cache-Control', 'private');
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dados = await tb_contas.getByEmail(email)
        if (dados) {
            const queryCompras = await tb_compras.obterComprasCliente(dados.id)
            if (queryCompras) {
                const compras = queryCompras.map((v, i) => {
                    return {
                        id: i + 1,
                        email: email,
                        qnt_sessoes: v.qnt_sessoes,
                        data: v.data,
                        preco: v.preco
                    }
                })
                res.status(200).send(compras)
            }
            else {
                res.status(200).send([])
            }
        }
        else {
            res.status(400).end()
        }

    }
    else {
        res.status(401).end()
    }
}