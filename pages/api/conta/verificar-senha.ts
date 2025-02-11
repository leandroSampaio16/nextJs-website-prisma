import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { createHash } from 'crypto'
import { tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST" && hasCookie("__session", { req, res }) && req.body["senha"]) {
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const senhaEncriptada = createHash("sha256").update(req.body["senha"]).digest("hex")
        const saoIguais: boolean = await tb_contas.verificarPassword(email, senhaEncriptada)
        if (saoIguais) {
            res.status(200).send("São iguais!")
        }
        else {
            res.status(400).send("A senha atual não está correta!")
        }

    }
    else {
        res.status(401).end()
    }
}