import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST" && hasCookie("__session", { req, res }) && req.body["email"] && req.body["creditos"] && !Number.isNaN(Number(req.body["creditos"])) && Number(req.body["creditos"]) % 1 === 0) {
        res.setHeader("Cache-Control", "private")
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dadosConta = await tb_contas.getByEmail(email)
        if (dadosConta) {
            if (dadosConta.admin === true) {
                await tb_contas.alterar({
                    creditos: Number(req.body["creditos"])
                }, email)
                res.redirect("/admin?erro=false&msg=Alterado!").end()
            }
            else {
                res.status(400).redirect("/").end()
            }
        }
        else {
            res.status(500).redirect("/").end()
        }
    }
    else {
        res.status(401).redirect("/admin?erro=true&msg=Coloque um valor v%C3%A1lido!").end()
    }
}