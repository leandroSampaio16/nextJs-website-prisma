import { sendMail } from '@/services/mailer'
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from "cookies-next"
import { encryptAES } from '@/services/session'
import { tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === "POST") {
        const email = req.body["email"]
        const senhaHash = createHash("sha256").update(req.body["senha"]).digest("hex")
        const infoConta = await tb_contas.getByEmail(email)
        if (infoConta && infoConta?.password === senhaHash) {
            setCookie("__session", encryptAES(email), { req, res, maxAge: 60 * 60 * 24 * 1 }) // 1 dia
            res.setHeader("Cache-Control", "private")
            res.redirect("/?erro=false&msg=Login feito com sucesso!").end()
        }
        else {
            const msg = "Email e/ou senha incorreto(s)!"
            res.status(401).redirect("/login?erro=true&msg=" + msg).end()
        }
    }
    else {
        res.status(405).end()
    }
}