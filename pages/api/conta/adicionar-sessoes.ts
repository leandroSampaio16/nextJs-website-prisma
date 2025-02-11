import type { NextApiRequest, NextApiResponse } from 'next'
import { hasCookie, getCookie } from "cookies-next"
import { decryptAES } from '@/services/session'
import { tb_compras, tb_contas } from '@/services/firestore'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET" && hasCookie("__session", { req, res }) && req.query["creditos"] && typeof req.query["creditos"] === "string") {
        res.setHeader('Cache-Control', 'private');
        const emailEnc = getCookie("__session", { req, res })!
        const email = decryptAES(emailEnc)
        const dadosConta = await tb_contas.getByEmail(email)
        if (dadosConta) {
            var preco = 0
            if (Number(req.query["creditos"]) === 1) {
                preco = 50
            }
            else if (Number(req.query["creditos"]) === 4) {
                preco = 172
            }
            else if (Number(req.query["creditos"]) === 8) {
                preco = 296
            }
            await tb_contas.alterar({
                creditos: Number(dadosConta.creditos + Number(req.query["creditos"]))
            }, email)
            await tb_compras.add({
                id_cliente: dadosConta.id,
                qnt_sessoes: Number(req.query["creditos"]),
                data: new Date(),
                preco: preco
            })
            res.status(401).redirect("/?erro=false&msg=Compra realizada com sucesso!").end()
        }
        else {
            res.status(401).redirect("/?erro=true&msg=Erro, contacte a administra%C3%A7%C3%A3o!").end()
        }
    }
    else {
        res.status(401).redirect("/perfil?erro=true&msg=Preencha todos os dados!").end()
    }
}