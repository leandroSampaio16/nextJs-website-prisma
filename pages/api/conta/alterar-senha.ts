import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { createHash } from 'crypto'
import { tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST" && hasCookie("__session", { req, res }) && req.query["admin"] && req.body["senha"] && req.body["rsenha"]) {
        res.setHeader('Cache-Control', 'private');
        var eAdmin = false
        if(req.query["admin"] === "true"){
            eAdmin = true
        }
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dadosConta = await tb_contas.getByEmail(email)
        if (dadosConta) {
            if (req.body["senha"] === req.body["rsenha"]) {
                const senhaEncriptada = createHash("sha256").update(req.body["senha"]).digest("hex")
                await tb_contas.alterar({
                    password: senhaEncriptada
                }, email)
                if (eAdmin) {
                    res.redirect("/admin?erro=false&msg=Senha alterada!")
                }
                else {
                    res.redirect("/perfil?erro=false&msg=Senha alterada!")
                }
            }
            else {
                if (eAdmin) {
                    res.redirect("/admin?erro=true&msg=Senhas n%C3%A3o coincidem!")
                }
                else {
                    res.redirect("/perfil?erro=true&msg=Senhas n%C3%A3o coincidem!")
                }
            }
        }
        else {
            if (eAdmin) {
                res.redirect("/adminerro=true&msg=Erro, tente novamente!")
            }
            else {
                res.redirect("/perfilerro=true&msg=Erro, tente novamente!")
            }
        }
    }
    else {
        res.status(401).end()
    }
}