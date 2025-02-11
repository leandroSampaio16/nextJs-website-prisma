import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { tb_contas, timestampToDate } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && hasCookie("__session", { req, res })) {
        res.setHeader('Cache-Control', 'private');
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dados = await tb_contas.getByEmail(email)
        if (dados && dados.admin === true) {
            const todasContasReq = await tb_contas.obterTodasAsContas()
            if (todasContasReq) {
                const todasContas = todasContasReq.map((v) => {
                    return {
                        id: v.id,
                        email: v.email,
                        nome: v.nome,
                        genero: v.genero,
                        nascimento: timestampToDate(v.nascimento),
                        motivos: v.motivos,
                        creditos: v.creditos,
                        admin: v.admin
                    }
                })
                res.send(todasContas)
            }
            else {
                res.status(500).redirect("/admin?erro=true&msg=Erro, tente novamente!")
            }
        }
        else {
            res.status(400).redirect("/").end()
        }

    }
    else {
        res.status(401).redirect("/").end()
    }
}